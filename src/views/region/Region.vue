<template>
  <div class="region">
    <Search :searchResult="searchResult" v-if="false">
      <el-form
        class="region__search"
        slot="search-form"
        ref="searchForm"
        label-width="80px"
        :model="searchForm">
        <el-form-item label="区域名称" prop="areaName">
          <el-input v-model="searchForm.areaName" placeholder="请输入区域名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </Search>
    <div class="region__list">
      <el-row :gutter="20" class="region__row">
        <el-col :span="12">
          <div class="region__add" @click="showDialog('addRegionDialog', 'addForm')">
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
            @view="viewRegionDetail"
            @delete="showDeleteDialog"
            @device="showAddDeviceDialog"
            @edit="showEditDialog">
          </RegionCell>
        </el-col>
      </el-row>
      <el-pagination
        v-if="size > 11"
        background
        :current-page.sync="currentPage"
        :page-size="limit"
        @current-change="handleCurrentChange"
        layout="prev, pager, next"
        :total="size">
      </el-pagination>
    </div>

    <!-- Add Region Dialog -->
    <el-dialog
      v-loading.fullscreen.lock="isLoading"
      class="region__dialog"
      :visible.sync="addRegionDialog"
      width="25%"
      title="添加区域">
      <el-form
        ref="addForm"
        :model="addForm"
        label-width="80px"
        label-position="right"
        :rules="addRules">
        <el-form-item label="区域名称" prop="areaName">
          <el-input
            v-model="addForm.areaName"
            placeholder="请输入区域名称"
            @keyup.enter.native="addRegion">
          </el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addRegion">确定</el-button>
      </span>
    </el-dialog>

    <!-- Edit Region Dialog -->
    <el-dialog
      v-loading.fullscreen.lock="isLoading"
      class="region__dialog"
      :visible.sync="editDialog"
      :before-close="beforeEditClose"
      width="25%"
      title="编辑区域">
      <el-form
        ref="editForm"
        label-width="80px"
        label-position="right"
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

    <!-- Add Device Dialog -->
    <el-dialog
      v-loading.fullscreen.lock="isLoading"
      class="region__dialog"
      title="添加设备"
      :visible.sync="addDeviceDialog"
      :close-on-click-modal="false"
      :fullscreen="true"
      width="25%">
      <el-form ref="deviceForm"
        :model="deviceForm"
        :rules="deviceRules"
        label-position="right"
        label-width="100px">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="deviceForm.equipmentName" placeholder="请输入设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备种类" prop="equipmentType">
          <el-select v-model="deviceForm['equipmentType']" placeholder="请选择"  @change="changeEquipmentAddType">
            <el-option
              v-for="item in config.deviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaName">
          <el-input v-model="deviceForm.areaName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="设备账号" prop="loginName" v-if="deviceForm['equipmentType'] == 2">
          <el-input v-model="deviceForm.loginName" placeholder="请输入设备账号"></el-input>
        </el-form-item>
        <el-form-item label="设备密码" prop="loginPsw" v-if="deviceForm['equipmentType'] == 2">
          <el-input v-model="deviceForm.loginPsw" placeholder="请输入与设备密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand" v-if="deviceForm['equipmentType'] == 2">
          <el-input v-model="deviceForm.brand" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="型号系列" prop="brandseries" v-if="deviceForm['equipmentType'] == 2">
          <el-input v-model="deviceForm.brandseries" placeholder="请输入设备型号系列"></el-input>
        </el-form-item>
        <el-form-item label="播放地址" prop="mediaUrl" v-if="deviceForm['equipmentType'] == 2">
          <el-input v-model="deviceForm.mediaUrl" placeholder="请输入设备rtsp/rtmp地址"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="deviceAddress" v-if="deviceForm['equipmentType'] == 2">
          <el-select v-model="deviceForm['deviceAddress']" placeholder="请选择" @change="changeAddDeviceAddress">
            <el-option
              v-for="item in config.deviceAddressType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="deviceForm.deviceAddress === 'ip' && deviceForm['equipmentType'] == 2" label="IP地址" prop="ipAddress">
          <el-input v-model="deviceForm.ipAddress" placeholder="请输入设备IP地址"></el-input>
        </el-form-item>
        <el-form-item v-if="deviceForm.deviceAddress === 'ip' && deviceForm['equipmentType'] == 2" label="设备端口号" prop="port">
          <el-input v-model="deviceForm.port" placeholder="请填写设备端口号"></el-input>
        </el-form-item>
        <el-form-item v-if="deviceForm.deviceAddress === 'url' && deviceForm['equipmentType'] == 2" label="URL地址" prop="url">
          <el-input v-model="deviceForm.url" placeholder="请输入设备URL地址"></el-input>
        </el-form-item>
        <el-form-item label="SN码" prop="serialNo" v-if="deviceForm['equipmentType'] == 1">
          <el-input v-model="deviceForm.serialNo" placeholder="请填写SN码"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">确定</el-button>
      </span>
    </el-dialog>

    <!-- Delete No Device Region Dialog -->
    <el-dialog
      class="region__dialog region__dialog-delete"
      title="提示"
      :visible.sync="deviceRegionDialog"
      width="25%">
      <span>你确定要删除该区域吗？</span>
      <span slot="footer" class="dialog-footer-row">
        <el-button type="primary" @click="deviceRegionDialog = false;">取消删除</el-button>
        <el-button @click="deleteRegion">确定删除</el-button>
      </span>
    </el-dialog>

    <!-- Delete Region With Devices Dialog -->
    <el-dialog
      class="region__dialog region__dialog-delete"
      title="提示"
      :visible.sync="noDeviceRegionDialog"
      width="25%">
      <span>请删除区域中的设备，否则无法删除该区域</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="noDeviceRegionDialog = false;">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 import api from '@/api';
 import config from '@/config';
 import RegionCell from './RegionCell';
 import Search from '@/views/search/Search';
 import { isValidIP } from '@/utils';
 import { mapActions } from 'vuex';
 export default {
   name: 'Region',
   data () {
     return {
       isLoading: false,
       list: [], // region list data
       size: 0, // list total size
       offset: 0, // list offset
       limit: 11, // list count per page
       currentPage: 1, // page pagination current page
       selectedRegion: null, // current selected region for all actions
       addRegionDialog: false,
       addDeviceDialog: false,
       editDialog: false,
       noDeviceRegionDialog: false,
       deviceRegionDialog: false,
       searchForm: {},
       addForm: {
         areaName: ''
       }, // add region form
       editForm: {}, // edit device form
       deviceForm: {}, // add device form
       searchResult: {}, // search form result
       editRules: {
         areaName: [
           { required: true, message: '请填写区域名称', trigger: 'blur' },
           { min: 2, max: 18, message: '请输入2-18位字符', trigger: 'blur' }
         ]
       },
       // add device form rules
       deviceRules: {
         equipmentName: [
           { required: true, message: '请输入设备名称', trigger: 'blur' },
           { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
         ],
         equipmentType: [
           { required: true, message: '请选择设备种类', trigger: 'change' }
         ],
         areaName: [
           { required: true, message: '请选择所属区域', trigger: 'change' }
         ],
         brand: [
           { required: true, message: '请输入设备品牌名称', trigger: 'blur' }
         ],
         brandseries: [
           { required: true, message: '请输入设备型号系列', trigger: 'blur' }
         ],
         mediaUrl: [
           { required: true, message: '请输入设备rtsp或者rtmp地址', trigger: 'blur' },
           { validator: this.checkAddDeviceMediaURL, trigger: 'blur' }
         ],
         deviceAddress: [
           { required: true, message: '请选择设备地址', trigger: 'change' }
         ],
         ipAddress: [
           { required: true, message: '请填写设备IP地址', trigger: 'blur' },
           { validator: this.checkAddDeviceIP, trigger: 'blur' }
         ],
         url: [
           { required: true, message: '请填写设备URL地址', trigger: 'blur' },
           { validator: this.checkAddDeviceURL, trigger: 'blur' }
         ],
         port: [
           { required: true, message: '请填写端口号', trigger: 'blur' },
           { validator: this.checkPort, trigger: 'blur' }
         ],
         loginName: [
           { required: true, message: '请填写设备账号', trigger: 'blur' }
         ],
         loginPsw: [
           { required: true, message: '请填写设备密码', trigger: 'blur' }
         ],
         serialNo: [
           { required: true, message: '请填写SN码', trigger: 'blur' }
         ]
       },
       addRules: {
         areaName: [
           { required: true, message: '请填写区域名称', trigger: 'blur' },
           { min: 2, max: 18, message: '请输入2-18位字符', trigger: 'blur' }
         ]
       }
     };
   },
   computed: {
     config: () => {
       return config;
     }
   },
   watch: {
     searchResult: {
       handler (newVal, oldVal) {
         this.searchForm = {...newVal};
         this.currentPage = 1;
         this.fetchData({ offset: 0, limit: this.limit, ...this.searchForm });
       },
       deep: true
     }
   },
   components: {
     RegionCell,
     Search
   },
   methods: {
     ...mapActions([
      'login'
    ]),
     handleCurrentChange (val) {
       this.currentPage = val;
       this.offset = (val - 1) * this.limit;
       this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
     },
     checkPort (rule, value, callback) {
       if (isNaN(value)) {
         callback(new Error('请输入正确的端口号'));
       } else if (parseInt(value) && (parseInt(value) > 65535 || parseInt(value) < 0)) {
         callback(new Error('请输入正确的端口号'));
       } else if (parseInt(value) === 0) {
         callback(new Error('请输入正确的端口号'));
       }
       callback();
     },
     checkAddDeviceMediaURL (rule, value, callback) {
       if (!value.startsWith('rtsp://') && !value.startsWith('rtmp://')) {
         callback(new Error('请输入设备正确rtsp或者rtmp地址'));
       } else {
         callback();
       }
     },
     checkAddDeviceIP (rule, value, callback) {
       if (this.deviceForm.deviceAddress === 'ip' && (!value || value === '')) {
         callback(new Error('请输入设备IP地址'));
       } else if (this.deviceForm.deviceAddress === 'ip' && !isValidIP(value)) {
         callback(new Error('请填写正确格式的IP地址'));
       } else {
         callback();
       }
     },
     checkAddDeviceURL (rule, value, callback) {
       if (this.deviceForm.deviceAddress === 'url' && (!value || value === '')) {
         callback(new Error('请输入设备URL地址'));
       } else {
         callback();
       }
     },
     // router to device component
     viewRegionDetail (data) {
       const id = data.id;
       this.$router.push({ name: 'Device', params: {id} });
     },
     showDialog (dialog, form) {
       this.resetForm(form);
       this[dialog] = true;
     },
     resetForm (name) {
       if (!name) return;
       if (!this.$refs[name]) return;
       this.$refs[name].resetFields();
     },
     showEditDialog (data) {
       this.selectedRegion = data;
       this.editForm = {
         id: data.id,
         areaName: data.areaName
       };
       this.showDialog('editDialog', 'editForm');
     },
     showAddDeviceDialog (data) {
       this.selectedRegion = data;
       this.deviceForm = {
         areaName: data.areaName,
         areaId: data.id
       };
       this.showDialog('addDeviceDialog', 'deviceForm');
     },
     changeAddDeviceAddress (val) {
       this.$refs['deviceForm'].clearValidate(['ipAddress', 'url', 'port']);
     },
     async showDeleteDialog (data) {
       this.selectedRegion = data;
       const canDelete = await this.canDeleteRegion(data.id);
       if (!canDelete) {
         this.noDeviceRegionDialog = true;
       } else {
         this.deviceRegionDialog = true;
       }
     },
     /*
      * can delete region
      * @params {String} region ID
      * true for yes, false for no
      * */
     async canDeleteRegion (areaId) {
       const response = await api.post(config.region.devices, {areaId});
       if (Number(response.data.code) === 200) {
         const total = response.data.data.total;
         if (total > 0) {
           return false;
         } else {
           return true;
         }
       } else {
         this.$message({ type: 'error', message: response.data.msg });
         return false;
       }
     },
     // before edit dialog close
     beforeEditClose (done) {
       this.selectedRegion = null;
       this.editForm = {};
       done();
     },
     async deleteRegion () {
       const id = this.selectedRegion.id;
       const response = await api.post(config.region.delete, {id});
       this.deviceRegionDialog = false;
       if (Number(response.data.code) === 200) {
         this.$message({ type: 'success', message: '删除区域成功' });
         this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     // add device request
     addDevice () {
       this.$refs['deviceForm'].validate(async valid => {
         if (valid) {
           try {
             let data;
             if (Number(this.deviceForm.equipmentType) === 1) {
               data = {
                 equipmentName: this.deviceForm.equipmentName,
                 equipmentType: this.deviceForm.equipmentType,
                 areaId: this.deviceForm.areaId,
                 serialNo: this.deviceForm.serialNo
               };
             } else {
               data = {
                ...this.deviceForm,
                ipAddress: this.deviceForm.deviceAddress === 'ip' ? this.deviceForm.ipAddress : '',
                port: this.deviceForm.deviceAddress === 'ip' ? this.deviceForm.port : '',
                url: this.deviceForm.deviceAddress === 'url' ? this.deviceForm.url : ''
              };
             }
             this.isLoading = true;
             const response = await api.post(config.device.add, data);
             this.addDeviceDialog = false;
             if (Number(response.data.code) === 200) {
               this.deviceForm.ipAddress = '';
               this.deviceForm.url = '';
               this.deviceForm.port = null;
               this.resetForm('addForm');
               this.$message({ type: 'success', message: '添加设备成功' });
               this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
               const response = await api.post(config.personCenter.list, {});
               if (Number(response.data.code) === 200) {
                  this.login(response.data.user);
               }
             } else {
               this.deviceForm.ipAddress = '';
               this.deviceForm.url = '';
               this.deviceForm.port = null;
               this.resetForm('addForm');
               this.$message({ type: 'error', message: response.data.msg });
             }
             this.isLoading = false;
           } catch (e) {
           }
         } else {
           return false;
         }
       });
     },
     changeEquipmentAddType () {
       this.$refs['deviceForm'].clearValidate(['serialNo', 'ipAddress', 'url', 'port', 'loginName']);
     },
     // edit region request
     editRegion () {
       this.$refs['editForm'].validate(async valid => {
         if (valid) {
           try {
             this.isLoading = true;
             const response = await api.post(config.region.update, this.editForm);
             this.editDialog = false;
             if (Number(response.data.code) === 200) {
               this.$message({ type: 'success', message: '修改成功' });
               this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
             this.isLoading = false;
           } catch (e) {
           }
         } else {
           return false;
         }
       });
     },
     // add region request
     addRegion () {
       this.$refs['addForm'].validate(async valid => {
         if (valid) {
           try {
             this.isLoading = true;
             const response = await api.post(config.region.add, this.addForm);
             this.addRegionDialog = false;
             if (Number(response.data.code) === 200) {
               this.$message({ type: 'success', message: '添加成功' });
               this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
             this.isLoading = false;
           } catch (e) {
           }
         } else {
           return false;
         }
       });
     },
     // search request
     onSearch () {
       this.searchResult = this.searchForm;
       this.currentPage = 1;
       this.fetchData({ limit: this.limit, offset: 0, ...this.searchForm });
     },
     async fetchData (payload) {
       try {
         const response = await api.post(config.region.list, payload);
         if (Number(response.data.code) === 200) {
           this.list = response.data.data.rows;
           this.size = response.data.data.total;
         } else {
           this.$message({ type: 'error', message: response.data.msg });
         }
       } catch (e) {
         return false;
       }
     },
     init () {
       this.fetchData({ limit: this.limit, offset: this.offset });
     }
   },
   async mounted () {
     this.init();
   }
 };
</script>

<style lang="scss">
 .region {
   transition: all 1s;
   margin: 30px 20px 20px 0;
   .region__search {
     margin: 30px;
     text-align: left;
     font-weight: bold;
     .el-input {
       max-width: 500px;
     }
     .el-button {
       float: right;
       width: 200px;
     }
   }
   .region__list {
     padding-left: 35px;
   }
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
       width: 100px;
     }
     .el-form {
       margin: 0 auto;
       font-weight: bold;
     }
   }
   .region__dialog-delete .el-dialog {
     text-align: center;
     .dialog-footer-row .el-button {
       width: 25%;
     }
   }
 }
 .region .el-input__inner {
   width: 250px;
 }
</style>
