<template>
  <div class="person">
    <Search :searchResult='searchResult' :equipmentArr="deviceList">
      <el-form
        ref="search-form"
        :model="searchForm"
        slot="search-form"
        label-width="100px"
        class="search-form-box">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.personnelName" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" :offset="3">
            <el-form-item label="人员描述">
              <el-input v-model="searchForm.describe" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" :offset="3">
            <el-form-item label="识别设备">
              <el-select v-model="searchForm.equipmentId" size="small">
                <el-option
                  :label="item.equipmentName"
                  :value="item.equipmentId"
                  v-for="item in deviceList"
                  :key="item.equipmentId">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="21">
            <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜 索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Search>
    <div class="person-nav">
      <!-- 添加新人员 -->
        <el-card class="person-add person-list" v-if="personList.length || !Object.keys(searchResult).length">
          <div class="add-content" @click="addPerson">
            <i class="el-icon-plus"></i>
          </div>
          <p class="add-text" @click="addPerson">添加新人员</p>
          <p class="add-text" @click="addMorePerson">批量添加人员</p>
          <div class="delete-all-people-card" v-if="deleteAllOperationTag"></div>
        </el-card>
      <!-- 人员列表 -->
        <el-card class="person-list" v-for="item in personList" :key="item.personnelId" @click.native="showPersonDetail(item.personnelId)">
          <el-tooltip placement="bottom-end" popper-class="person-pop">
            <div slot="content">
              <i class="el-icon-edit" @click.self.stop="editPeople(item)"></i>　<i class="el-icon-delete" @click.self.stop="movePeople(item.personnelId)"></i>
            </div>
            <i class="el-icon-more"></i>
          </el-tooltip>
          <div class="list-content">
            <img :src="item.personnelImgList[0] ? (item.url + item.personnelImgList[0]) : (item.personnelImgList[1] ? (item.url + item.personnelImgList[1]) : (item.url + item.personnelImgList[2]))" class="person-image">
            <p class="person-name">{{ item.personnelName }}</p>
            <p class="person-position">{{ item.personnelDescribe }}</p>
            <p class="person-company">{{ item.groupName }}</p>
          </div>
          <div v-if="deleteAllOperationTag" :class="['delete-all-people-card',deletePeopleList.indexOf(item.personnelId) > -1 ? 'delete-all-people-checked' : '']" @click.stop="checkDeletePeople(item.personnelId)">
            <i class="el-icon-circle-check"></i>
          </div>
        </el-card>

        <!-- 搜索为空时显示 -->
        <div class="search-empty" v-if="!(personList.length || !Object.keys(searchResult).length)">
          <img :src="emptyImg" alt="">
          <p class="empty-content">
            <span class="content-first">对不起，没有找到符合条件的人员，</span>
            <span class="content-second">请重新搜索！</span>
          </p>
        </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      :page-size="9"
      v-if="count > 9"
      :current-page.sync="currentPage"
      :disabled='deleteAllOperationTag'
      background
      layout="prev,pager,next"
      :total="count"
      class="paging"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>
    <!-- 批量删除 -->
    <div class="delete-all">
      <i class="el-icon-arrow-left"></i>
      <p class="delete-all-text" @click="removeAll">批量删除</p>
      <i class="el-icon-arrow-right"></i>
      <div class="delete-all-operation" v-if="deleteAllOperationTag">
        <p :class="['detete-all-select', deletePeopleList.length !== personList.length ? '': 'delete-all-select-sure']">
          <i class="el-icon-circle-check" @click="deleteAllSelect">  选择全部</i>
        </p>
        <p class="delete-all-cancel" @click="deleteAllCancel">取消删除</p>
        <p class="delete-all-sure" @click="deleteAllSure">确定删除</p>
      </div>
    </div>
    <!-- 添加人员 -->
    <el-dialog
      v-loading.fullscreen.lock="isLoading"
      :visible.sync="dialogPersonAdd"
      width="25%"
      custom-class="person-detail-add"
      title="人员信息"
      :close-on-click-modal="false"
      :before-close="removePersonAddForm">
      <PersonAdd
        :editObj="editObj"
        :addOrEdit="addOrEdit"
        :deviceList="deviceList"
        :personTypeList="personTypeList"
        @addSumbit="addSumbit"
        ref="person-add">
      </PersonAdd>
    </el-dialog>

    <!-- 批量添加人员 -->
    <el-dialog :visible.sync="dialogPersonMoreAdd" title="批量入库" custom-class="person-detail-add" width="25%" :close-on-click-modal="false">
      <PersonAddMore ref="person-add-more" :databaseID="databaseID" :deviceList="deviceList" @closeAddMorePerson="closeAddMorePerson"></PersonAddMore>
    </el-dialog>
  </div>
