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
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 import SidebarItem from './SidebarItem';
 import menu from '@/config/menu';
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
       logo: require('@/assets/image/logo-white.png')
     };
   },
   computed: {
     ...mapGetters([
       'isCollapse'
     ]),
     routes () {
       return menu;
     }
   }
 };
</script>

<style lang="scss">
 .sidebar {
   display: none;
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
</style>
