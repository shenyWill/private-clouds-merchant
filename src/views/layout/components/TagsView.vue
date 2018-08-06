<template>
  <div :class="['tagsview', isCollapse ? 'tagsview__collapse' : '']">
    <scroll-pane ref="scrollPane" class="tagsview__wrapper">
      <router-link
        :key="tag.path"
        :to="tag.path"
        v-for="tag in visitedViews"
        class="tagsview__item"
        ref="tag"
        :class="isActive(tag) ? 'active' : ''">
        {{ tag.title }}
        <span class="tagsview__icon-close el-icon-close" @click.prevent.stop="closeSelectedTag(tag)"></span>
      </router-link>
    </scroll-pane>
  </div>
</template>

<script>
 import { mapGetters } from 'vuex';
 import ScrollPane from '@/views/components/ScrollPane';
 export default {
   name: 'Tagsview',
   data () {
     return {
     };
   },
   components: {
     ScrollPane
   },
   computed: {
     ...mapGetters([
       'isCollapse',
       'visitedViews'
     ])
   },
   watch: {
     $route () {
       this.addViewTags();
       this.moveToCurrentTarget();
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
     moveToCurrentTarget () {
       const tags = this.$refs.tag;
       this.$nextTick(() => {
         for (const tag of tags) {
           if (tag.to === this.$route.path) {
             this.$refs.scrollPane.moveToTarget(tag.$el);
             break;
           }
         }
       });
     }
   },
   mounted () {
     this.addViewTags();
   }
 };
</script>

<style lang="scss">
 $selected: #409eff;
 $hover: #409eff;
 .tagsview {
   padding: 2px;
   margin-left: 250px;
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
     display: inline-block;
     position: relative;
     font-size: 12px;
     margin: 2px 5px;
     padding: 0 8px;
     height: 26px;
     color: black;
     border: 1px solid gray;
     text-decoration: none;
     &:hover {
       background-color: $hover;
       color: white;
     }
     &.active {
       color: white;
       background-color: $selected;
     }
   }
 }
 .tagsview__collapse {
   margin-left: 100px;
 }
 .tagsview__wrapper {
   height: 100%;
 }
</style>
