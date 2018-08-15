<template>
  <div class="database">
    <div class="database-nav">
      <el-card class="database-add">
        <div class="detabase-add-icon"  @click="addDatabase(0)">
          <i class="el-icon-plus"></i>
        </div>
        <div class="detabase-add-content">
          <p class="content-num">0 人</p>
          <p class="content-operate">添加新的人员库</p>
        </div>
      </el-card>
      <el-card class="database-list" v-for="(obj,index) in databaseArr" :key="obj.libraryId" @click.native="goPerson(obj.libraryId)">
          <div class="database-list-icon" :style="index <iconObj.databaseBg.length ? {background: iconObj.databaseBg[index]} : {background: '#00a0e9'}">
            <i class="el-icon-tickets"></i>
          </div>
          <div class="database-list-content">
            <p class="database-list-library">
              <span class="library-name">{{ obj.libraryName }}</span>
              <span class="library-count">({{ obj.personnelCount }}人)</span>
            </p>
            <el-tag :type="checkType(obj.libraryTypeName)" > {{ obj.libraryTypeName }}</el-tag>
            <p class="database-list-group">所属组织： {{ obj.groupName }}</p>
          </div>
          <i class="el-icon-view detabase-detail detabase-opa" @click.self.stop="goPerson(obj.libraryId)"></i>
          <i class="el-icon-circle-plus-outline detabase-add detabase-opa"></i>
          <i class="el-icon-edit detabase-edit detabase-opa" @click.self.stop="addDatabase(obj)"></i>
          <i class="el-icon-delete detabase-delete detabase-opa" @click.self.stop="deleteDatabase(obj)"></i>
      </el-card>
    </div>

    <!-- 添加编辑人员库 -->
    <el-dialog :title="dialogDatabaseTitle" :visible.sync="dialogAddDatabase" width="30%" :before-close="closeDatabase">
      <el-form :rules="databaseRule" ref="database-form" :model="addForm" label-position="left" label-width="60px">
        <el-form-item label="库名称" prop="libraryName">
          <el-col :span="15">
            <el-input v-model="addForm.libraryName" placeholder="请输入人员库名称"></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="库类型" prop="libraryTypeId">
          <el-col :span="16">
            <el-select v-model="addForm.libraryTypeId" placeholder="请选择人员库类型">
              <el-option v-for="item in databaseTypeArr" :key="item.libraryType" :label="item.libraryTypeName" :value="item.id"></el-option>
            </el-select>
          </el-col>
        </el-form-item>
        <el-form-item>
          <el-button @click="databaseSumbit" type="primary">确认添加</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!-- 删除人员库 -->
    <el-dialog title="提示" :visible.sync="dialogDeleteDatabase" width="30%">
      <div class="can-not-delete" v-if="!deleteDatabaseCondition">
        <p class="can-not-delete-detail">请删除人员库中的所有人员，否则无法删除该库</p>
        <el-button type="primary" class="can-not-delete-button" @click="dialogDeleteDatabase=false">确认</el-button>
      </div>
      <div class="can-delete" v-if="deleteDatabaseCondition">
        <p class="can-delete-detail">你确认要删除人员库吗？</p>
        <el-button type="primary" class="can-delete-cancel" @click="dialogDeleteDatabase=false">取消删除</el-button>
        <el-button type="info" class="can-delete-submit" @click="deleteDatabaseSubmit">确认删除</el-button>
      </div>
    </el-dialog>

     <!-- 分页 -->
    <el-pagination background layout="prev,pager,next" :current-page.sync="currentPage" :total="count" class="paging" @current-change="handleCurrentChange"></el-pagination>
  </div>
</template>

