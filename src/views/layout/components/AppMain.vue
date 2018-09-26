<template>
  <div :class="['app-main', isCollapse ? 'app-main__collapse' : '']">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
    <BlackList v-if="showAlert" :object="alertData" @close="alertClose"></BlackList>
    <MemoryList v-if="showMemory" :object="memoryData" @close="memoryClose"></MemoryList>
  </div>
</template>

<script>
 import { mapGetters, mapActions } from 'vuex';
 import Socket from '@/api/Socket';
 import config from '@/config';
 import BlackList from '@/views/components/BlackList';
 import MemoryList from '@/views/components/MemoryList';
 export default {
   name: 'AppMain',
   data () {
     return {
       socket: null,
       showAlert: false,
       alertData: null,
       blackList: [],
       memoryData: null,
       showMemory: false
     };
   },
   components: {
     BlackList,
     MemoryList
   },
   computed: {
     ...mapGetters([
       'user',
       'isCollapse',
       'cachedViews',
       'blacklistAlert',
       'parameterValue'
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
     memoryClose () {
       this.showMemory = false;
     },
     initSocket (url) {
       this.socket = Socket.init(url);
       this.socket.connect('guest', 'guest', frame => {
         this.connectSocket();
         this.socket.subscribe('/face/blacklist', response => {
           const data = JSON.parse(response.body);
           if (this.blacklistAlert && this.parameterValue < data.confidence) {
             this.showAlert = true;
             this.alertData = data;
           }
         });
         // 内存不足提示
         this.socket.subscribe('/face/memoryWarn', response => {
           const data = JSON.parse(response.body);
           this.memoryData = data;
           this.showMemory = true;
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
