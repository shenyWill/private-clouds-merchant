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
       this.socket = Socket.init(url);
       this.socket.connect('guest', 'guest', frame => {
         this.connectSocket();
         this.socket.subscribe('/face/blacklist', response => {
           const data = JSON.parse(response.body);
           if (this.blacklistAlert) {
             this.showAlert = true;
             this.alertData = data;
           }
         });
       }, () => {
         this.disconnectSocket();
         // socket connect error, reconnect
         this.initSocket(url);
       });
     }
   },
   watch: {
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
