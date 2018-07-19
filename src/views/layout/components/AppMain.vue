<template>
  <div class="app-main">
    <transition name="fade" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view></router-view>
      </keep-alive>
    </transition>
  </div>
</template>

<script>
 export default {
   name: 'AppMain',
   data () {
     return {
     };
   },
   computed: {
     cachedViews () {
       return this.$store.state.tagsView.cachedViews;
     }
   }
 };
</script>

<style>
 .app-main {
   margin-left: 180px;
   height: 100%;
 }
</style>
