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
        <i class="iconfont icon-zhankaiquanping-lan stream__fullscreen" @click="toggleFullscreen"></i>
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
          @showRecognitionDetail="showRecognitionDetail"
          @showPersonDetail="showPersonDetail"
          class="stream__compare-item">
        </StreamCompare>
      </div>
      <div v-else class="stream__empty">
        <img :src="emptyImage">
        <div>
          暂无识别比对记录
        </div>
      </div>
    </div>
    <div class="stream__capture">
      <p class="stream__capture-title">实时抓拍</p>
      <div class="stream__capture-list" v-if="captureList.length > 0">
        <StreamCapture
          class="stream__capture-item"
          v-for="(item, index) in captureList"
          :item="item"
          :key="index"
          >
        </StreamCapture>
      </div>
      <div v-else class="stream__empty">
        暂无抓拍记录
      </div>
    </div>

    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>

    <!-- 比对详情 -->
    <el-dialog
      :visible.sync="dialogRecognitionDetail"
      width="31%"
      class="stream__dialog-detail"
      custom-class="recognition-detail-show"
      title="比对详情"
      :lock-scroll="true">
      <RecognitionDetail :recognitionDetail="recognitionDetail" :recognitionDetailUrl="recognitionDetailUrl"></RecognitionDetail>
    </el-dialog>
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
 import PersonDetail from '@/views/person/PersonDetail';
 import RecognitionDetail from '@/views/recognition/RecognitionDetail';
 import { mapGetters, mapActions } from 'vuex';
 export default {
   // Video Streaming Component
   name: 'Stream',
   data () {
     return {
       emptyImage: require('@/assets/image/empty.png'),
       socket: null,
       player: null,
       playerConfig: {
         techOrder: ['flash', 'html5'],
         aspectRatio: '16:9',
         flash: {
           swf: require('@/assets/VideoJS.swf')
         }
       },
       miniScore: config.score.compare, // the minimum score to show in compareList
       captureList: [], // capture data list
       compareList: [], // compare data list
       isSubscribed: false,
       cameraOption: [],
       cameraMonitorUrl: '',
       personDetail: {}, // 个人详情
       dialogPersonDetail: false, // 详情框是否显示
       recognitionDetailTag: true, // 滚动的tag
       recognitionDetailId: '', // 当前对比详情ID
       recognitionOffset: 0, // 当前对比详情偏移量
       recognitionUrl: '', // 当前url
       recognitionDetailUrl: '', // 比对详情url
       recognitionDetail: {}, // 比对详情
       dialogRecognitionDetail: false
     };
   },
   computed: {
     ...mapGetters([
       'socketConnected',
       'selectedStreaming'
     ]),
     config: () => {
       return config;
     }
   },
   components: {
     StreamCapture,
     StreamCompare,
     PersonDetail,
     RecognitionDetail
   },
   methods: {
     ...mapActions([
       'setSelectedStreaming'
     ]),
     // el-select switch video streaming url
     async switchCamera (newVal) {
       this.setSelectedStreaming(newVal);
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
     async fetchNewestCaptureData () {
       const response = await api.post(config.recognition.list, {limit: 9, timeType: '1'});
       if (response.data.code === 0) {
         const data = response.data.data.rows;
         const url = response.data.url;
         data.forEach(item => {
           item.url = url;
           this.captureList.push(item);
         });
       }
     },
     async fetchNewestCompareData () {
       const response = await api.post(config.recognition.list, {
         limit: 4,
         timeType: '1',
         confidence: this.miniScore});
       if (response.data.code === 0) {
         const data = response.data.data.rows;
         const url = response.data.url;
         data.forEach(item => {
           item.url = url;
           this.compareList.push(item);
         });
       }
     },
     // subscribe /face/recognition
     initSocket (url) {
       this.socket = new Socket(url);
       this.socket.subscribe('/face/recognition', response => {
         const data = JSON.parse(response.body);
         this.captureList.unshift(data);
         if (data.timeType === '1' && Number(data.confidence) > this.miniScore) this.compareList.unshift(data);
         if (this.captureList.length > 9) {
           this.captureList.pop();
         }
         if (this.compareList.length > 4) {
           this.compareList.pop();
         }
       });
       this.isSubscribed = true;
     },
     // init video player
     initPlayer (config) {
       videojs.options.flash.swf = require('@/assets/VideoJS.swf');
       this.player = videojs('player', config);
       this.player.on('dblclick', () => {
         if (this.player.isFullscreen()) {
           this.player.exitFullscreen();
         } else {
           this.player.requestFullscreen();
         }
       });
     },
     // change video player src
     changePlayerSrc (url) {
       if (!this.player) return;
       this.player.pause();
       this.player.reset();
       this.player.src(url);
       this.player.load();
       this.playPlayer();
     },
     toggleFullscreen () {
       this.player.requestFullscreen();
     },
     // play video player
     playPlayer () {
       this.player.play();
       if (!this.isSubscribed) {
         this.subscribeSocket();
       }
     },
     // dispose player when component destroyed
     destroyPlayer () {
       if (!this.player) return;
       this.player.dispose();
       this.player = null;
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
     },
     async showPersonDetail (id) {
       const response = await api.post(config.person.detail, {personnelId: id});
       if (Number(response.data.code) === 0) {
         this.personDetail = response.data.data;
         this.dialogPersonDetail = true;
       }
     },
     // 查看比对详情
    async showRecognitionDetail (personnelId, tag) {
      if (tag) {
        this.recognitionOffset = 0;
        this.recognitionDetail = {};
        this.recognitionDetailId = personnelId;
      }
      const response = await api.post(config.recognition.compareDetail, {personnelId: this.recognitionDetailId, offset: this.recognitionOffset});
      if (Number(response.data.code) === 0) {
        let responseObj = response.data.data;
        for (let item in responseObj) {
          // TODO
          if (item.length > 1) {
            if (Object.keys(this.recognitionDetail).indexOf(item) > -1) {
              this.recognitionDetail[item] = this.recognitionDetail[item].concat(responseObj[item]);
            } else {
              this.$set(this.recognitionDetail, item, responseObj[item]);
            }
          }
        }
        this.recognitionDetailUrl = response.data.url;
        this.recognitionOffset = response.data.offset;
        this.dialogRecognitionDetail = true;
        setTimeout(() => {
          this.recognitionDetailTag = true;
        }, 300);
      }
    },
     // 滚动条再次调用
     detailScroll () {
       document.getElementsByClassName('recognition-detail-show')[0].onscroll = () => {
         let _self = document.getElementsByClassName('recognition-detail-show')[0];
         let distance = _self.scrollHeight - _self.scrollTop - _self.clientHeight;
         if (distance < 100 && this.recognitionDetailTag === true) {
           this.recognitionDetailTag = false;
           this.showRecognitionDetail(this.recognitionDetailId);
         }
       };
     }
   },
   async mounted () {
     this.initPlayer({ techOrder: ['flash', 'html5'] });
     this.cameraOption = await this.fetchCameraList();
     this.fetchNewestCaptureData();
     this.fetchNewestCompareData();
     if (this.selectedStreaming && this.selectedStreaming !== '') {
       this.cameraMonitorUrl = this.selectedStreaming;
     } else if (this.cameraOption && this.cameraOption.length > 0) {
       this.cameraMonitorUrl = this.cameraOption[0].id;
     }
     this.switchCamera(this.cameraMonitorUrl);
     this.detailScroll();
   },
   beforeRouteLeave (to, from, next) {
     this.isSubscribed = false;
     next();
   },
   beforeRouteUpdate (to, from, next) {
     next();
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
     margin-bottom: 15px;
     width: 1035px;
     border-radius: 10px;
     background-color: #fff;
     overflow: hidden;
     float: left;
     .stream__fullscreen {
       float: right;
       margin-top: 15px;
       font-size: 20px;
       &:hover {
         cursor: pointer;
       }
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
     position: absolute;
     right: 0;
     left: 1050px;
     min-width: 500px;
     height: 641px;
     background-color: #fff;
     border-radius: 10px;
     overflow: hidden;
     .compare-title {
       height: 60px;
       line-height: 60px;
       font-size: 18px;
       color: #333;
       text-indent: 20px;
       margin: 0;
       font-weight: bold;
     }
     .stream__compare-list {
       height: 580px;
       overflow-y: hidden;
     }
   }
   .stream__capture {
     height: 280px;
     display: block;
     clear: both;
     background-color: #fff;
     border-radius: 10px;
     overflow: hidden;
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
       overflow: hidden;
       white-space: nowrap;
       .stream__capture-item {
         display: inline-block;
         box-sizing: border-box;
       }
     }
   }
   .stream__empty {
     margin-top: 50px;
     text-align: center;
     font-weight: bold;
     font-size: 24px;
   }
 }
 .stream__dialog-detail {
   .el-dialog {
     position: relative;
     .el-dialog__header {
       position: sticky;
       top: 0;
       height: 30px;
       background-color: #fff;
       border-radius: 20px;
       z-index: 1;
     }
     .el-dialog__title {
       font-size: 20px;
       font-weight: bold;
     }
     .el-dialog__close {
       font-size: 32px;
     }
   }
 }

 .recognition-detail-show {
   position: relative;
   text-align: left;
   border-radius: 15px;
   height: 700px;
   overflow-y: auto;
   .el-dialog {
     border-radius: 20px;
   }
 }
 .recognition-dialog-detail {
   .el-dialog {
     position: relative;
     .el-dialog__header {
       position: sticky;
       top: 0;
       height: 30px;
       background-color: #fff;
       border-radius: 20px;
       z-index: 1;
     }
     .el-dialog__title {
       font-size: 20px;
       font-weight: bold;
     }
     .el-dialog__close {
       font-size: 32px;
     }
   }
 }
 .recognition .el-dialog__wrapper {
   overflow: hidden;
 }
 .recognition__empty {
   font-size: 20px;
   font-weight: bold;
   margin-top: 180px;
   margin-bottom: 40px;
 }

</style>
