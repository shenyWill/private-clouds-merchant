<template>
    <div class="welcome">
        <div class="welcome-show">
            <!-- 访问记录 -->
            <div class="welcome-right">
                <div class="welcome-record">
                    <div class="record-info" v-for="item in recordList" :key="item.id">
                        <img class="record-img" :src="item.url + item.imageUrl2" alt="">
                        <div class="record-detail">
                            <p class="record-detail-info">
                                <span class="record-detail-name">{{item.personnelName}} | {{item.sex == 0 ? '女' : '男'}}</span>
                                <!-- <span class="record-detail-age">{{item.age}}岁</span> -->
                            </p>
                            <p class="record-detail-describe">{{item.describe}}</p>
                            <p class="record-detail-rime">比对时间：{{ item.recognitionTime.split(' ')[1]}}</p>
                        </div>
                    </div>
                </div>
                <div class="welcome-video">
                    <video id="player" class="video-js vjs-default-skin vjs-fluid" preload autoplay width="1280" height="720" data-setup="{}"></video>
                </div>
            </div>

            <!-- 欢迎标语 -->
            <div class="welcome-left">
                <div class="welcome-snap">
                    <div :class="['welcome-snap-info', 'animated', snapAnimate ? 'zoomIn' : '']" v-for="item in snapList" :key="item.id">
                        <img class="welcome-snap-img" :src="item.url + item.imageUrl2" alt="">
                        <p class="welcome-snap-name">{{item.personnelName}}</p>
                        <p class="welcome-snap-describe">{{item.describe}}</p>
                    </div>
                </div>
                <div class="welcome-slogan" v-if="snapList.length">亲爱的贵宾，欢迎光临深圳华付！</div>
                <img class="welcome-sleep" :src="sleepImg" alt="" v-if="!snapList.length">
                <p class="welcome-sleep-title" v-if="!snapList.length">好无聊，快来和我玩吧~</p>
            </div>
        </div>
    </div>
</template>

<script>
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import '../../assets/css/animate.css';
import config from '@/config';
import Socket from '@/api/Socket';
export default {
  data () {
    return {
        recordList: [],
        snapList: [],
        clearSnapList: null,
        sleepImg: require('@/assets/image/welcome-sleep-bg.gif'),
        snapAnimate: true
    };
  },
  methods: {
    initPlayer (config) {
      videojs.options.flash.swf = require('@/assets/VideoJS.swf');
      this.player = videojs('player', config);
      this.player.src('rtmp://172.16.19.150:1935/live/25ec1f598bf4815b');
      this.player.load();
      this.player.play();
    },
    subscribeSocket () {
      if (this.socketConnected) {
        this.initSocket(config.socketURL);
      } else {
        this.$store.subscribe((mutation, state) => {
          if (mutation.type === 'CONNECT_SOCKET') {
            this.initSocket(config.socketURL);
          }
        });
      }
    },
    initSocket (url) {
       this.socket = Socket.init(url);
       this.socket.subscribe('/face/recognition', response => {
         const data = JSON.parse(response.body);
        //  if (this.recordList.some(item => item.personnelId === data.personnelId)) return;
         if (data.equipmentId !== 'd9642a9836ba40b59b5da5744e037b41') return;
         if (data.confidence < 73) return;
         if (this.recordList.length > 3) {
             this.recordList.shift();
         }
         this.recordList.unshift(data);

         if (this.snapList.some(item => item.personnelId === data.personnelId)) return;
         if (this.snapList.length > 2) {
             this.snapList.shift();
             this.snapAnimate = false;
         } else {
            this.snapAnimate = true;
         }
         this.snapList.push(data);
         if (this.clearSnapList) clearTimeout(this.clearSnapList);
         this.clearSnapList = setTimeout(() => {
             this.snapList = [];
         }, 8000);
       });
     }
  },
  mounted () {
    this.initPlayer({ techOrder: ['flash', 'html5'] });
    this.subscribeSocket();
  }
};
</script>

<style lang="scss" scoped>
@import url('../../assets/css/animate.css');
.welcome {
  position: relative;
  overflow: hidden;
  height: 1010px;
  font-size: 16px;
  background: url(../../assets/image/welcome-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin: 20px 30px;
  .welcome-show {
    position: relative;
    margin: 80px 65px 50px 40px;
    height: 900px;
  }
  .welcome-right {
    position: absolute;
    width: 420px;
    height: 900px;
    right: 30px;
    background: rgba(5, 5, 13, 0.6);
    overflow: hidden;
  }
  .welcome-record {
    background: #07081b url(../../assets/image/record-bg.png) no-repeat center;
    background-size: 100% 100%;
    width: 100%;
    height: 600px;
    box-sizing: border-box;
    padding-top: 75px;
    color: #00ffff;
    font-size: 16px;
    text-align: left;
  }
  .welcome-video {
    width: 100%;
    height: 250px;
    margin-top: 15px;
    background: #07081b url(../../assets/image/video-bg.png) no-repeat center;
    background-size: 100% 100%;
    padding: 18px 20px 0 20px;
    box-sizing: border-box;
    overflow: hidden;
  }
  .video-js {
    object-fit: fill;
  }
  .record-info {
      height: 130px;
      margin: 0 20px;
      overflow: hidden;
      border-bottom: 1px solid #313e7b;
  }
  .record-img {
      height: 90px;
      width: 90px;
      display: block;
      margin-top: 20px;
      float: left;
  }
  .record-detail {
      float: left;
      width: 240px;
      margin-left: 15px;
      margin-top: 3px;
      p {
          margin: 15px 0;
      }
  }
  .record-detail-info {
      position: relative;
      overflow: hidden;
  }
  .record-detail-age {
      position: absolute;
      right: 80px;
      top: 2px;
  }
  .welcome-left {
    position: absolute;
    width: 1270px;
    height: 865px;
    left: 10px;
    color: #00ffff;
    overflow: hidden;
    background: #07081b url(../../assets/image/welcome-left-bg.png) no-repeat center;
    background-size: 100% 100%;
  }
  .welcome-snap {
      width: 1180px;
      height: 430px;
      margin: 100px auto;
      overflow: hidden;
      position: relative;
  }
  .welcome-snap-info {
      display: inline-block;
      width: 300px;
      height: 400px;
      background-size: 100% 100%;
      background-color: rgb(48, 61, 123);
      border-radius: 30px;
      margin: 0 20px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 50px;
  }
  .welcome-snap-name {
      margin: 30px auto 5px auto;
      font-size: 24px;
      font-weight: bold;
  }
  .welcome-snap-describe {
      margin: 15px auto 5px auto;
      font-size: 16px;
  }
  .welcome-snap-img {
      width: 200px;
      height: 200px;
      border-radius: 50%;
  }
  .welcome-slogan {
      font-size: 60px;
  }
  .welcome-sleep {
      position: absolute;
      bottom: 0;
      right: 250px;
  }
  .welcome-sleep-title {
      position: absolute;
      top: 70px;
      left: 310px;
      font-size: 60px;
      color: #fff;
  }
}
</style>

<style>
html,#app{
    background: #03030f;
}
</style>
