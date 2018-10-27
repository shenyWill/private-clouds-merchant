<template>
  <div class="device-cell">
    <div class="device-cell__info">
      <div class="device-cell__title">
        {{ device.equipmentName }}
      </div>
      <span class="device-cell__tag">
        <el-tag type="warning">{{ config.deviceType2String[device.equipmentType] }}</el-tag>
      </span>
      <div class="device-cell__area">
        <i class="el-icon-location"></i>
        <span>{{ device.ipAddress ? 'IP: ' + device.ipAddress : (device.url ? 'URL:' + device.url : 'SN码:' + device.serialNo) }}</span>
      </div>
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
           '品牌名称': this.device.brand,
           '型号系列': this.device.brandseries,
           '播放地址': this.device.mediaUrl,
           'IP地址': this.device.ipAddress,
           '端口号': this.device.port
         };
       } else {
         return {
           '设备名称': this.device.equipmentName,
           '设备种类': config.deviceType2String[this.device.equipmentType],
           '所属组织': this.device.groupName,
           '所属区域': this.device.areaName,
           '品牌名称': this.device.brand,
           '型号系列': this.device.brandseries,
           '播放地址': this.device.mediaUrl,
           '设备URL': this.device.url
         };
       }
     }
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
   &:last-child {
     border-bottom: 0;
   }
   overflow: hidden;
   .device-cell__info {
     min-width: 300px;
     margin-top: 35px;
     text-align: left;
     .device-cell__tag .el-tag {
       color: #f39800;
       border-color: #f39800;
       background-color: #fbe0b2;
     }
     .device-cell__title {
       font-size: 18px;
       font-weight: bold;
     }
     .device-cell__area {
       position: absolute;
       top: 50px;
       left: 400px;
       font-size: 16px;
       overflow: hidden;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
   }
   .device-cell__action {
     position: absolute;
     top: 50px;
     right: 50px;
     .device-cell__button {
       font-size: 30px;
       font-weight: bold;
       margin-left: 30px;
       color: #008aff;
       &:hover {
         cursor: pointer;
       }
     }
   }
   .el-dialog {
     border-radius: 20px;
     .el-dialog__header {
       font-weight: bold;
       border-bottom: 1px solid lightgray;
     }
     .el-dialog__body {
       margin: 0 auto;
       font-weight: bold;
       text-align: center;
     }
     .el-dialog__footer {
       text-align: center;
     }
   }
 }
</style>
