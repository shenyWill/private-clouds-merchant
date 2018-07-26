<template>
  <div class="breadcrumb">
    <el-breadcrumb seperator="/">
      <transition-group name="breadcrumb">
        <el-breadcrumb-item></el-breadcrumb-item>
      </transition-group>
    </el-breadcrumb>
  </div>
</template>

<script>
 export default {
   name: 'Breadcrumb',
   data () {
     return {
       breadcrumbList: null
     };
   },
   watch: {
     $route () {
       this.getBreadcrumb();
     }
   },
   methods: {
     getBreadcrumb () {
//       let matched = this.$route.matched.filter(item => item.name);
//       const first = matched[0];
     }
   }
 };
</script>
