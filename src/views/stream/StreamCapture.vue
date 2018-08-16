<template>
  <div class="stream-capture">
    <img class="stream__image" :src="item.imageUrl1" alt="capture-image" />
    <div class="stream-capture__device">{{ item.equipmentName }}</div>
    <div class="stream-capture__content">
      <span class="stream-capture__type">{{ config.deviceType2String[item.equipmentType] }}</span>
      <span class="stream-capture__time">{{ item.createTime.split(' ')[1] }}</span>
    </div>
  </div>
</template>

<script>
 import config from '@/config';
 export default {
   // Streaming Capture Component
   name: 'StreamCapture',
   props: {
     item: {
       type: Object,
       default: () => {
         return {};
       }
     }
   },
   data () {
     return {};
   },
   computed: {
     config: () => {
       return config;
     }
   },
   methods: {
   }
 };
</script>

<style lang="scss">
 .stream-capture {
   margin: 20px;
   font-size: 14px;
   width: 160px;
   height: 250px;
   text-align: center;
   .stream__image {
     margin: 0 auto;
     display: block;
     width: 128px;
     height: 128px;
   }
   .stream-capture__content {
     text-align: center;
     font-size: 12px;
   }
 }
</style>
