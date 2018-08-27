<template>
  <div class="device">
    <Search :searchResult="searchResult">
      <el-form
        class="device__search"
        slot="search-form"
        ref="searchForm"
        :model="searchForm">
        <el-row>
          <el-col :span="12">
            <el-form-item label="设备名称" prop="equipmentName">
              <el-input class="device__search-input" v-model="searchForm.equipmentName" placeholder="请填写设备名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="设备类型" prop="equipmentType">
              <el-select v-model="searchForm.equipmentType" placeholder="请选择">
                <el-option
                  v-for="item in config.deviceType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="设备IP/URL">
          <el-select @change="changeAddressSearchType" v-model="addressSearchType" placeholder="请选择">
            <el-option
              v-for="item in addressType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-input class="device__search-input" v-if="addressSearchType === 'ip'" v-model="searchForm.ipAddress" placeholder="请填写设备IP地址"></el-input>
          <el-input class="device__search-input" v-if="addressSearchType === 'url'" v-model="searchForm.url" placeholder="请填写设备URL地址"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch">搜索</el-button>
        </el-form-item>
      </el-form>
    </Search>
    <div class="device__list">
      <div
        @mouseover="toggleAddButton()"
        @mouseout="toggleAddButton()"
        :class="['device__button-hover', showAddButton ? addButtonStyle : '']">
        <el-button
          @click="showDialog('addDialog', 'addForm')"
          circle>
          <i class="el-icon-arrow-left" v-if="!showAddButton"></i>
          添加<br/>设备
          <i class="el-icon-arrow-right" v-if="showAddButton"></i>
        </el-button>
      </div>
      <div v-if="list && list.length > 0">
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
      <div v-else class="device__empty">
        <img :src="emptyImage">
        <div>
          暂无数据
        </div>
      </div>
    </div>
    <el-pagination
      v-if="size > 10"
      background
      :current-page.sync="currentPage"
      @current-change="handleCurrentChange"
      layout="prev, pager, next"
      :total="size">
    </el-pagination>

    <!-- Add Device Dialog -->
    <el-dialog
      class="device__dialog-add"
      title="添加设备"
      :visible.sync="addDialog"
      :fullscreen="true"
      width="25%">
      <el-form
        ref="addForm"
        :model="addForm"
        :rules="addRules"
        label-width="100px"
        label-position="left"
        class="device__form-add">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="addForm.equipmentName" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备种类" prop="equipmentType">
          <el-select v-model="addForm.equipmentType" placeholder="请选择">
            <el-option
              v-for="item in config.deviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备账号" prop="loginName">
          <el-input v-model="addForm.loginName" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item label="设备密码" prop="loginPsw">
          <el-input v-model="addForm.loginPsw" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand">
          <el-input v-model="addForm.brand" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="型号系列" prop="brandseries">
          <el-input v-model="addForm.brandseries" placeholder="请输入设备型号系列"></el-input>
        </el-form-item>
        <el-form-item label="播放地址" prop="mediaUrl">
          <el-input v-model="addForm.mediaUrl" placeholder="请输入设备rtsp/rtmp地址"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="deviceAddress">
          <el-select v-model="addForm.deviceAddress" placeholder="请选择" @change="changeAddressAddType">
            <el-option v-for="item in addressType" :key="item.key" :value="item.value" :label="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL地址" prop="url" v-if="addForm.deviceAddress === 'url'">
          <el-input v-model="addForm.url" placeholder="请输入设备URL地址"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddress" v-if="addForm.deviceAddress === 'ip'">
          <el-input v-model="addForm.ipAddress" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" v-if="addForm.deviceAddress === 'ip'">
          <el-input v-model.number="addForm.port" placeholder="请输入设备端口号"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDevice">确定</el-button>
      </span>
    </el-dialog>

    <!--  Edit Device Dialog -->
    <el-dialog
      class="device__dialog-add"
      :visible.sync="editDialog"
      width="25%"
      :fullscreen="true"
      title="修改设备">
      <el-form
        ref="editForm"
        :model="editForm"
        label-width="100px"
        label-position="right"
        :rules="editRules"
        class="device__form-add">
        <el-form-item label="设备名称" prop="equipmentName">
          <el-input v-model="editForm.equipmentName" placeholder="请填写设备名称"></el-input>
        </el-form-item>
        <el-form-item label="设备种类" prop="equipmentType">
          <el-select v-model="editForm.equipmentType" placeholder="请选择">
            <el-option
              v-for="item in config.deviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属区域" prop="areaId">
          <el-select v-model="editForm.areaId" placeholder="请选择所属区域">
            <el-option v-for="item in areaList" :key="item.id" :value="item.id" :label="item.areaName"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="设备账号" prop="loginName">
          <el-input v-model="editForm.loginName" placeholder="请填写设备账号"></el-input>
        </el-form-item>
        <el-form-item label="设备密码" prop="loginPsw">
          <el-input v-model="editForm.loginPsw" placeholder="请填写设备密码" type="password"></el-input>
        </el-form-item>
        <el-form-item label="品牌名称" prop="brand">
          <el-input v-model="editForm.brand" placeholder="请输入设备类型"></el-input>
        </el-form-item>
        <el-form-item label="型号系列" prop="brandseries">
          <el-input v-model="editForm.brandseries" placeholder="请输入设备型号系列"></el-input>
        </el-form-item>
        <el-form-item label="播放地址" prop="mediaUrl">
          <el-input v-model="editForm.mediaUrl" placeholder="请输入设备rtsp/rtmp地址"></el-input>
        </el-form-item>
        <el-form-item label="设备地址" prop="deviceAddress">
          <el-select v-model="editForm.deviceAddress" placeholder="请选择" @change="changeAddressEditType">
            <el-option v-for="item in addressType" :key="item.key" :value="item.value" :label="item.key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="URL地址" prop="url" v-if="editForm.deviceAddress === 'url'">
          <el-input v-model="editForm.url" placeholder="请输入设备URL地址"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ipAddress" v-if="editForm.deviceAddress === 'ip'">
          <el-input v-model="editForm.ipAddress" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="端口号" prop="port" v-if="editForm.deviceAddress === 'ip'">
          <el-input v-model.number="editForm.port" placeholder="请填写设备端口号"></el-input>
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
          <span :title="value" class="dialog__content-value">{{ value }}</span>
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
 import { isValidIP } from '@/utils';
 import DeviceCell from './DeviceCell';
 import Search from '@/views/search/Search';
 import { mapGetters, mapActions } from 'vuex';

 export default {
   name: 'Device',
   components: {
     DeviceCell,
     Search
   },
   computed: {
     ...mapGetters([
       'selectedRegion'
     ]),
     config: () => {
       return config;
     }
   },
   data () {
     return {
       emptyImage: require('@/assets/image/empty.png'),
       regionID: '',
       list: null, // deivce list
       deviceDetail: null, // detail dialog info
       size: 0, // device list count
       limit: 10, // list count per page
       offset: 0, // list offset
       currentPage: 1, // device list page
       deviceAddress: '', // device ip or url address
       areaList: [],
       addressSearchType: 'ip',
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
       searchResult: {},
       searchForm: {},
       addForm: {
         areaId: this.regionID
       }, // add device form
       editForm: {
         areaId: this.regionID
       }, // edit device form
       addRules: {
         equipmentName: [
           { required: true, message: '请输入设备名称', trigger: 'blur' },
           { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
         ],
         equipmentType: [
           { required: true, message: '请选择设备种类', trigger: 'change' }
         ],
         brand: [
           { required: true, message: '请输入设备品牌名称', trigger: 'blur' }
         ],
         brandseries: [
           { required: true, message: '请输入设备型号系列', trigger: 'blur' }
         ],
         mediaUrl: [
           { required: true, message: '请输入设备rtsp或者rtmp地址', trigger: 'blur' },
           { validator: this.checkDeviceMediaURL, trigger: 'blur' }
         ],
         deviceAddress: [
           { required: true, message: '请选择', trigger: 'change' }
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
           { type: 'number', message: '端口号必须为数字' }
         ],
         loginName: [
           { required: true, message: '请填写登陆账号', trigger: 'blur' }
         ],
         loginPsw: [
           { required: true, message: '请填写登陆密码', trigger: 'blur' }
         ]
       },
       editRules: {
         equipmentName: [
           { required: true, message: '请输入设备名称', trigger: 'blur' },
           { min: 2, max: 10, message: '请输入2-10位字符', trigger: 'blur' }
         ],
         equipmentType: [
           { required: true, message: '请选择设备种类', trigger: 'change' }
         ],
         areaId: [
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
           { validator: this.checkDeviceMediaURL, trigger: 'blur' }
         ],
         deviceAddress: [
           { required: true, message: '请选择', trigger: 'change' }
         ],
         ipAddress: [
           { required: true, message: '请填写设备IP地址', trigger: 'blur' },
           { validator: this.checkEditDeviceIP, trigger: 'blur' }
         ],
         url: [
           { required: true, message: '请填写设备URL地址', trigger: 'blur' },
           { validator: this.checkEditDeviceURL, trigger: 'url' }
         ],
         port: [
           { required: true, message: '请填写端口号', trigger: 'blur' },
           { type: 'number', message: '端口号必须为数字' }
         ],
         loginName: [
           { required: true, message: '请填写登陆账号', trigger: 'blur' }
         ],
         loginPsw: [
           { required: true, message: '请填写登陆密码', trigger: 'blur' }
         ]
       },
       showAddButton: false,
       addButtonStyle: {
         'device__button-show': true
       }
     };
   },
   watch: {
     searchResult: {
       handler (newVal, oldVal) {
         this.searchForm = {...newVal};
         if (this.searchForm.equipmentType && this.searchForm.equipmentType !== '') {
           this.searchForm = {
             ...this.searchForm,
             equipmentType: config.deviceString2Num[this.searchForm.equipmentType]
           };
         }
         this.currentPage = 1;
         this.fetchData({ offset: 0, limit: this.limit, ...this.searchForm });
       },
       deep: true
     }
   },
   methods: {
     ...mapActions([
       'setSelectedRegion'
     ]),
     resetForm (name) {
       if (!name) return;
       if (!this.$refs[name]) return;
       this.$refs[name].resetFields();
     },
     showDialog (dialog, form) {
       this.resetForm(form);
       this[dialog] = true;
     },
     toggleAddButton () {
       this.showAddButton = !this.showAddButton;
     },
     checkDeviceMediaURL (rule, value, callback) {
       if (!value.startsWith('rtsp://') && !value.startsWith('rtmp://')) {
         callback(new Error('请输入设备正确rtsp或者rtmp地址'));
       } else {
         callback();
       }
     },
     // add form device ip rules
     checkAddDeviceIP (rule, value, callback) {
       if (this.addForm.deviceAddress === 'ip' && (!value || value === '')) {
         callback(new Error('请输入设备IP地址'));
       } else if (this.addForm.deviceAddress === 'ip' && !isValidIP(value)) {
         callback(new Error('请填写正确格式的IP地址'));
       } else {
         callback();
       }
     },
     // add form device url rules
     checkAddDeviceURL (rule, value, callback) {
       if (this.addForm.deviceAddress === 'url' && (!value || value === '')) {
         callback(new Error('请填写设备URL地址'));
       } else {
         callback();
       }
     },
     // edit form device ip rules
     checkEditDeviceIP (rule, value, callback) {
       if (this.editForm.deviceAddress === 'ip' && (!value || value === '')) {
         callback(new Error('请输入设备IP地址'));
       } else if (this.editForm.deviceAddress === 'ip' && !isValidIP(value)) {
         callback(new Error('请填写正确格式的IP地址'));
       } else {
         callback();
       }
     },
     // edit form device url rules
     checkEditDeviceURL (rule, value, callback) {
       if (this.editForm.deviceAddress === 'url' && (!value || value === '')) {
         callback(new Error('请填写设备URL地址'));
       } else {
         callback();
       }
     },
     showEditDialog (data) {
       this.showDialog('editDialog', 'editForm');
       this.editForm = {
         ...data,
         deviceAddress: data.ipAddress && data.ipAddress !== '' ? 'ip' : 'url'
       };
       this.deviceDetail = data;
     },
     showDeleteDialog (data) {
       this.deviceDetail = data;
       this.showDialog('deleteDialog');
     },
     showDetailDialog (data) {
       this.deviceDetail = data;
       this.showDialog('detailDialog', 'detailForm');
     },
     // page pagination change
     handleCurrentChange (val) {
       this.currentPage = val;
       this.offset = (val - 1) * this.limit;
       this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
     },
     // add device form el-select change event
     changeAddressAddType (val) {
       this.$refs['addForm'].clearValidate(['ipAddress', 'url', 'port']);
     },
     // edit device form el-select change event
     changeAddressEditType (val) {
       this.$refs['editForm'].clearValidate(['ipAddress', 'url', 'port']);
     },
     // search form el-select change event
     changeAddressSearchType (val) {
       if (val === 'ip') {
         this.searchForm = {
           ...this.searchForm,
           url: ''
         };
       } else {
         this.searchForm = {
           ...this.searchForm,
           ipAddress: ''
         };
       }
     },
     editDevice () {
       this.$refs['editForm'].validate(async valid => {
         if (valid) {
           try {
             if (this.editForm.deviceAddress === 'ip') {
               this.editForm.url = '';
             } else {
               this.editForm.ipAddress = '';
               this.editForm.port = '';
             }
             const response = await api.post(config.device.update, this.editForm);
             this.editDialog = false;
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '修改成功' });
               this.fetchData({ offset: this.offset, limt: this.limit, ...this.searchForm });
             } else {
               this.$message({ type: 'error', message: response.data.msg });
             }
           } catch (e) {
             return false;
           }
         } else {
           return false;
         }
       });
     },
     // add device form submit button clicked
     addDevice () {
       this.$refs['addForm'].validate(async valid => {
         const data = { ...this.addForm, areaId: this.regionID };
         if (valid) {
           try {
             const response = await api.post(config.device.add, data);
             this.addDialog = false;
             if (response.data.code === 0) {
               this.$message({ type: 'success', message: '添加成功' });
               this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
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
     // on search form submit
     onSearch () {
       this.searchResult = this.searchForm;
       if (this.searchResult.equipmentType && this.searchResult.equipmentType !== '') {
         this.searchResult.equipmentType = config.deviceType2String[this.searchForm.equipmentType];
       }
     },
     // submit delete device action
     async deleteDevice () {
       const id = this.deviceDetail.id;
       const response = await api.post(config.device.delete, {id});
       this.deleteDialog = false;
       if (response.data.code === 0) {
         this.$message({ type: 'success', message: response.data.msg });
         this.fetchData({ offset: this.offset, limit: this.limit, ...this.searchForm });
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     async fetchData (payload) {
       const response = await api.post(config.device.list, {areaId: this.regionID, ...payload});
       if (response.data.code === 0) {
         this.list = response.data.data.rows;
         this.size = response.data.data.total;
         this.areaList = response.data.arealist;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     checkCanAccess (id) {
       if (!id || id === '') {
         const view = {name: 'Device', path: '/device/index', title: '设备管理'};
         this.$store.dispatch('delVisitedViews', view).then(views => {
           // push router to region
           this.$router.push('/region/index');
         });
       }
     },
     async init () {
       // get selected region from route.params or store
       // push router to /region/index if no region id
       this.regionID = this.$route.params.id;
       if (!this.regionID || this.regionID === '') {
         this.regionID = this.selectedRegion;
       }
       this.setSelectedRegion(this.regionID);
       this.checkCanAccess(this.regionID);
       await this.fetchData({limit: this.limit, offset: this.offset});
     }
   },
   async mounted () {
     await this.init();
   }
 };
</script>

<style lang="scss">
 .device {
   transition: all 2s;
   .device__search {
     margin: 30px;
     text-align: left;
     font-weight: bold;

     .device__search-input {
       max-width: 500px;
     }
     .el-button {
       width: 200px;
       float: right;
     }
   }
   .device__list {
     position: relative;
     margin: 20px 35px 20px 35px;
     border: 1px solid lightgray;
     border-radius: 10px;
     background-color: white;
     .device__list-header {
       position: relative;
       padding: 10px;
       margin-left: 20px;
       text-align: left;
       font-size: 20px;
       font-weight: bold;
       border-bottom: 1px solid lightgray;
     }
     .device__button-hover {
       position: fixed;
       width: 70px;
       height: 70px;
       border-radius: 35px;
       right: -35px;
       bottom: 100px;
       z-index: 1;
       .el-button {
         width: 100%;
         height: 100%;
         padding: 0;
       }
     }
     .device__button-show {
       right: 0;
     }
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
     }
   }
   .el-dialog {
     border-radius: 20px;
     .el-dialog__header {
       font-weight: bold;
       text-align: left;
       border-bottom: 1px solid lightgray;
     }
     .el-dialog__body {
       margin: 0 auto;
       font-weight: bold;
       text-align: left;
       overflow: hidden;
     }
     .el-dialog__footer {
       padding-top: 0;
       padding-bottom: 50px;
       text-align: center;
     }
   }
   .device__form-add {
     font-weight: bold;
     margin: 0 auto;
     text-align: left;
     .el-select {
       width: 100%;
     }
   }
   .device__dialog-delete {
     .el-dialog__body {
       text-align: center;
     }
   }
   .device__dialog-add .el-dialog__footer .el-button {
     width: 50%;
   }
   .device__dialog-detail {
     .dialog__content-item {
       position: relative;
       margin-left: 30px;
       margin-bottom: 20px;
     }
     .dialog__content-value {
       position: absolute;
       font-weight: normal;
       left: 100px;
       right: 20px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
   }
   .device__empty {
     font-size: 20px;
     font-weight: bold;
     margin-top: 180px;
     margin-bottom: 40px;
   }
 }
</style>
