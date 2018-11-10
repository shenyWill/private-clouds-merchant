<template>
  <div :class="['sidebar', isCollapse ? 'sidebar__collapse' : '']">
    <div>
      <img class="logo-icon" :src="logo" />
    </div>
    <el-menu
      class="sidebar__menu"
      mode="vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
    <!-- 批量上传上传球 -->
    <div class="add-more-person-global" v-if="morePersonTranstion">
      <img :src="personAddLoad" alt="" class="person-add-load" :style="{top: -(personAddPercent+10) + 'px'}">
      <span class="person-global-info">{{personAddInfo}}</span>
      <span class="person-global-percent">{{personAddPercent}}%</span>
    </div>
    <i class="iconfont icon-guanbipiliang-xuanting" v-if="morePersonTranstion" @click="dialogStopAddPerson = true"></i>
    <!-- 终止上传 -->
    <el-dialog :visible.sync="dialogStopAddPerson" title="提示" :append-to-body="true" width="25%" :close-on-click-modal="false" custom-class="stop-person-add">
      <p class="stop-info">您确定要停止批量入库操作吗？</p>
      <span class="sure-stop" @click="stopAdd">确定</span>
      <span class="cancel-stop" @click="dialogStopAddPerson = false">取消</span>
    </el-dialog>
    <!-- 上传完毕信息 -->
    <el-dialog :visible.sync="dialogErrorShow" title="提示" :append-to-body="true" width="30%" custom-class="person-error-show">
      <div class="error-info" v-if="errorBatchList.length">
        <p class="error-info-title">部分照片入库失败！</p>
        <p class="error-info-detail">压缩包中的下列图片存在问题，导致该部分照片入库失败！</p>
        <p class="error-info-detail">请把该部分照片按照错误提示修改，并重新上传。</p>
        <div class="error-person-nav">
          <h3 class="error-person-title">失败原因如下：</h3>
          <p class="error-person-list" v-for="item in errorBatchList" :key="item.id">
            <span class="error-person-fileName">{{item.fileName}}</span>
            <span class="error-person-message">{{item.fileErrorMsg}}</span>
          </p>
        </div>
      </div>
      <div class="success-info" v-if="!errorBatchList.length">全部照片入库成功！</div>
    </el-dialog>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex';
 import SidebarItem from './SidebarItem';
 import menu from '@/config/menu';
 import Socket from '@/api/Socket';
 import api from '@/api';
 import config from '@/config';
 export default {
   name: 'Sidebar',
   components: {
     SidebarItem
   },
   data () {
     return {
       backgroundColor: '#304156',
       textColor: '#fff',
       activeTextColor: '#ffd046',
       logo: require('@/assets/image/logo-white.png'),
       personAddLoad: require('@/assets/image/person-load.gif'),
       personAddInfo: '批量入库中',
       personAddPercent: 0,
       personScribe: null, // 批量人员订阅ID
       dialogStopAddPerson: false, // 停止上传弹出框
       socket: null,
       dialogErrorShow: false, // 上传结束弹出框
       errorBatchList: []
     };
   },
   computed: {
     ...mapGetters([
       'isCollapse',
       'morePersonTranstion',
       'tempBatchNo',
       'socketConnected'
     ]),
     routes () {
       return menu;
     }
   },
   methods: {
     ...mapActions([
        'setPersonTranstion',
        'setTempBatchNo'
      ]),
     initSocket (url) {
       this.socket = Socket.init(url);
        this.socket.subscribe('/face/batchPersonnel', response => {
         const data = JSON.parse(response.body);
         this.personScribe = response.headers.subscription;
         this.personAddPercent = parseInt(data.fileNumber * 100 / data.fileTotal) || 0;
         // 传输全部完成之后
         if (Number(data.operationType) === 0) {
            this.cancelAdd();
            this.errorBatchList = data.errorBatchList;
            this.dialogErrorShow = true;
         }
       });
     },
     // 取消订阅，停止上传
     cancelAdd () {
        // 取消该订阅
        this.socket && this.socket.unsubscribe(this.personScribe);
        // 设置隐藏球store变量
        this.setPersonTranstion(false);
        // 设置该订阅的id
        this.setTempBatchNo(0);
        this.personAddPercent = 0;
     },
     subscribeSocket () {
       if (this.socketConnected) {
         this.initSocket(config.socketURL);
       } else {
         this.$store.subscribe((mutation, state) => {
           if (mutation.type === 'CONNECT_SOCKET' || mutation.type === 'SET_PERSON_TRANSTION') {
             this.initSocket(config.socketURL);
           }
         });
       }
     },
     // 停止批量上传
     async stopAdd () {
       const obj = {operationType: 1, tempBatchNo: this.tempBatchNo};
       const responseAPI = await api.post(config.person.stopMorePerson, obj);
       if (Number(responseAPI.data.code) === 200) {
         this.$message({
           type: 'success',
           message: responseAPI.data.msg
         });
         this.dialogStopAddPerson = false;
         this.cancelAdd();
       }
     }
   },
   watch: {
     morePersonTranstion (newVal) {
       if (newVal) {
        this.subscribeSocket();
       }
     }
   }
 };
