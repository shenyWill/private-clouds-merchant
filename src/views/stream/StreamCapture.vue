<template>
  <div class="stream-capture">
    <div class="stream-compare-image">
      <img :src="item.url + item.imageUrl1" alt="">
      <div class="img-bg"></div>
    </div>
    <p class="stream-equipmentName">{{item.equipmentName}} | {{item.sex == 0 ? '女' : '男'}}</p>
    <p class="stream-info">
      <span class="info-equipment">{{ config.deviceType2String[item.equipmentType] }}</span>
      <span class="info-time">{{ item.recognitionTime.split(' ')[1]}}</span>
    </p>
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
   margin: 20px 22px;
   font-size: 14px;
   width: 132px;
   height: 180px;
   color: #00ffff;
   p {
     margin: 2px 0;
   }
   .stream-compare-image {
     width: 130px;
     height: 130px;
     position: relative;
     overflow: hidden;
     margin-right: 15px;
     img {
       width: 130px;
       height: 130px;
     }
   }
   .img-bg {
     position: absolute;
     top: 0;
     left: 0;
     width: 130px;
     height: 130px;
     background-image: url(../../assets/image/img-bg.png);
     background-size: 100% 100%;
   }
   .info-time {
     float: right;
   }
   .info-equipment {
     float: left;
   }
   .stream-info {
    //  overflow: hidden;
     line-height: 25px;
     height: 25px;
     clear: both;
   }
 }
</style>