<script>
import api from '@/api';
import config from '@/config';
import icon from '@/config/icon.js';
import { scollTop } from '@/utils';
 export default {
   name: 'Database',
   data () {
     return {
       databaseArr: [], // 人员库列表
       databaseTypeArr: [], // 库类型列表
       iconObj: {}, // 人员库icon
       dialogAddDatabase: false, // 是否打开编辑人员库和增加人员库弹窗
       dialogDatabaseTitle: '',
       addForm: {}, // 增加的人员库对象
       addOrEdit: 0, // 0-->增加，1-->编辑
       dialogDeleteDatabase: false, // 是否打开删除人员库弹窗
       deleteDatabaseCondition: false, // 判断该人员库是否可以删除
       deleteDatabaseId: '', // 删除人员ID
       currentPage: 1, // 当前页数
       count: 0, // 总条数
       databaseRule: {
         libraryName: [
            { required: true, message: '请输入库名称', trigger: 'blur' }
         ],
         libraryTypeId: [
           { required: true, message: '请选择库类型', trigger: 'change' }
         ]
       }
     };
   },
   methods: {
     async responseAPI (data = {}) {
      let response = await api.post(config.database.list, data);
      if (Number(response.data.code) === 0) {
        this.databaseArr = response.data.data.dataList;
        this.count = response.data.data.totalCount;
      } else {
        this.$message({
          type: 'error',
          message: '读取数据失败！'
        });
      }
     },
     async responseTypeAPI (data = {}) {
       let response = await api.post(config.database.typeList, data);
       if (Number(response.data.code) === 0) {
         this.databaseTypeArr = response.data.data.dataList;
       }
     },
     checkType (val) {
      switch (val) {
        case '白名单':
        return 'success';
        case '黑名单':
        return 'danger';
        case '其他':
        return 'info';
        default:
          break;
      }
    },
    // 添加人员库弹窗打开
    addDatabase (val) {
      if (val === 0) {
        this.dialogDatabaseTitle = '添加人员库';
        this.addOrEdit = 0;
      } else {
        this.dialogDatabaseTitle = '编辑人员库';
        this.addOrEdit = 1;
        this.addForm = {libraryName: val.libraryName, libraryTypeId: val.libraryTypeId, libraryId: val.libraryId};
      }
      this.dialogAddDatabase = true;
      this.$refs['database-form'] && this.$refs['database-form'].clearValidate();
    },
    // 添加人员
    async databaseSumbit () {
      this.$refs['database-form'].validate(async (valid) => {
        if (valid) {
          let apiUrl, resMsg;
          if (this.addOrEdit === 0) {
            apiUrl = config.database.add;
            resMsg = '人员库添加成功';
          } else {
            apiUrl = config.database.edit;
            resMsg = '人员库修改成功';
          }
          let response = await api.post(apiUrl, {...this.addForm});
          if (Number(response.data.code) === 0) {
            this.responseAPI({page: 1, pageSize: 9});
            this.currentPage = 1;
            this.$message({
              type: 'success',
              message: resMsg
            });
          } else {
            this.$message({
              type: 'error',
              message: response.data.msg
            });
          }
          this.addForm = {};
          this.dialogAddDatabase = false;
        }
      });
    },
    // 关闭编辑增加框重置增加信息
    closeDatabase (done) {
      this.addForm = {};
      done();
    },
    // 删除人员库打开
    deleteDatabase (val) {
      this.dialogDeleteDatabase = true;
      if (Number(val.personnelCount) === 0) {
        this.deleteDatabaseCondition = true;
        this.deleteDatabaseId = val.libraryId;
      } else {
        this.deleteDatabaseCondition = false;
      }
    },
    // 确定删除人员库
    async deleteDatabaseSubmit () {
      let msgType;
      let id = this.deleteDatabaseId;
      let response = await api.post(config.database.delete, {libraryId: id});
      if (Number(response.data.code) === 0) {
        msgType = 'success';
      } else {
        msgType = 'error';
      }
      this.$message({
        type: msgType,
        message: response.data.msg
      });
      await this.responseAPI({page: this.currentPage, pageSize: 9});
      this.dialogDeleteDatabase = false;
    },
    // 前往人员列表
    goPerson (id) {
      this.$router.push({path: 'index', query: {id: id}});
    },
    // 分页
    handleCurrentChange (val) {
      this.responseAPI({page: val, pageSize: 9});
      scollTop(80);
    }
   },
   async mounted () {
     this.responseAPI({page: 1, pageSize: 9});
     this.responseTypeAPI();
     this.iconObj = icon;
   }
 };
</script>

<style lang="scss" scoped>
.database-nav {
  margin: 50px;
  overflow: hidden;
  .database-add,.database-list {
    width: 740px;
    height: 160px;
    border-radius: 10px;
    float: left;
    margin-right: 50px;
    margin-bottom: 50px;
    position: relative;
  }
  .database-list:nth-child(2n) {
    margin-right: 0;
  }
  .database-list:hover {
    .detabase-opa {
      display: block;
    }
  }
  .database-add {
    border: 1px dashed #999;
  }
  .detabase-add-icon {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 8px;
    border: 1px dashed #999;
    color: #999;
    font-size: 60px;
    cursor: pointer;
    float: left;
  }
  .detabase-add-content {
    float: left;
    text-align: left;
    margin-left: 20px;
    p {
      margin: 15px 0;
    }
  }
  .content-num {
    font-size: 26px;
    font-weight: bold;
  }
  .content-operate {
    font-size: 18px;
    color: #666;
  }
  .database-list-icon {
    height: 120px;
    width: 120px;
    line-height: 120px;
    border-radius: 20px;
    font-size: 60px;
    overflow: hidden;
    float: left;
    color: #ffffff;
  }
  .database-list-content {
    width: 300px;
    height: 120px;
    float: left;
    margin-left: 20px;
    text-align: left;
  }
  .database-list-library {
    font-size: 20px;
    font-weight: bold;
    margin: 5px 0;
  }
  .library-name {
    font-size: 26px;
  }
  .database-list-group {
    font-size: 16px;
    color: #666;
    margin: 10px 0;
  }
  .detabase-opa {
    color: #666666;
    font-size: 35px;
    position: absolute;
    top: 60px;
    display: none;
    cursor: pointer;
  }
  .detabase-detail {
    right: 244px;
  }
  .detabase-add {
    right: 174px;
  }
  .detabase-edit {
    right: 104px;
  }
  .detabase-delete {
    right: 34px;
  }
}
.can-not-delete-detail {
  font-weight: bold;
  margin-top: 0;
}
.can-not-delete-button {
  margin-left: 130px;
  margin-top: 20px;
}
.can-delete-detail {
  font-weight: bold;
  margin-left: 100px;
  margin-bottom: 50px;
}
.can-delete-cancel {
  margin-left: 75px;
}

</style>
<style>
.database .el-dialog {
  text-align: left;
  border-radius: 20px;
}
.database .el-dialog__body {
  margin-left: 80px;
}
</style>
