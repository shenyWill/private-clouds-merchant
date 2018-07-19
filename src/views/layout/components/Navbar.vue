<template>
  <div class="navbar">
    <el-menu mode="horizontal">
      <div class="navbar__userpane">
        userpane
      </div>
    </el-menu>
  </div>
</template>

<script>
 export default {
   name: 'Navbar',
   data () {
     return {};
   },
   methods: {}
 };
</script>

<style lang="scss" scoped>
 .navbar {
   height: 62px;
   line-height: 62px;
   margin-left: 180px;

   background-color: #3b3b3b;
   z-index: 999;
   .navbar__userpane {
     float: right;
     height: 100%;
   }
 }
</style>
