<template>
  <div class="app-wrapper">
    <div class="app-container">
      <Navbar/>
      <Sidebar/>
      <AppMain/>
    </div>
  </div>
</template>

<script>
 import Navbar from './components/Navbar';
 import Sidebar from './components/Sidebar';
 import AppMain from './components/AppMain';
 export default {
   name: 'Layout',
   components: {
     Navbar,
     Sidebar,
     AppMain
   },
   data () {
     return {
     };
   },
   methods: {
   }
 };
</script>

<style>
</style>
