<template>
  <div class="stream">
    <div class="stream__video-wrapper">
      <div class="camera-title">
        <el-select v-model="cameraMonitorUrl">
          <el-option v-for="item in cameraOption" :key="item.id" :label="item.cameraName" :value="item.cameraId"></el-option>
        </el-select>
      </div>
      <video id="camera-monitor" class="video-js vjs-default-skin" autoplay width="1280" height="720" data-setup="{}" >
        <!-- <source src="rtmp://172.16.19.150:1935/live/84a3e6dfbb07f149"> -->
        <source src="http://172.16.19.150:9580/live/84a3e6dfbb07f149.flv">
        <!-- <source src="rtsp://172.16.19.150:9554/live/84a3e6dfbb07f149"> -->
      </video>
    </div>
    <!-- <div class="stream__capture"></div> -->
    <div class="stream__compare">
      <p class="compare-title">识别记录</p>
    </div>
  </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
 export default {
   // Video Streaming Component
   name: 'Stream',
   data () {
     return {
       player: null,
       cameraOption: [{cameraName: '设备一', cameraId: '1'}, {cameraName: '设备二', cameraId: '2'}],
       cameraMonitorUrl: ''
     };
   },
   methods: {
   },
   mounted () {
     let player = videojs('camera-monitor');
     videojs('camera-monitor').ready(function () {
      player.src('http://172.16.19.150:9580/live/84a3e6dfbb07f149.flv');
      player.load();
      player.play();
     });
   },
   destroyed () {
     let player = videojs('camera-monitor');
     videojs('camera-monitor').ready(function () {
      player.dispose();
     });
   }
 };
</script>

<style lang="scss">
 .stream {
   position: relative;
   margin: 30px;
   text-align: left;
   overflow: hidden;
   .stream__video-wrapper {
     width: 1035px;
     border-radius: 5px;
     background-color: #fff;
     overflow: hidden;
     float: left;
   }
   .camera-title {
     width: 100%;
     height: 60px;
     box-sizing: border-box;
     padding: 5px 20px;
   }
  .video-js{
    width: 1035px;
    height: 581px;
    object-fit:fill;
  }
  .stream__compare {
    float: left;
    width: 500px;
    height: 641px;
    background-color: #fff;
    margin-left: 25px;
    border-radius: 10px;
  }
  .compare-title{
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid #dcdcdc;
    font-size: 18px;
    color: #333;
    text-indent: 20px;
    margin: 0;
    font-weight: bold;
  }
 }
</style>
