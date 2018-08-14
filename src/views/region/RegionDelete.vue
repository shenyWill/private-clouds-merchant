<template>
  <div class="region__delete-dialog">
    <!-- Delete No Device Region Dialog -->
    <el-dialog
      class="region__dialog region__dialog-delete"
      title="提示"
      :visible.sync="deviceDialog"
      width="25%">
      <span>你确定要删除该区域吗？</span>
      <span slot="footer" class="dialog-footer-row">
        <el-button type="primary" @click="deviceDialog = false;">取消删除</el-button>
        <el-button @click="deleteRegion">确定删除</el-button>
      </span>
    </el-dialog>

    <!-- Delete Region With Devices Dialog -->
    <el-dialog
      class="region__dialog region__dialog-delete"
      title="提示"
      :visible.sync="noDeviceDialog"
      width="25%">
      <span>请删除区域中的设备，否则无法删除该区域</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="noDeviceDialog = false;">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
 export default {
   name: 'RegionDelete',
   data () {
     return {
       deviceDialog: false,
       noDeviceDialog: false
     };
   },
   props: {
     hasDevice: {
       type: Boolean,
       default: () => {
         return false;
       }
     }
   }
 };
</script>

<style>
</style>
