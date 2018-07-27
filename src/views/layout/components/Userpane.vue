<template>
  <div class="navbar__user">
    <img class="navbar__avatar" :src="user.avatar" draggable="false" />
    <span>{{ user.username }}</span>
  </div>
</template>

<script>
 export default {
   name: 'Userpane',
   data () {
     return {
     };
   },
   props: {
     user: {
       type: Object,
       default: () => {
         return {
           avatar: require('@/assets/image/avatar.png')
         };
       }
     }
   }
 };
</script>

<style>
 .navbar__user {
   border: none;
   height: 62px;
 }
 .navbar__avatar {
   margin: 8px 20px;
   width: 40px;
   height: 40px;
   border-radius: 20px;
 }
</style>
