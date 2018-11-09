<template>
  <div :class="['sidebar', isCollapse ? 'sidebar__collapse' : '']">
    <div>
      <img class="logo-icon" :src="logo" />
    </div>
    <el-menu
      class="sidebar__menu"
      mode="vertical"
      :default-active="$route.path"
      :collapse="isCollapse"
      :background-color="backgroundColor"
      :text-color="textColor"
      :active-text-color="activeTextColor">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
    <!-- 批量上传上传球 -->
    <div class="add-more-person-global" v-if="morePersonTranstion">
      <img :src="personAddLoad" alt="" class="person-add-load" :style="{top: loadTop + 'px'}">
      <span class="person-global-info">{{personAddInfo}}</span>
      <span class="person-global-percent">{{personAddPercent}}%</span>
    </div>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 import SidebarItem from './SidebarItem';
 import menu from '@/config/menu';
 import Socket from '@/api/Socket';
 import config from '@/config';
 export default {
   name: 'Sidebar',
   components: {
     SidebarItem
   },
   data () {
     return {
       backgroundColor: '#304156',
       textColor: '#fff',
       activeTextColor: '#ffd046',
       logo: require('@/assets/image/logo-white.png'),
       personAddLoad: require('@/assets/image/person-load.gif'),
       loadTop: -10,
       personAddInfo: '批量入库中',
       personAddPercent: 0
     };
   },
   computed: {
     ...mapGetters([
       'isCollapse',
       'morePersonTranstion'
     ]),
     routes () {
       return menu;
     }
   },
   methods: {
     initSocket (url) {
       this.socket = Socket.init(url);
       this.socket.subscribe('/face/recognition', response => {
        //  const data = JSON.parse(response.body);
        //  console.log(data)
       });
     },
     subscribeSocket () {
       if (this.socketConnected) {
         // socket connected
        //  alert(1)
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
   watch: {
     morePersonTranstion (newVal) {
       if (newVal) {
         var loadTimer = setInterval(() => {
           this.loadTop -= 1;
           this.personAddPercent += 1;
           if (this.personAddPercent > 99) {
             clearInterval(loadTimer);
           }
         }, 1000);
        // this.initSocket(config.socketURL);
       }
     }
   }
 };
</script>

<style lang="scss">
 .sidebar {
   position: fixed;
   top: 0;
   bottom: 0;
   left: 0;
   width: 250px;
   height: 100%;
   z-index: 999;
   transition: all .2s;
   .logo-icon {
     position: fixed;
     top: 20px;
     left: 31px;
     height: 43px;
     width: 188px;
     background-size: 188px 43px;
     z-index: 999;
   }
   a {
     display: inline-block;
     width: 100%;
     overflow: hidden;
     text-decoration: none;
   }
   .sidebar__menu {
     padding-top: 83px;
     padding-left: 0;
     border-right: none;
     overflow: hidden;
     height: 100%;
     .el-menu .el-submenu-item {
       min-width: 100% !important;
     }
   }
 }
 .sidebar__collapse {
   width: 100px;
   .logo-icon {
     display: none;
   }
   .el-menu--collapse {
     width: 100%;
   }
 }
 // 批量入库
 .add-more-person-global {
   position: fixed;
   bottom: 30px;
   left: 60px;
   width: 120px;
   height: 120px;
   border-radius: 50%;
   border: 5px solid #fff;
   background-color: #b8feff;
   overflow: hidden;
   .person-add-load {
     position: absolute;
     background-size: 100% 100%;
     width: 130px;
     left: -5px;
   }
   .person-global-info,.person-global-percent {
     z-index: 999;
     position: absolute;
     font-size: 14px;
     width: 100%;
     text-align: center;
     left: 0;
     top: 40px;
     color: #333;
     font-weight: bold;
   }
   .person-global-percent {
     top: 65px;
   }
 }
</style>
