<template>
  <div :class="['app-main', isCollapse ? 'app-main__collapse' : '']">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 import Socket from '@/api/Socket';
 import config from '@/config';
 export default {
   name: 'AppMain',
   data () {
     return {
     };
   },
   computed: {
     ...mapGetters([
       'isCollapse',
       'cachedViews'
     ])
   },
   methods: {
     initSocket (url) {
       const socket = new Socket(url);
       socket.connect('guest', 'guest', frame => {
         socket.subscribe('/topic/getResponse', response => {
           this.$notify({
             title: '人员报警',
             message: JSON.parse(response.body).responseMessage,
             position: 'bottom-right'
           });
         });
       }, () => {
         // this.initSocket(url);
       });
     }
   },
   mounted () {
     this.initSocket(config.socketURL);
   }
 };
</script>

<style>
 .app-main {
   margin-left: 250px;
   transition: all .2s;
 }
 .app-main__collapse {
   margin-left: 100px;
 }
</style>
