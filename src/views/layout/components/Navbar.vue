<template>
  <div :class="['navbar', isCollapse ? 'navbar__collapse' : '']">
    <el-menu mode="horizontal">
      <i class="iconfont icon-zhediecaidanlan-lan navbar__btn" @click="toggleMenu" v-if="isCollapse"></i>
      <i class="iconfont icon-zhankaicaidanlan-lan navbar__btn" @click="toggleMenu" v-else></i>
      <div class="navbar__userpane">
        <Userpane></Userpane>
      </div>
    </el-menu>
  </div>
</template>

<script>
 import Userpane from './Userpane';
 import { mapActions, mapGetters } from 'vuex';
 export default {
   name: 'Navbar',
   components: {
     Userpane
   },
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
   height: 60px;
   max-height: 60px;
   line-height: 60px;
   margin-left: 250px;
   text-align: left;

   background-color: #3b3b3b;
   z-index: 999;
   transition: all .2s;
   .navbar__btn {
     position: relative;
     left: 20px;
     font-size: 28px;
     &:hover {
       cursor: pointer;
     }
   }
   .navbar__userpane {
     float: right;
     right: 10px;
     height: 100%;
   }
 }
 .navbar__collapse {
   margin-left: 100px;
 }
</style>
