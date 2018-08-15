<template>
  <div class="region-cell" @click="viewRegion" @mouseover.capture="showActionPane" @mouseout.capture="hideActionPane">
    <img class="region-cell__cover" :src="cover" alt="cover" />
    <div class="region-cell__info">
      <div class="region-cell__title">{{ region.areaName }}</div>
      <div class="region-cell__orga">{{ region.groupName }}</div>
    </div>
    <div class="region-cell__action" v-if="showAction" @mouseover="showActionPane">
      <i @click.stop="viewRegion" class="el-icon-view region-cell__action-icon"></i>
      <i @click.stop="addDevice" class="el-icon-plus region-cell__action-icon"></i>
      <i @click.stop="editRegion" class="el-icon-edit region-cell__action-icon"></i>
      <i @click.stop="deleteRegion" class="el-icon-delete region-cell__action-icon"></i>
    </div>
  </div>
</template>

<script>
 export default {
   name: 'RegionCell',
   props: {
     region: {
       type: Object,
       default: () => {
         return {};
       }
     }
   },
   data () {
     return {
       showAction: false,
       cover: require('@/assets/image/avatar.png')
     };
   },
   methods: {
     showActionPane () {
       this.showAction = true;
     },
     hideActionPane () {
       this.showAction = false;
     },
     viewRegion () {
       this.$emit('view', this.region);
     },
     addDevice () {
       this.$emit('device', this.region);
     },
     editRegion () {
       this.$emit('edit', this.region);
     },
     deleteRegion () {
       this.$emit('delete', this.region);
     }
   }
 };
</script>

<style lang="scss">
 .region-cell {
   position: relative;
   height: 120px;
   width: 100%;
   text-align: left;
   border-radius: 20px;
   border: 1px solid lightgray;
   overflow: hidden;
   background-color: white;
   &:hover {
     cursor: pointer;
   }
   .region-cell__cover {
     margin: 20px;
     width: 80px;
     height: 80px;
     border-radius: 10px;
   }
   .region-cell__info {
     position: absolute;
     left: 150px;
     top: 20px;
     .region-cell__title {
       margin-top: 10px;
       font-size: 20px;
       font-weight: bold;
     }
     .region-cell__orga {
       margin-top: 10px;
       font-size: 16px;
     }
   }
   .region-cell__action {
     position: absolute;
     height: 100%;
     top: 0;
     right: 0;
     .region-cell__action-icon {
       margin: 50px 30px 50px 0;
       &:hover {
         cursor: pointer;
       }
     }
   }
 }
</style>
