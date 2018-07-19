<template>
  <div class="sidebar">
    <el-menu
      class="sidebar__menu"
      mode="vertical"
      :default-active="$route.path"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <sidebar-item :routes="routes"></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
 import SidebarItem from './SidebarItem';
 import menu from '@/config/menu';
 export default {
   name: 'Sidebar',
   components: {
     SidebarItem
   },
   data () {
     return {};
   },
   computed: {
     routes () {
       return menu;
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
   width: 180px;
   height: 100%;
   z-index: 999;
   a {
     display: inline-block;
     width: 100%;
     overflow: hidden;
     text-decoration: none;
   }
   .sidebar__menu {
     padding-top: 62px;
     overflow: hidden;
     height: 100%;

     .el-menu .el-submenu-item {
       min-width: 100% !important;
     }
   }
 }
</style>