</template>

<script>
 import Search from '@/views/search/Search';
 import PersonDetail from '@/views/person/PersonDetail';
 import PersonAdd from '@/views/person/PersonAdd';
 import PersonAddMore from '@/views/person/PersonAddMore';
 import api from '@/api';
 import config from '@/config';
 import { scollTop } from '@/utils';
 import { mapGetters, mapActions } from 'vuex';
 export default {
   name: 'Person',
   data () {
     return {
       isLoading: false, // submit loading
       databaseID: '',
       searchForm: {},
       searchResult: {},
       personList: [], // 人员列表
       count: 0, // 人员数量
       personTypeList: [], // 人员类型
       deviceList: [], // 设备列表
       personDetail: {}, // 个人详情
       dialogPersonDetail: false, // 详情框是否显示
       deleteAllOperationTag: false, // 进入删除全部标识
       deletePeopleList: [], //  删除人员集合
       dialogPersonAdd: false, // 添加人员框是否显示
       currentPage: 1, // 当前页
       addOrEdit: 0, // 0--> 增加， 1--> 编辑
       editObj: {}, // 编辑人员的对象
       emptyImg: require('@/assets/image/empty.png'), // 搜索为空时显示
       dialogPersonMoreAdd: false // 批量添加人员弹出框
     };
   },
   components: {
     Search,
     PersonDetail,
     PersonAdd,
     PersonAddMore
   },
   computed: {
     ...mapGetters([
       'selectedPersonDatabase',
       'user',
       'morePersonTranstion'
     ])
   },
   methods: {
     ...mapActions([
       'setSelectedPersonDatabase'
     ]),
     // 点击搜索
     searchSubmit () {
       this.searchResult = { ...this.searchForm };
     },
     // 请求
     async responseAPI (data = {}) {
       !data.libraryId && (data.libraryId = this.databaseID);
       !data.pageSize && (data.pageSize = 9);
       !data.page && (data.page = 1);
       let requestObj = {...data, ...this.searchResult};
       const response = await api.post(config.person.list, requestObj);
       if (Number(response.data.code) === 200) {
         this.count = response.data.data.totalCount;
         this.personList = response.data.data.dataList;
       }
     },
     // 点击分页
     async handleCurrentChange (val) {
       this.currentPage = val;
       this.responseAPI({page: val});
       scollTop(80);
     },
     // 查看详情
     async showPersonDetail (id) {
       const response = await api.post(config.person.detail, {personnelId: id});
       if (Number(response.data.code) === 200) {
         this.personDetail = response.data.data;
         this.dialogPersonDetail = true;
       }
     },
     // 删除单个人员
     async movePeople (id) {
       this.$confirm('你确认要把该人员从库中删除吗?', '提示', {
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async () => {
         let response = await api.post(config.person.delete, {personnelIdList: [id]});
         if (Number(response.data.code) === 200) {
           this.$message({
             type: 'success',
             message: response.data.msg
           });
           this.responseAPI();
         }
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '取消删除'
         });
       });
     },
     // 删除全部
     removeAll () {
       this.deleteAllOperationTag = true;
     },
     // 选择删除人员
     checkDeletePeople (id) {
       if (this.deletePeopleList.indexOf(id) > -1) {
         this.deletePeopleList.splice(this.deletePeopleList.indexOf(id), 1);
       } else {
         this.deletePeopleList.push(id);
       }
     },
     // 选择删除全部人员
     deleteAllSelect () {
       if (this.deletePeopleList.length !== this.personList.length) {
         this.deletePeopleList = [];
         this.personList.forEach(item => this.deletePeopleList.push(item.personnelId));
       } else {
         this.deletePeopleList = [];
       }
     },
     // 取消删除全部
     deleteAllCancel () {
       this.deletePeopleList = [];
       this.deleteAllOperationTag = false;
     },
     // 确认删除全部
     async deleteAllSure () {
       let requestObj = {personnelIdList: []};
       this.deletePeopleList.forEach(item => {
         requestObj.personnelIdList.push(item);
       });
       await api.post(config.person.deleteAll, requestObj);
       await this.responseAPI({page: this.currentPage});
       this.deletePeopleList = [];
       this.deleteAllOperationTag = false;
     },
     // 关闭添加人员前清空添加人员列表
     async removePersonAddForm (done) {
       this.$refs['person-add'] && this.$refs['person-add'].removePersonAddForm();
       done();
       await this.responseAPI({page: this.currentPage});
     },
     // 添加人员
     addPerson () {
       this.addOrEdit = 0;
       this.$refs['person-add'] && this.$refs['person-add'].personClearValidate('add-person-form');
       this.dialogPersonAdd = true;
     },
     // 编辑人员
     editPeople (obj) {
       this.addOrEdit = 1;
       this.editObj = {...obj};
       this.$refs['person-add'] && this.$refs['person-add'].personClearValidate('add-person-form');
       this.dialogPersonAdd = true;
     },
     // 提交添加人员
     async addSumbit (val) {
       let subObj = {...val};
      //  let requestUrl = 'edit';
       if (this.addOrEdit === 0) {
         subObj.libraryId = this.databaseID;
         this.currentPage = 1;
       }
        //  requestUrl = 'add';
      //  } else {
        //  delete subObj.image1;
        //  delete subObj.image2;
        //  delete subObj.image3;
      //  }
      // console.log(subObj)
       this.isLoading = true;
       subObj.status = this.addOrEdit;
       const response = await api.post(config.person.edit, subObj);
       if (Number(response.data.code) === 200) {
          this.$message({type: 'success', message: response.data.msg});
       } else {
         this.$message({type: 'error', message: response.data.msg});
       }
        await this.responseAPI({page: this.currentPage});
        this.$refs['person-add'] && this.$refs['person-add'].removePersonAddForm();
        this.isLoading = false;
        this.dialogPersonAdd = false;
     },
     checkCanAccess (id) {
       // check person database id or push to database
       if (!id || id === '') {
         const view = {name: 'Database', path: '/person/database', title: '库管理'};
         this.$store.dispatch('delVisitedViews', view).then(views => {
           // push router to region
           this.$router.push('/person/database');
         });
       }
     },
     addMorePerson () {
       if (this.morePersonTranstion) {
         this.$message({
           type: 'warning',
           message: '正在批量入库中！'
         });
         return;
       }
       this.dialogPersonMoreAdd = true;
       this.$refs['person-add-more'] && this.$refs['person-add-more'].clear();
     },
     closeAddMorePerson () {
       this.dialogPersonMoreAdd = false;
     }
   },
   async mounted () {
     this.databaseID = this.$route.params.id;
     if (!this.databaseID || this.databaseID === '') {
       this.databaseID = this.selectedPersonDatabase;
     }
     this.setSelectedPersonDatabase(this.databaseID);
     this.checkCanAccess(this.databaseID);
     this.responseAPI();
     let personTypeAPI = await api.post(config.database.list, {});
     if (Number(personTypeAPI.data.code) === 200) {
       this.personTypeList = personTypeAPI.data.data.dataList;
     }
      this.user && (this.deviceList = this.user.equipmentList);
   },
   watch: {
     searchResult: {
       async handler (newVal, oldVal) {
         this.searchForm = { ...newVal };
         await this.responseAPI({...this.searchForm});
         this.currentPage = 1;
       },
       deep: true
     },
     user: {
        handler (newVal) {
            this.deviceList = newVal.equipmentList;
        },
        deep: true
    },
    morePersonTranstion: {
      handler (newVal) {
        if (!newVal) {
          this.currentPage = 1;
          this.responseAPI({page: this.currentPage});
        }
      },
      deep: true
    }
   }
 };
