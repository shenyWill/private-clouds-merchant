<template>
  <div class="device">
    <div class="device__list">
      <div class="device__list-header">
        查看设备
        <el-button @click="showAddDialog" type="primary" circle class="device__button-add" icon="el-icon-plus"></el-button>
      </div>
      <DeviceCell
        v-for="(device, index) in list"
        @delete="deleteDevice"
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

    <el-dialog title="添加设备" :visible.sync="addDialog" width="30%">
      <span slot="footer" class="dialog-footer"></span>
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
       list: null,
       size: 0,
       currentPage: 1,
       addDialog: false
     };
   },
   methods: {
     showAddDialog () {
       this.addDialog = true;
     },
     handleCurrentChange (val) {
       this.currentPage = val;
       this.fetchData({ page: val });
     },
     async fetchData (payload) {
       const response = await api.get(config.device.list, payload);
       if (response.data.resCode === '200') {
         this.list = response.data.data;
         this.size = response.data.size;
       } else {
         this.$message({ type: 'error', message: response.data.resMsg });
       }
     },
     showDetail () {
     },
     updateDevice () {
     },
     async deleteDevice (data) {
       const id = data.id;
       const response = await api.post(config.device.delete, {id});
       if (response.data.resCode === '200') {
         this.$message({ type: 'success', message: response.data.resMsg });
         this.fetchData({ page: this.currentPage });
       } else {
         this.$message({ type: 'error', message: response.data.resMsg });
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
   margin: 50px;
 }
 .device__list {
   margin-bottom: 20px;
   border: 1px solid lightgray;
   border-radius: 10px;
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
 .device__button-add {
   position: absolute;
   right: 20px;
   bottom: 5px;
 }
</style>
