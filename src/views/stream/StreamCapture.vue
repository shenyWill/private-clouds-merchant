<template>
  <div class="stream-capture">
    <img class="stream__image" :src="item.url + item.imageUrl1" alt="capture-image" :onerror="`src='${errorImage}'`"/>
    <div class="stream-capture__device">{{ item.equipmentName }}</div>
    <div class="stream-capture__content">
      <span class="stream-capture__type">{{ config.deviceType2String[item.equipmentType] }}</span>
      <span class="stream-capture__time">{{ item.recognitionTime.split(' ')[1]}}</span>
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
     return {
       errorImage: require('@/assets/image/timg.jpg')
     };
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
   margin: 20px 8px;
   font-size: 14px;
   width: 160px;
   height: 180px;
   text-align: center;
   .stream__image {
     margin: 0 auto;
     display: block;
     width: 128px;
     height: 128px;
     margin-bottom: 10px;
     border-radius: 10px;
   }
   .stream-capture__device {
     height: 20px;
     text-align: left;
     margin-left: 15px;
     margin-bottom: 8px;
   }
   .stream-capture__content {
     position: relative;
     font-size: 12px;
     .stream-capture__type {
       position: absolute;
       left: 15px;
       top: 0;
       overflow: hidden;
       line-height: 15px;
       text-overflow: ellipsis;
       white-space: nowrap;
     }
     .stream-capture__time {
       position: absolute;
       right: 15px;
       top: 0;
       line-height: 15px;
     }
   }
 }
</style>
