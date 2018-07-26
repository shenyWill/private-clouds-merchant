<template>
  <div class="navbar__user">
    <img :src="user.avatar" />
    <span>{{ user.username }}</span>
  </div>
</template>

<script>
 export default {
   name: '',
   data () {
     return {
     };
   },
   props: {
     user: {
       type: Object,
       default: () => { return {}; }
     }
   }
 };
</script>

<style>
</style>