</script>

<style lang="scss">
 .sidebar {
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   width: 250px;
   height: 100%;
   z-index: 999;
   transition: all .2s;
   .logo-icon {
     position: fixed;
     top: 20px;
     left: 31px;
     height: 43px;
     width: 188px;
     background-size: 188px 43px;
     z-index: 999;
   }
   a {
     display: inline-block;
     width: 100%;
     overflow: hidden;
     text-decoration: none;
   }
   .sidebar__menu {
     padding-top: 83px;
     padding-left: 0;
     border-right: none;
     overflow: hidden;
     height: 100%;
     .el-menu .el-submenu-item {
       min-width: 100% !important;
     }
   }
   .icon-guanbipiliang-xuanting {
     left: 175px;
     bottom: 140px;
     position: absolute;
     z-index: 999;
     color: #fff;
     font-size: 23px;
     cursor: pointer;
     &:hover {
       color: #00ffff;
     }
   }
 }
 .sidebar__collapse {
   width: 100px;
   .logo-icon {
     display: none;
   }
   .el-menu--collapse {
     width: 100%;
   }
 }
 // 批量入库
 .add-more-person-global {
   position: fixed;
   bottom: 30px;
   left: 60px;
   width: 120px;
   height: 120px;
   border-radius: 50%;
   border: 5px solid #fff;
   background-color: #008aff;
   overflow: hidden;
   .person-add-load {
     position: absolute;
     background-size: 100% 100%;
     width: 130px;
     left: -5px;
   }
   .person-global-info,.person-global-percent {
     z-index: 999;
     position: absolute;
     font-size: 14px;
     width: 100%;
     text-align: center;
     left: 0;
     top: 40px;
     color: #333;
     font-weight: bold;
   }
   .person-global-percent {
     top: 65px;
   }
 }
 .stop-person-add {
   text-align: left;
   border-radius: 20px;
   .el-dialog__header {
     height: 50px;
     line-height: 50px;
     padding: 0 20px;
     margin: 0;
     border-bottom: 1px solid #e5e5e5;
     font-weight: bold;
   }
   .el-dialog__body {
     text-align: center;
   }
   .stop-info {
     text-align: center;
     font-size: 16px;
     font-weight: bold;
     color: #000;
     margin-bottom: 60px;
   }
   .sure-stop,.cancel-stop {
     display: inline-block;
     height: 40px;
     line-height: 40px;
     width: 120px;
     border-radius: 10px;
     margin-right: 20px;
     margin: 0 20px;
     cursor: pointer;
   }
   .sure-stop {
     background-color: #008aff;
     border: 1px solid #008aff;
     color: #fff;
     &:hover {
       background-color: #0066ff;
     }
   }
   .cancel-stop {
     color: #008aff;
     border: 1px solid #008aff;
     &:hover {
       color: #0066ff;
       border-color: #0066ff;
     }
   }
 }
 // 错误信息展示
 .person-error-show {
   border-radius: 20px;
   .el-dialog__header {
     font-size: 20px;
     font-weight: bold;
     border-bottom: 1px solid lightgray;
   }
   .error-info-title {
     text-align: center;
     font-size: 18px;
     color: #ff0000;
     font-weight: bold;
     padding-bottom: 20px;
   }
   .error-info-detail {
     text-align: center;
     font-size: 14px;
     font-weight: bold;
     margin: 5px auto;
   }
   .error-person-nav {
     overflow: hidden;
   }
   .error-person-list {
     width: 100%;
     height: 30px;
     line-height: 30px;
     overflow: hidden;
     text-overflow:ellipsis;
     white-space: nowrap;
   }
   .error-person-fileName {
     width: 200px;
     display: inline-block;
   }
 }
</style>
