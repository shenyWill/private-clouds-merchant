<template>
  <div class="navbar__user">
    <div @mouseover="toggleMenu()" @mouseout="toggleMenu()">
      <img class="navbar__avatar" :src="user.avatar" draggable="false" />
      <span>{{ user.username }}</span>
    </div>
    <div class="navbar__menu-arrow" v-if="showMenu" @mouseover="toggleMenu()" @mouseout="toggleMenu()"></div>
    <div v-if="showMenu" class="navbar__menu" @mouseover="toggleMenu()" @mouseout="toggleMenu()">
      <div class="navbar__menu-item">
        <div @click="showPersonCenter">个人中心</div>
      </div>
      <div class="navbar__menu-item">
        <div @click="showSettingDialog">设置</div>
      </div>
      <!-- <div class="navbar__menu-item">
        <div @click="adminLogout">退出登录</div>
      </div> -->
    </div>
    <el-dialog
      class="alert-dialog"
      title="设置"
      :visible.sync="settingDialog"
      width="25%"
      :append-to-body="true">
      <el-form label-width="100px">
        <el-form-item label="报警弹窗开关">
          <el-switch
            @change="switchDialog"
            v-model="alertDialog"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </el-form-item>
        <el-form-item label="报警声音开关">
          <el-switch
            @change="switchSound"
            v-model="alertSound"
            :active-color="activeColor"
            :inactive-color="inactiveColor">
          </el-switch>
        </el-form-item>
        <el-form-item label="报警阈值大小">
          <el-slider
            @change="switchParameter"
            v-model="alertParameter">
          </el-slider>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
 import api from '@/api';
 import config from '@/config';
//  import Socket from '@/api/Socket';
 import { mapActions, mapGetters } from 'vuex';
 export default {
   name: 'Userpane',
   data () {
     return {
       showMenu: false,
       settingDialog: false,
       activeColor: '#13ce66',
       inactiveColor: '#ff4949',
       alertDialog: true, // blacklist show alert dialog
       alertSound: true, // blacklist alert sound
       alertParameter: 73 // 分数阈值
     };
   },
   props: {
     user: {
       type: Object,
       default: () => {
         return {
           avatar: require('@/assets/image/avatar.png')
         };
       }
     }
   },
   computed: {
     ...mapGetters([
       'socketConnected'
     ])
   },
   methods: {
     ...mapActions([
       'logout',
       'setBlacklistAlert',
       'setParameterValue',
       'setBlacklistSound',
       'disconnectSocket',
       'delAllViews'
     ]),
     toggleMenu () {
       this.showMenu = !this.showMenu;
     },
     async switchSound (newVal) {
       // parameterValue 1: on 2: off
       const data = { configureType: '2', parameterValue: newVal ? '1' : '2' };
       const response = await api.post(config.system.update, data);
       if (Number(response.data.code) === 200) {
         this.$message({ type: 'success', message: '更新成功' });
         this.setBlacklistSound(newVal);
         this.settingDialog = false;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
         this.settingDialog = false;
       }
     },
     async switchDialog (newVal) {
       // parameterValue 1: on 2: off
       const data = { configureType: '3', parameterValue: newVal ? '1' : '2' };
       const response = await api.post(config.system.update, data);
       if (Number(response.data.code) === 200) {
         this.$message({ type: 'success', message: '更新成功' });
         this.setBlacklistAlert(newVal);
         this.settingDialog = false;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
         this.settingDialog = false;
       }
     },
     async switchParameter (newVal) {
       const data = { configureType: '4', parameterValue: newVal };
       const response = await api.post(config.system.update, data);
       if (Number(response.data.code) === 200) {
         this.$message({ type: 'success', message: '更新成功' });
         this.setParameterValue(73);
         this.settingDialog = false;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
         this.settingDialog = false;
       }
     },
     async fetchConfig () {
       const response = await api.post(config.system.list);
       if (Number(response.data.code) === 200) {
         const data = response.data.configure;
         data.forEach(item => {
           // configure type
           // 2: blacklist alert sound
           // 3: blacklist show dialog
           if (item.configureType === '2') {
             this.alertSound = item.parameterValue === '1';
             this.setBlacklistSound(this.alertSound);
           } else if (item.configureType === '3') {
             this.alertDialog = item.parameterValue === '1';
             this.setBlacklistAlert(this.alertDialog);
           } else if (item.configureType === '4') {
             this.alertParameter = Number(item.parameterValue);
             this.setParameterValue(73);
           }
         });
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
    //  async adminLogout () {
    //    const response = await api.post(config.logoutAPI, {});
    //    if (Number(response.data.code) === 200) {
    //      this.delAllViews();
    //      if (this.socketConnected) {
    //        const socket = Socket.init(config.socketURL);
    //        socket.disconnect();
    //      }
    //      this.disconnectSocket();
    //      this.logout();
    //      this.$router.push('/login');
    //    } else {
    //      this.$message({ type: 'error', message: response.data.msg });
    //    }
    //  },
     showSettingDialog () {
       this.settingDialog = true;
     },
     showPersonCenter () {
       this.$router.push('/personCenter');
     }
   },
   mounted () {
     this.fetchConfig();
   }
 };
</script>

<style lang="scss">
 .navbar__user {
   position: relative;
   border: none;
   height: 62px;
   right: 30px;
   &:hover {
     cursor: pointer;
   }
   .navbar__menu-arrow {
     position: relative;
     top: -26px;
     right: -18px;
     width: 0;
     height: 0;
     border-bottom: 16px solid #fff;
     border-right: 16px solid transparent;
     border-left: 16px solid transparent;
   }
   .navbar__menu {
     position: absolute;
     top: 65px;
     right: 10px;
     text-align: center;
     background-color: #fff;
     overflow: hidden;
     border: 1px solid #ebeef5;
     border-radius: 10px;
     border-bottom: none;
     border-top: none;
     .navbar__menu-item {
       font-size: 14px;
       font-weight: bold;
       padding-bottom: 20px;
       width: 160px;
       height: 40px;
       border-bottom: 1px solid #ebeef5;
       &:hover {
         background-color: lightgray;
       }
       .el-button {
         width: 100%;
         height: 40px;
       }
     }
   }
 }
 .navbar__avatar {
   margin: 8px 20px;
   width: 40px;
   height: 40px;
   border-radius: 20px;
 }
 .alert-dialog .el-dialog {
   border-radius: 20px;
   padding: 0;
   padding-left: 20px;
   .el-dialog__header {
     font-weight: bold;
     border-bottom: 1px solid lightgray;
   }
   .el-form {
     margin: 0 auto;
     width: 300px;
   }
 }
</style>
