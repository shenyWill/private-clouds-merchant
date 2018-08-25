<template>
  <div
    class="blacklist"
    @mouseover="clearTimer()"
    @mouseleave="startTimer()">
    <div class="blacklist__header">
      <div class="blacklist__title">
        <i class="el-icon-warning"></i>
        人员报警
        <div class="blacklist__close el-icon-close" @click.stop="close"></div>
      </div>
    </div>
    <div class="blacklist__body">
      <div class="blacklist__body-image">
        <span class="blacklist__image-wrapper">
          <span class="blacklist__image-type">入库头像</span>
          <img class="blacklist__image" :src="object.url + object.imageUrl2" />
        </span>
        <span class="blacklist__image-wrapper">
          <span class="blacklist__image-score">相似度: {{ parseInt(object.confidence) }}%</span>
          <span class="blacklist__image-type">识别头像</span>
          <img class="blacklist__image" :src="object.url + object.imageUrl1" />
        </span>
      </div>
      <div class="blacklist__body-title">
        <span class="blacklist__body-name">{{ object.personnelName }}</span>
        <span> | </span>
        <span class="blacklist__body-desc">{{ object.describe }}</span>
      </div>
      <div class="blacklist__content">
        <div class="blacklist__item">
          <span class="blacklist__key">所在库:</span>
          <span class="blacklist__value">{{ object.libraryName }}</span>
        </div>
        <div class="blacklist__item">
          <span class="blacklist__key">所属组织:</span>
          <span class="blacklist__value">{{ object.groupName }}</span>
        </div>
        <div class="blacklist__item">
          <span class="blacklist__key">识别设备:</span>
          <span class="blacklist__value">{{ object.equipmentName }}</span>
        </div>
        <div class="blacklist__item">
          <span class="blacklist__key">识别时间:</span>
          <span class="blacklist__value">{{ object.createTime }}</span>
        </div>
      </div>
    </div>
    <audio ref="audio" :src="sound" v-show="false"></audio>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 export default {
   name: 'BlackList',
   props: {
     show: {
       type: Boolean,
       default: () => {
         return false;
       }
     },
     object: {
       type: Object,
       default: () => {
         return {};
       }
     }
   },
   data () {
     return {
       visible: false,
       timer: null,
       duration: 3000,
       sound: require('@/assets/blacklist.mp3'),
       closed: false
     };
   },
   computed: {
     ...mapGetters([
       'blacklistSound'
     ])
   },
   watch: {
     show (newVal) {
       this.visible = newVal;
     },
     closed (newVal) {
       if (newVal) {
         this.visible = false;
       }
     }
   },
   methods: {
     clearTimer () {
       clearTimeout(this.timer);
     },
     startTimer () {
       this.timer = setTimeout(() => {
         if (!this.closed) {
           this.close();
         }
       }, this.duration);
     },
     close () {
       this.closed = true;
       this.$emit('close');
     }
   },
   mounted () {
     this.startTimer();
     if (this.blacklistSound) this.$refs['audio'].play();
   }
 };
</script>

<style lang="scss">
 .blacklist {
   position: fixed;
   width: 400px;
   height: 450px;
   bottom: 30px;
   right: 30px;
   font-size: 16px;
   border: 5px solid red;
   border-radius: 10px;
   overflow: hidden;
   background-color: #fff;
   .blacklist__header {
     position: relative;
     padding: 10px;
     padding-left: 30px;
     height: 20px;
     color: white;
     background-color: red;
     font-size: 18px;
     text-align: left;
     .blacklist__close {
       position: absolute;
       top: 10px;
       right: 15px;
       cursor: pointer;
       color: white;
       font-size: 20px;
     }
   }
   .blacklist__body {
     margin-top: 30px;
     .blacklist__body-image {
       .blacklist__image-wrapper {
         position: relative;
         display: inline-block;
         width: 128px;
         height: 128px;
         border: 3px solid red;
         margin-left: 20px;
         border-radius: 20px;
         overflow: hidden;
         .blacklist__image-score {
           position: absolute;
           padding: 5px;
           min-width: 40px;
           top: 0;
           right: 0;
           font-size: 14px;
           color: white;
           text-align: right;
           border-radius: 0 0 0 10px;
           background-color: rgba(255, 0, 0, .5);
         }
         .blacklist__image-type {
           position: absolute;
           left: 0;
           right: 0;
           bottom: 0;
           color: white;
           text-align: center;
           background-color: rgba(255, 0, 0, .7);
         }
         .blacklist__image {
           display: inline-block;
           width: 128px;
           height: 128px;
         }
       }
     }
     .blacklist__body-title {
       margin-top: 30px;
       font-weight: bold;
     }
     .blacklist__content {
       text-align: left;
       margin-top: 30px;
       margin-left: 50px;
       .blacklist__item {
         margin-top: 10px;
         .blacklist__key {
           font-weight: bold;
         }
         .blacklist__value {
         }
       }
     }
   }
 }
</style>
