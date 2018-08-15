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
      <div class="blacklist__body-image"></div>
      <div class="blacklist__body-title">
        <span>{{ object.personnelName }}</span>
        <span>{{ object.libraryTypeName }}</span>
      </div>
    </div>
  </div>
</template>

<script>
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
       closed: false
     };
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
     console.log('===========');
     console.log(this.object);
     this.startTimer();
   }
 };
</script>

<style lang="scss">
 .blacklist {
   position: absolute;
   width: 400px;
   height: 300px;
   bottom: 30px;
   right: 50px;
   border: 2px solid red;
   border-radius: 20px;
   overflow: hidden;
   .blacklist__header {
     position: relative;
     padding: 10px;
     padding-left: 30px;
     height: 20px;
     color: white;
     background-color: red;
     font-size: 16px;
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
   }
 }
</style>
