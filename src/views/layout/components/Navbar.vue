<template>
  <div :class="['navbar', isCollapse ? 'navbar__collapse' : '']">
    <el-menu mode="horizontal">
      <el-button class="navbar__btn" icon="el-icon-menu" @click="toggleMenu"></el-button>
      <div class="navbar__userpane">
        用户
      </div>
    </el-menu>
  </div>
</template>

<script>
 import { mapActions, mapGetters } from 'vuex';
 export default {
   name: 'Navbar',
   data () {
     return {};
   },
   computed: {
     ...mapGetters([
       'isCollapse'
     ])
   },
   methods: {
     ...mapActions([
       'toggleMenu'
     ])
   }
 };
</script>

<style lang="scss" scoped>
 .navbar {
   position: relative;
   height: 62px;
   line-height: 62px;
   margin-left: 180px;
   text-align: left;

   background-color: #3b3b3b;
   z-index: 999;
   transition: all .2s;
   .navbar__btn {
     position: relative;
     left: 10px;
   }
   .navbar__userpane {
     float: right;
     right: 10px;
     height: 100%;
   }
 }
 .navbar__collapse {
   margin-left: 65px;
 }
</style>
