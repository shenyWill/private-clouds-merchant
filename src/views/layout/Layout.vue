<template>
  <div class="app-wrapper">
    <Navbar/>
    <Sidebar/>
    <TagsView/>
    <AppMain/>
  </div>
</template>

<script>
 import Navbar from './components/Navbar';
 import Sidebar from './components/Sidebar';
 import AppMain from './components/AppMain';
 import TagsView from './components/TagsView';
 export default {
   name: 'Layout',
   components: {
     Navbar,
     Sidebar,
     AppMain,
     TagsView
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
 .app-wrapper {
   height: 100%;
 }
</style>
