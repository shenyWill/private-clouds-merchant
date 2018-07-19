<template>
  <div class="tagsview">
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
 export default {
   // TODO: Add Scroll Bar
   name: 'Tagsview',
   data () {
     return {
     };
   },
   computed: {
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
   margin-left: 180px;
   height: 30px;
   line-height: 30px;
   text-align: left;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

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
</style>
