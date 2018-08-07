<template>
  <div class="device-cell">
    <div class="device-cell__info">
      <div class="device-cell__title">{{ device.title }}</div>
      <div class="device-cell__content">
        <span class="device-cell__tag">
          <el-tag type="warning">{{ device.type }}</el-tag>
        </span>
      </div>
      <div class="device-cell__status">
        <i class="el-icon-warning"></i>
        <span>状态： {{ device.status === true ? '启用' : '禁用' }}</span>
      </div>
      <div class="device-cell__area">
        <i class="el-icon-location"></i>
        <span>区域： {{ device.area }}</span>
      </div>
      <div class="device-cell__orga">组织：{{ device.organization }}</div>
    </div>
    <div class="device-cell__action">
      <i @click="showDialog('detailDialog')" class="device-cell__button el-icon-view"></i>
      <i @click="showDialog('editDialog')" class="device-cell__button el-icon-edit"></i>
      <i @click="showDialog('deleteDialog')" class="device-cell__button el-icon-delete"></i>
    </div>

    <el-dialog
      title="提示"
      width="20%"
      :visible.sync="deleteDialog">
      <span class="dialog__content">你确认要删除该设备吗？</span>
      <span slot="footer">
        <el-button @click="deleteDialog = false" type="primary">取消删除</el-button>
        <el-button @click="deleteDevice">确认删除</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="设备详情"
      class="device-cell__detail"
      width="30%"
      :visible.sync="detailDialog">
      <div class="dialog__content">
        <div class="dialog__content-item" v-for="(value, key) in detailData()" :key="key">
          <span class="dialog__content-key">{{ key }}:</span>
          <span class="dialog__content-value">{{ value }}</span>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
 export default {
   name: 'DeviceCell',
   data () {
     return {
       deleteDialog: false,
       detailDialog: false,
       editDialog: false
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
   methods: {
     showDialog (type) {
       this[type] = true;
     },
     deleteDevice () {
       this.deleteDialog = false;
       this.$emit('delete', this.device);
     },
     detailData () {
       return {
         '设备名称': this.device.title,
         '设备种类': this.device.type,
         '所属组织': this.device.organization,
         '所属区域': this.device.area,
         'IP地址': this.device.ip,
         '端口号': this.device.host,
         '设备状态': this.device.status ? '启用' : '禁用'
       };
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
   margin-top: 20px;
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
 .device-cell .device-cell__detail .el-dialog__body {
   margin: 0 auto;
   text-align: left;
   overflow: hidden;
 }
 .device-cell .device-cell__detail .dialog__content-item {
   position: relative;
   margin-left: 30px;
   margin-bottom: 20px;
 }
 .device-cell .device-cell__detail .dialog__content-value {
   position: absolute;
   font-weight: normal;
   left: 100px;
   right: 20px;
   overflow: hidden;
   text-overflow: ellipsis;
   white-space: nowrap;
 }
</style>
