<template>
  <div class="stream">
    <div class="stream__video-wrapper">
      <div class="camera-title">
        <el-select v-model="cameraMonitorUrl">
          <el-option
            v-for="item in cameraOption"
            :key="item.id"
            :label="item.equipmentName"
            :value="item.id">
          </el-option>
        </el-select>
      </div>
      <video
        id="camera-monitor"
        class="video-js vjs-default-skin"
        autoplay
        width="1280"
        height="720"
        data-setup="{}" >
        <source src="rtmp://172.16.19.150:1935/live/84a3e6dfbb07f149">
        <!-- <source src="http://172.16.19.150:9580/live/84a3e6dfbb07f149.flv"> -->
        <!-- <source src="rtsp://172.16.19.150:9554/live/84a3e6dfbb07f149"> -->
      </video>
    </div>

    <div class="stream__compare">
      <p class="compare-title">识别记录</p>
      <div class="stream__compare-list">
        <StreamCompare
          v-for="(item, index) in compareList"
          :key="index"
          :item="item"
          class="stream__compare-item">
        </StreamCompare>
      </div>
    </div>
    <div class="stream__capture">
      <p class="stream__capture-title">实时抓拍</p>
      <div class="stream__capture-list">
        <StreamCapture
          class="stream__capture-item"
          v-for="(item, index) in captureList"
          :item="item"
          :key="index">
        </StreamCapture>
      </div>
    </div>
  </div>
</template>

<script>
 import videojs from 'video.js';
 import 'video.js/dist/video-js.css';
 import Socket from '@/api/Socket';
 import config from '@/config';
 import api from '@/api';
 import StreamCapture from './StreamCapture';
 import StreamCompare from './StreamCompare';
 import { mapGetters } from 'vuex';
 export default {
   // Video Streaming Component
   name: 'Stream',
   data () {
     return {
       socket: null,
       player: null,
       miniScore: 73, // the minimum score to show in compareList
       captureList: [],
       compareList: [],
       cameraOption: [],
       cameraMonitorUrl: ''
     };
   },
   computed: {
     ...mapGetters([
       'socketConnected'
     ])
   },
   components: {
     StreamCapture,
     StreamCompare
   },
   methods: {
     // fetch camera list
     async fetchCameraList () {
       const response = await api.post(config.device.all, {});
       if (response.data.code === 0) {
         return response.data.data.rows;
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
     // subscribe /face/recognition
     initSocket (url) {
       this.socket = new Socket(url);
       this.socket.subscribe('/face/recognition', response => {
         const data = JSON.parse(response.body);
         this.captureList.unshift(data);
         this.compareList = this.captureList.filter(item => {
           return Number(item.confidence) > this.miniScore;
         });
       });
     },
     // init video player
     setupPlayer (url) {
       this.player = videojs('camera-monitor');
       videojs('camera-monitor').ready(function () {
         this.src(url);
         this.load();
         this.play();
       });
     },
     // dispose player when component destroyed
     destroyPlayer () {
       this.player = videojs('camera-monitor');
       videojs('camera-monitor').ready(function () {
         this.dispose();
       });
     },
     subscribeSocket () {
       if (this.socketConnected) {
         // socket connected
         this.initSocket(config.socketURL);
       } else {
         this.$store.subscribe((mutation, state) => {
           if (mutation.type === 'CONNECT_SOCKET') {
             this.initSocket(config.socketURL);
           }
         });
       }
     }
   },
   mounted () {
     this.subscribeSocket();
     this.cameraOption = this.fetchCameraList();
     this.setupPlayer('rtmp://172.16.19.150:1935/live/84a3e6dfbb07f149');
   },
   destroyed () {
     this.destroyPlayer();
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
     margin-bottom: 30px;
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
   .video-js {
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
     overflow: auto;
     .compare-title {
       height: 60px;
       line-height: 60px;
       border-bottom: 1px solid #dcdcdc;
       font-size: 18px;
       color: #333;
       text-indent: 20px;
       margin: 0;
       font-weight: bold;
     }
     .stream__compare-list {
       height: 580px;
       overflow-y: auto;
     }
   }
   .stream__capture {
     height: 250px;
     display: block;
     clear: both;
     background-color: #fff;
     border-radius: 10px;
     .stream__capture-title {
       height: 60px;
       line-height: 60px;
       border-bottom: 1px solid #dcdcdc;
       font-size: 20px;
       color: #333;
       text-indent: 20px;
       margin: 0;
       font-weight: bold;
     }
     .stream__capture-list {
       height: 250px;
       overflow: scroll;
       white-space: nowrap;
       .stream__capture-item {
         display: inline-block;
         box-sizing: border-box;
       }
     }
   }
 }
</style>
