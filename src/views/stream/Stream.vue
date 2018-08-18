 <template>
  <div class="stream">
    <div class="stream__video-wrapper">
      <div class="camera-title">
        <el-select
          @change="switchCamera"
          v-model="cameraMonitorUrl">
          <el-option
            v-for="item in cameraOption"
            :key="item.id"
            :label="item.equipmentName"
            :value="item.id">
          </el-option>
        </el-select>
        <el-button @click="toggleFullscreen" type="primary" class="stream__fullscreen">全屏</el-button>
      </div>
      <video
        id="player"
        class="video-js vjs-default-skin vjs-fluid"
        preload
        autoplay
        width="1280"
        height="720"
        data-setup="{}">
      </video>
    </div>

    <div class="stream__compare">
      <p class="compare-title">识别记录</p>
      <div class="stream__compare-list" v-if="compareList.length > 0">
        <StreamCompare
          v-for="(item, index) in compareList"
          :key="index"
          :item="item"
          class="stream__compare-item">
        </StreamCompare>
      </div>
      <div v-else class="stream__empty">
        暂无识别比对记录
      </div>
    </div>
    <div class="stream__capture">
      <p class="stream__capture-title">实时抓拍</p>
      <div class="stream__capture-list" v-if="captureList.length > 0">
        <StreamCapture
          class="stream__capture-item"
          v-for="(item, index) in captureList"
          :item="item"
          :key="index">
        </StreamCapture>
      </div>
      <div v-else class="stream__empty">
        暂无抓拍记录
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
       playerConfig: {
         techOrder: ['flash', 'html5'],
         aspectRatio: '16:9',
         flash: {
           swf: require('@/assets/VideoJS.swf')
         }
       },
       miniScore: 73, // the minimum score to show in compareList
       captureList: [], // capture data list
       compareList: [], // compare data list
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
     // el-select switch video streaming url
     async switchCamera (newVal) {
       const response = await api.post(config.stream.streamingURL, {id: newVal});
       if (response.data.code === 0) {
         const data = JSON.parse(response.data.data);
         this.changePlayerSrc(data.rtmp);
       } else {
         this.$message({ type: 'error', message: response.data.msg });
       }
     },
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
         if (Number(data.confidence) > this.miniScore) this.compareList.unshift(data);
       });
     },
     // init video player
     initPlayer (config) {
       videojs.options.flash.swf = require('@/assets/VideoJS.swf');
       this.player = videojs('player', config);
     },
     // change video player src
     changePlayerSrc (url) {
       this.player.src(url);
       this.playPlayer();
     },
     toggleFullscreen () {
       this.player.requestFullscreen();
     },
     // play video player
     playPlayer () {
       this.player.play();
       this.subscribeSocket();
     },
     // dispose player when component destroyed
     destroyPlayer () {
       if (!this.player) return;
       this.player.ready(() => {
         this.player.dispose();
         this.player = null;
       });
     },
     // store subscribe socket connect action
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
   async mounted () {
     this.initPlayer({ techOrder: ['flash', 'html5'] });
     this.cameraOption = await this.fetchCameraList();
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
     .stream__fullscreen {
       float: right;
     }
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
     height: 280px;
     display: block;
     clear: both;
     background-color: #fff;
     border-radius: 10px;
     overflow-x: auto;
     overflow-y: hidden;
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
       height: 220px;
       overflow-x: auto;
       overflow-y: hidden;
       white-space: nowrap;
       .stream__capture-item {
         display: inline-block;
         box-sizing: border-box;
       }
     }
   }
   .stream__empty {
     padding-top: 50px;
     text-align: center;
     font-weight: bold;
     font-size: 24px;
   }
 }
</style>
