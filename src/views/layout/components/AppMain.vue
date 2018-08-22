<template>
  <div :class="['app-main', isCollapse ? 'app-main__collapse' : '']">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <BlackList v-if="showAlert" :object="alertData" @close="alertClose"></BlackList>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex';
 import Socket from '@/api/Socket';
 import config from '@/config';
 import BlackList from '@/views/components/BlackList';
 export default {
   name: 'AppMain',
   data () {
     return {
       socket: null,
       showAlert: false,
       alertData: null,
       blackList: []
     };
   },
   components: {
     BlackList
   },
   computed: {
     ...mapGetters([
       'user',
       'isCollapse',
       'cachedViews',
       'blacklistAlert'
     ])
   },
   methods: {
     ...mapActions([
       'connectSocket',
       'disconnectSocket'
     ]),
     alertClose () {
       this.showAlert = false;
     },
     initSocket (url) {
       this.socket = new Socket(url);
       this.socket.connect('guest', 'guest', frame => {
         this.connectSocket();
         this.socket.subscribe('/face/blacklist', response => {
           const data = JSON.parse(response.body);
           if (Number(data.confidence) > config.score.blacklist) {
             this.showAlert = true;
             this.alertData = JSON.parse(response.body);
           }
         });
       }, () => {
         // this.disconnectSocket();
         // socket connect error, reconnect
         // this.initSocket(url);
       });
     }
   },
   watch: {
     $route (newVal, oldVal) {
     }
   },
   mounted () {
     this.initSocket(config.socketURL);
   }
 };
</script>

<style lang="scss">
 .app-main {
   margin-left: 250px;
   transition: all .2s;
 }
 .app-main__collapse {
   margin-left: 100px;
 }
</style>
