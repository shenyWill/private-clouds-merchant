<template>
  <div class="region">
    <el-row :gutter="20" class="region__row">
      <el-col :span="12">
        <div class="region__add" @click="showDialog('addDialog')">
          <div class="region__add-button">
            <i class="el-icon-plus"></i>
          </div>
          <div class="region__add-info">
            <div class="region__add-title">区域</div>
            <div class="region__add-subtitle">添加新的区域</div>
          </div>
        </div>
      </el-col>
      <el-col :span="12" v-for="(item, index) in list" :key="index" class="region__list">
        <RegionCell
          :region="item"
          @edit="showEditDialog">
        </RegionCell>
      </el-col>
    </el-row>
    <el-pagination
      background
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="size">
    </el-pagination>

    <!-- Add Region Dialog -->
    <el-dialog
      class="region__dialog"
      :visible.sync="addDialog"
      :before-close="resetForm('addForm')"
      width="25%"
      title="添加区域">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addRules"
        label-position="top">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="addForm.areaName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRegion">确定</el-button>
      </span>
    </el-dialog>

    <!-- Edit Region Dialog -->
    <el-dialog
      class="region__dialog"
      :visible.sync="editDialog"
      :before-close="beforeEditClose"
      width="25%"
      title="编辑区域">
      <el-form
        ref="editForm"
        label-position="top"
        :model="editForm"
        :rules="editRules">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="editForm.areaName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editRegion">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import api from '@/api';
 import config from '@/config';
 import RegionCell from './RegionCell';
 export default {
   name: 'Region',
   data () {
     return {
       list: [],
       size: 0,
       currentPage: 1,
       selectedRegion: null,
       addDialog: false,
       editDialog: false,
       addForm: {},
       editForm: {},
       editRules: {
         areaName: [
           { required: true, message: '请填写区域名称', trigger: 'blur' }
         ]
       },
       addRules: {
         areaName: [
           { required: true, message: '请填写区域名称', trigger: 'blur' }
         ]
       }
     };
   },
   components: {
     RegionCell
   },
   methods: {
     handleCurrentChange (val) {
       this.currentPage = val;
       this.fetchData({ page: val, pageSize: 11 });
     },
     showDialog (name) {
       this[name] = true;
     },
     showEditDialog (data) {
       this.resetForm('editForm');
       this.selectedRegion = data;
       this.editForm = {
         title: data.areaName
       };
       this.showDialog('editDialog');
     },
     beforeEditClose (done) {
       this.selectedRegion = null;
       this.resetForm('editForm');
       this.editForm = {};
       done();
     },
     resetForm (name) {
       if (!name) return;
       if (!this.$refs[name]) return;
       this.$refs[name].resetFields();
     },
     editRegion () {
       this.$refs['editForm'].validate(async valid => {
         if (valid) {
           try {
             const response = await api.post(config.region.update, this.editForm);
             this.editDialog = false;
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '修改成功' });
               this.fetchData({ page: this.currentPage });
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
           } catch (e) {
           }
         } else {
           return false;
         }
       });
     },
     addRegion () {
       this.$refs['addForm'].validate(async valid => {
         if (valid) {
           try {
             const response = await api.post(config.region.add, this.editForm);
             this.addDialog = false;
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '修改成功' });
               this.fetchData({ page: this.currentPage });
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
           } catch (e) {
           }
         } else {
           return false;
         }
       });
     },
     async fetchData (payload) {
       try {
         const response = await api.get(config.region.list, payload);
         if (response.data.code === 0) {
           this.list = response.data.data;
           this.size = response.data.size;
         } else {
           this.$message({ type: 'error', message: response.data.msg });
         }
       } catch (e) {
         return false;
       }
     },
     init () {
       this.fetchData({pageSize: 11});
     }
   },
   mounted () {
     this.init();
   }
 };
</script>

<style lang="scss">
 .region {
   transition: all 1s;
   margin: 30px 20px 20px 40px;
   .region__add {
     position: relative;
     height: 120px;
     border: 1px dashed gray;
     border-radius: 20px;
     background-color: white;
     &:hover {
       cursor: pointer;
     }
     .region__add-button {
       margin: 20px;
       width: 80px;
       height: 80px;
       line-height: 80px;
       box-sizing: border-box;
       vertical-align: top;
       border-radius: 10px;
       border: 1px dashed lightgray;
       &:hover {
         border-color: black;
       }
     }
     .region__add-info {
       position: absolute;
       left: 150px;
       top: 20px;
       .region__add-title {
         margin-top: 10px;
         font-size: 20px;
         font-weight: bold;
       }
       .region__add-subtitle {
         margin-top: 10px;
         font-size: 16px;
       }
     }
   }
   .region__list {
     margin-bottom: 20px;
   }
   .region__dialog .el-dialog {
     text-align: left;
     border-radius: 20px;
     .el-dialog__header {
       font-size: 20px;
       font-weight: bold;
       border-bottom: 1px solid lightgray;
     }
     .el-dialog__footer {
       text-align: center;
       padding-top: 0;
       padding-bottom: 50px;
     }
     .el-dialog__footer .el-button {
       width: 50%;
     }
     .el-form {
       margin: 0 auto;
       width: 50%;
       font-weight: bold;
     }
   }
 }
</style>
