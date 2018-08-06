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
