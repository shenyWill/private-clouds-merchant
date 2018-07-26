<template>
  <div :class="['tagsview', isCollapse ? 'tagsview__collapse' : '']">
    <router-link
      :key="tag.path"
      :to="tag.path"
      v-for="tag in Array.from(visitedViews)"
      class="tagsview__item"
      ref="tag"
      :class="isActive(tag) ? 'active' : ''">
      {{ tag.title }}
      <span class="tagsview__icon-close el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
    </router-link>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 export default {
   // TODO: Add Scroll Bar
   name: 'Tagsview',
   data () {
     return {
     };
   },
   computed: {
     ...mapGetters([
       'isCollapse'
     ]),
     visitedViews () {
       return this.$store.state.tagsView.visitedViews;
     }
   },
   watch: {
     $route () {
       this.addViewTags();
       this.moveToCurrentTag();
     }
   },
   methods: {
     generateRoute () {
       if (this.$route.name) {
         return this.$route;
       }
       return false;
     },
     isActive (route) {
       return route.path === this.$route.path || route.name === this.$route.name;
     },
     closeSelectedTag (view) {
       this.$store.dispatch('delVisitedViews', view).then(views => {
         if (this.isActive(view)) {
           const lastView = views.slice(-1)[0];
           if (lastView) {
             this.$router.push(lastView.path);
           } else {
             this.$router.push('/index');
           }
         }
       });
     },
     addViewTags () {
       const route = this.generateRoute();
       if (!route) {
         return false;
       }
       this.$store.dispatch('addVisitedViews', route);
     },
     moveToCurrentTag () {
     }
   },
   mounted () {
     this.addViewTags();
   }
 };
</script>

<style lang="scss">
 .tagsview {
   padding: 2px;
   margin-left: 180px;
   height: 30px;
   line-height: 30px;
   text-align: left;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   transition: all .2s;

   .tagsview__icon-close:hover {
     background-color: lightgray;
     border-radius: 5px;
     color: black;
   }

   .tagsview__item {
     font-size: 14px;
     margin: 0 5px;
     padding: 5px;
     color: black;
     border: 1px solid gray;
     text-decoration: none;
   }

   .active {
     color: white;
     background-color: #409eff;
   }
 }
 .tagsview__collapse {
   margin-left: 65px;
 }
</style>
