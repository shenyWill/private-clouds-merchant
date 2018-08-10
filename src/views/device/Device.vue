<template>
  <div class="device">
    <div class="device__list">
      <div
        @mouseover="hoverAddButton()"
        @mouseout="leaveAddButton()"
        :class="['device__button-hover', showAddButton ? addButtonStyle : '']">
        <el-button
          @click="showDialog('addDialog')"
          circle>
          添加
          <br/>
          设备
        </el-button>
      </div>
      <div class="device__list-header">
        查看设备
      </div>
      <DeviceCell
        v-for="(device, index) in list"
        @delete="showDeleteDialog"
        @detail="showDetailDialog"
        @edit="showEditDialog"
        :device="device"
        :key="index">
      </DeviceCell>
    </div>
    <el-pagination
      background
      :current-page="currentPage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="size">
    </el-pagination>

    <!-- Add Device Dialog -->
    <el-dialog
      class="device__dialog-add"
      :before-close="resetForm('addForm')"
      title="添加设备"
      :visible.sync="addDialog"
      width="25%">
      <el-form
        ref="addForm"
        label-position="top"
        :model="addForm"
        :rules="addRules"
        class="device__form-add">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="addForm.equipmentName" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备种类" prop="equipmentType">
          <el-select v-model="addForm.equipmentType" placeholder="请选择设备种类"></el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaName">
          <el-select v-model="addForm.areaName" placeholder="请选择所属区域"></el-select>
        </el-form-item>
        <el-form-item label="设备账号" prop="loginName">
          <el-input v-model="addForm.loginName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="设备密码" prop="loginPwd">
          <el-input v-model="addForm.loginPwd" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="address">
          <el-select v-model="deviceAddress" placeholder="请选择">
            <el-option v-for="item in addressType" :key="item.key" :value="item.value" :label="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备URL地址" prop="url" v-if="deviceAddress === 'url'">
          <el-input v-model="addForm.url" placeholder="请输入设备URL地址"></el-input>
        </el-form-item>
        <el-form-item label="设备IP地址" prop="ipAddress" v-if="deviceAddress === 'ip'">
          <el-input v-model="addForm.ipAddress" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" v-if="deviceAddress === 'ip'">
          <el-input v-model="addForm.port" placeholder="请输入设备端口号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">确定</el-button>
      </span>
    </el-dialog>

    <!--  Edit Device Dialog -->
    <el-dialog
      class="device__dialog-add"
      :before-close="beforeEditClose"
      :visible.sync="editDialog"
      width="25%"
      title="修改设备">
      <el-form ref="editForm" :model="editForm" label-position="top" :rules="editRules" class="device__form-add">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="editForm.equipmentName" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备种类" prop="equipmentType">
          <el-select v-model="editForm.equipmentType" placeholder="请选择设备类型"></el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaName">
          <el-select v-model="editForm.areaName" placeholder="请选择所属区域"></el-select>
        </el-form-item>
        <el-form-item label="设备地址" prop="address">
          <el-select v-model="deviceAddress" placeholder="请选择">
            <el-option v-for="item in addressType" :key="item.key" :value="item.value" :label="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备URL地址" prop="url" v-if="deviceAddress === 'url'">
          <el-input v-model="editForm.url" placeholder="请输入设备URL地址"></el-input>
        </el-form-item>
        <el-form-item label="设备IP地址" prop="ipAddress" v-if="deviceAddress === 'ip'">
          <el-input v-model="editForm.ipAddress" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" v-if="deviceAddress === 'ip'">
          <el-input v-model="editForm.port" placeholder="请填写设备端口号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editDevice">确定</el-button>
      </span>
    </el-dialog>

    <!-- Device Detail Dialog -->
    <el-dialog
      title="设备详情"
      class="device__dialog-detail"
      width="25%"
      :visible.sync="detailDialog">
      <div class="dialog__content">
        <div class="dialog__content-item" v-for="(value, key) in deviceDetail" :key="key">
          <span class="dialog__content-key">{{ key }}:</span>
          <span class="dialog__content-value">{{ value }}</span>
        </div>
      </div>
    </el-dialog>

    <!-- Delete Device Dialog -->
    <el-dialog
      title="提示"
      width="25%"
      class="device__dialog-delete"
      :visible.sync="deleteDialog">
      <span class="dialog__content">你确认要删除该设备吗？</span>
      <span slot="footer">
        <el-button @click="deleteDialog = false" type="primary">取消删除</el-button>
        <el-button @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import api from '@/api';
 import config from '@/config';
 import DeviceCell from './DeviceCell';

 export default {
   name: 'Device',
   components: {
     DeviceCell
   },
   data () {
     return {
       list: null, // deivce list
       deviceDetail: null, // detail dialog info
       size: 0, // device list count
       currentPage: 1, // device list page
       deviceAddress: '', // device ip or url address
       addressType: [{
         key: 'IP地址',
         value: 'ip'
       }, {
         key: 'URL地址',
         value: 'url'
       }],
       addDialog: false,
       editDialog: false,
       detailDialog: false,
       deleteDialog: false,
       addForm: {},
       editForm: {},
       addRules: {
         equipmentName: [
           { required: true, message: '请输入设备名称', trigger: 'blur' }
         ],
         equipmentType: [
           { required: true, message: '请选择设备种类', trigger: 'change' }
         ],
         areaName: [
           { required: true, message: '请选择所属区域', trigger: 'change' }
         ],
         address: [
           { required: true, message: '请选择', trigger: 'change' }
         ],
         port: [
           { required: true, message: '请填写端口号', trigger: 'blur' }
         ],
         loginName: [
         ],
         loginPsw: []
       },
       editRules: {
         equipmentName: [
           { required: true, message: '请输入设备名称', trigger: 'blur' }
         ],
         equipmentType: [
           { required: true, message: '请选择设备种类', trigger: 'change' }
         ],
         areaName: [
           { required: true, message: '请选择所属区域', trigger: 'change' }
         ],
         address: [
           { required: true, message: '请选择', trigger: 'change' }
         ],
         port: [
           { required: true, message: '请填写端口号', trigger: 'blur' }
         ],
         loginName: [
         ],
         loginPsw: []
       },
       showAddButton: false,
       addButtonStyle: {
         'device__button-show': true
       }
     };
   },
   methods: {
     resetForm (name) {
       if (!name) return;
       if (!this.$refs[name]) return;
       this.$refs[name].resetFields();
     },
     hoverAddButton () {
       this.showAddButton = true;
     },
     leaveAddButton () {
       this.showAddButton = false;
     },
     showDialog (name) {
       this[name] = true;
     },
     showEditDialog (data) {
       this.deviceDetail = data;
       if (data.ipAddress) this.deviceAddress = 'ip';
       else this.deviceAddress = 'url';
       this.editForm = {
         ...data,
         address: this.deviceAddress
       };
       this.showDialog('editDialog');
     },
     showDeleteDialog (data) {
       this.deviceDetail = data;
       this.showDialog('deleteDialog');
     },
     showDetailDialog (data) {
       this.deviceDetail = data;
       this.showDialog('detailDialog');
     },
     beforeEditClose (done) {
       this.resetForm('editForm');
       this.deviceDetail = null;
       this.deviceAddress = '';
       this.editForm = {};
       done();
     },
     // page pagination change
     handleCurrentChange (val) {
       this.currentPage = val;
       this.fetchData({ page: val });
     },
     editDevice (data) {
       this.$refs['editForm'].validate(async valid => {
         if (valid) {
           try {
             const response = await api.post(config.device.update, this.editForm);
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '添加成功' });
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
     // add device form submit button clicked
     addDevice () {
       this.$refs['addForm'].validate(async valid => {
         if (valid) {
           try {
             const response = await api.post(config.device.add, this.addForm);
             this.addDialog = false;
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '添加成功' });
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
     // submit delete device action
     async deleteDevice () {
       const id = this.deviceDetail.id;
       const response = await api.post(config.device.delete, {id});
       this.deleteDialog = false;
       if (response.data.code === 0) {
         this.$message({ type: 'success', message: response.data.msg });
         this.fetchData({ page: this.currentPage });
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     async fetchData (payload) {
       const response = await api.get(config.device.list, payload);
       if (response.data.code === 0) {
         this.list = response.data.data;
         this.size = response.data.size;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     async init () {
       await this.fetchData({});
     }
   },
   mounted () {
     this.init();
   }
 };
</script>

<style lang="scss">
 .device {
   transition: all 1s;
 }
 .device__list {
   position: relative;
   margin: 20px 20px 20px 40px;
   border: 1px solid lightgray;
   border-radius: 10px;
   background-color: white;
 }
 .device__list-header {
   position: relative;
   padding: 10px;
   margin-left: 20px;
   text-align: left;
   font-size: 20px;
   font-weight: bold;
   border-bottom: 1px solid lightgray;
 }
 .device .el-dialog {
   border-radius: 20px;
 }
 .device .el-dialog__header {
   font-weight: bold;
   text-align: left;
   border-bottom: 1px solid lightgray;
 }
 .device .device__button-hover {
   position: fixed;
   width: 70px;
   height: 70px;
   border-radius: 35px;
   right: -35px;
   bottom: 100px;
   z-index: 1;
 }
 .device .device__button-show {
   right: 0;
 }
 .device .device__button-hover .el-button {
   width: 100%;
   height: 100%;
   padding: 0;
 }
 .device .device__form-add {
   font-weight: bold;
   margin: 0 auto;
   width: 50%;
   text-align: left;
 }
 .device__form-add .el-form-item__label {
   padding: 0;
 }
 .device__form-add .el-select {
   width: 100%;
 }
 .device .el-dialog .el-dialog__body {
   margin: 0 auto;
   font-weight: bold;
   text-align: left;
   overflow: hidden;
 }
 .device .el-dialog .el-dialog__footer {
   padding-top: 0;
   padding-bottom: 50px;
   text-align: center;
 }
 .device .device__dialog-delete .el-dialog__body {
   text-align: center;
 }
 .device__dialog-add .el-dialog__footer .el-button {
   width: 50%;
 }
 .device .device__dialog-detail .dialog__content-item {
   position: relative;
   margin-left: 30px;
   margin-bottom: 20px;
 }
 .device .device__dialog-detail .dialog__content-value {
   position: absolute;
   font-weight: normal;
   left: 100px;
   right: 20px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
</style>
