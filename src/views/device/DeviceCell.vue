<template>
  <div class="device-cell">
    <div class="device-cell__info">
      <div class="device-cell__title">
        {{ device.equipmentName }}
        <span class="device-cell__tag">
          <el-tag type="warning">{{ config.deviceType2String[device.equipmentType] }}</el-tag>
        </span>
      </div>
      <div class="device-cell__status">
        <i class="el-icon-warning"></i>
        <span>状态： {{ device.status === true ? '启用' : '禁用' }}</span>
      </div>
      <div class="device-cell__area">
        <i class="el-icon-location"></i>
        <span>区域： {{ device.areaName }}</span>
      </div>
      <div class="device-cell__orga">组织：{{ device.groupName }}</div>
    </div>
    <div class="device-cell__action">
      <i @click="showDeviceDetail" class="device-cell__button el-icon-view"></i>
      <i @click="editDevice" class="device-cell__button el-icon-edit"></i>
      <i @click="deleteDevice" class="device-cell__button el-icon-delete"></i>
    </div>
  </div>
</template>

<script>
 import config from '@/config';
 export default {
   name: 'DeviceCell',
   data () {
     return {
     };
   },
   props: {
     device: {
       type: Object,
       default: () => {
         return {};
       }
     }
   },
   computed: {
     config: () => {
       return config;
     }
   },
   methods: {
     deleteDevice () {
       this.$emit('delete', this.device);
     },
     showDeviceDetail () {
       this.$emit('detail', this.detailData());
     },
     editDevice () {
       this.$emit('edit', this.device);
     },
     detailData () {
       if (this.device.ipAddress) {
         return {
           '设备名称': this.device.equipmentName,
           '设备种类': config.deviceType2String[this.device.equipmentType],
           '所属组织': this.device.groupName,
           '所属区域': this.device.areaName,
           'IP地址': this.device.ipAddress,
           '端口号': this.device.port,
           '设备状态': this.device.status ? '启用' : '禁用'
         };
       } else {
         return {
           '设备名称': this.device.equipmentName,
           '设备种类': config.deviceType2String[this.device.equipmentType],
           '所属组织': this.device.groupName,
           '所属区域': this.device.areaName,
           '设备URL': this.device.url,
           '设备状态': this.device.status ? '启用' : '禁用'
         };
       }
     }
   },
   mounted () {
   }
 };
</script>

<style lang="scss">
 .device-cell {
   position: relative;
   margin-left: 50px;
   height: 120px;
   text-align: left;
   border-bottom: 1px solid lightgray;
   overflow: hidden;
 }
 .device-cell__info {
   min-width: 300px;
   margin-top: 35px;
   text-align: left;
 }
 .device-cell__title {
   font-size: 18px;
   font-weight: bold;
 }
 .device-cell__content {
   position: relative;
   display: inline-block;
   width: 100%;
 }
 .device-cell__status {
   position: absolute;
   top: 50px;
   left: 400px;
   font-size: 16px;
 }
 .device-cell__area {
   position: absolute;
   top: 50px;
   left: 600px;
   font-size: 16px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
 .device-cell__orga {
   font-size: 16px;
 }
 .device-cell__action {
   position: absolute;
   top: 50px;
   right: 50px;
 }
 .device-cell__button {
   font-size: 30px;
   font-weight: bold;
   margin-left: 30px;
   color: #008aff;
   &:hover {
     cursor: pointer;
   }
 }
 .device-cell .el-dialog {
   border-radius: 20px;
 }
 .device-cell .el-dialog__header {
   font-weight: bold;
   border-bottom: 1px solid lightgray;
 }
 .device-cell .el-dialog__body {
   margin: 0 auto;
   font-weight: bold;
   text-align: center;
 }
 .device-cell .el-dialog__footer {
   text-align: center;
 }
</style>