</script>

<style lang="scss" scoped>
.search-form-box {
  margin: 30px 40px;
}
.person-nav {
  margin: 35px 0 5px 35px;
  overflow: hidden;
}
.person-list {
  width: 260px;
  height: 360px;
  border-radius: 10px;
  margin-right: 70px;
  margin-bottom: 65px;
  float: left;
  position: relative;
  overflow: hidden;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .el-icon-more {
    position: absolute;
    color: #666666;
    right: 15px;
    top: 5px;
    cursor: pointer;
  }
  .list-content {
    margin: 30px 20px;
    width: 180px;
    overflow: hidden;
    text-align: center;
  }
  .person-image {
    width: 150px;
    height: 150px;
  }
  .person-name {
    font-size: 22px;
    margin-top: 5px;
    margin-bottom: 20px;
    color: #444;
    font-weight: bold;
  }
  .person-position {
    margin-top: 0;
    font-size: 14px;
    color: #666;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .person-company {
    margin-top: 0;
    font-size: 14px;
    color: #666;
  }
}
.person-add {
  border: 1px dashed #999;
}
.add-content {
  margin: 0 auto;
  height: 120px;
  width: 120px;
  border: 1px dashed #999;
  border-radius: 15px;
  margin-top: 80px;
  line-height: 120px;
  font-size: 60px;
  color: #999;
  cursor: pointer;
}
.add-text {
  font-size: 18px;
  color: #666;
  font-weight: bold;
  cursor: pointer;
  margin-top: 25px;
}
.paging {
  display: block;
  margin-bottom: 40px;
}
// 删除全部
.delete-all {
  height: 70px;
  width: 70px;
  background-color: #fff;
  color: #666;
  font-size: 12px;
  border-radius: 50%;
  padding: 15px;
  z-index: 999;
  box-sizing: border-box;
  font-weight: bold;
  position: fixed;
  right: 0;
  bottom: 20px;
  margin-right: -35px;
  transition: all 1s;
  .el-icon-arrow-left,.el-icon-arrow-right {
    position: absolute;
    color: #008aff;
    top: 30px;
    font-size: 20px;
    font-weight: bold;
  }
  .el-icon-arrow-left {
    left: 0;
  }
  .el-icon-arrow-right {
    right: 0;
    display: none;
  }
  .delete-all-text {
    padding: 0;
    margin: 0;
    cursor: pointer;
    font-size: 12px;
  }
  .delete-all-operation {
    width: 300px;
    height: 210px;
    position: absolute;
    background-color: #fff;
    border-radius: 15px;
    left: -300px;
    top: -140px;
    text-align: center;
    overflow: hidden;
    padding: 30px 0;
    box-sizing: border-box;
    .el-icon-circle-check {
      font-size: 18px;
      color: #666;
      font-weight: bold;
      cursor: pointer;
    }
    .delete-all-cancel,.delete-all-sure {
      width: 200px;
      height: 40px;
      line-height: 40px;
      border-radius: 5px;
      color: #fff;
      font-size: 18px;
      font-weight: bold;
      text-align: center;
      margin: 0 auto;
      cursor: pointer;
      margin-top: 20px;
    }
    .delete-all-cancel {
      background-color: #008aff;
    }
    .delete-all-sure {
      background-color: #ff0000;
    }
  }
  &:hover {
    margin-right: 0px;
    .el-icon-arrow-left {
      display: none;
    }
    .el-icon-arrow-right {
      display: inline;
    }
  }
}
.delete-all-people-card {
  position: absolute;
  z-index: 888;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  line-height: 360px;
  font-size: 80px;
  color: #fff;
}
.delete-all-people-checked {
  color: #008aff;
}
.delete-all-select-sure {
  .el-icon-circle-check {
    color: #008aff !important;
  }
}
 .empty-content {
   font-size: 18px;
   font-weight: bold;
 }
 .content-second{
   display: block;
 }
</style>

<style lang="scss">
 .person-detail-show,.person-detail-add {
   border-radius: 15px;
 }
 .person-detail-add {
   text-align: left;
   .el-dialog__header {
     font-size: 20px;
     font-weight: bold;
     border-bottom: 1px solid lightgray;
   }

 }
 .person-pop {
   padding: 5px 10px;
   i {
     font-size: 22px;
     padding: 10px;
     cursor: pointer;
   }
 }

</style>
