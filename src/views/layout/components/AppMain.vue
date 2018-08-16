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
 import { mapGetters } from 'vuex';
 import Socket from '@/api/Socket';
 import config from '@/config';
 import BlackList from '@/views/components/BlackList';
 export default {
   name: 'AppMain',
   data () {
     return {
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
       'isCollapse',
       'cachedViews'
     ])
   },
   methods: {
     alertClose () {
       this.showAlert = false;
     },
     initSocket (url) {
       const socket = new Socket(url);
       socket.connect('guest', 'guest', frame => {
         socket.subscribe('/face/blacklist', response => {
           this.showAlert = true;
           this.alertData = JSON.parse(response.body);
         });
       }, error => {
         console.log(error);
         // this.initSocket(url);
       });
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
