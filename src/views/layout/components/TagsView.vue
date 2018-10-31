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
        <span class="tagsview__icon-close el-icon-error" @click.prevent.stop="closeSelectedTag(tag)"></span>
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
             this.$router.push('/stream/index');
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
       if (!tags) return;
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
   display: none;
   padding: 2px;
   margin-left: 250px;
   height: 40px;
   line-height: 30px;
   text-align: left;
   box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
   background-color: #fff;
   transition: all .2s;
   .tagsview__icon-close {
     width: 16px;
     height: 16px;
     border-radius: 50%;
     text-align: center;
     overflow: hidden;
     text-indent: 0;
     position: absolute;
     right: 10px;
     top: 7px;
   }

   .tagsview__item {
     display: inline-block;
     position: relative;
     width: 120px;
     height: 30px;
     line-height: 30px;
     font-size: 14px;
     color: #999;
     background-color: #e0e0e0;
     border: 1px solid #999;
     margin-right: 10px;
     text-decoration: none;
     text-indent: 10px;
     border-radius: 8px;
     &:first-child {
       margin-left: 10px;
     }
     &:hover {
       background-color: $hover;
       color: white;
       border-color: $hover;
     }
     &.active {
       color: white;
       border-color: $hover;
       background-color: $selected;
       text-indent: 25px;
       &::before {
         content: "";
         display: inline-block;
         position: absolute;
         width: 10px;
         height: 10px;
         top: 10px;
         left: 10px;
         background-color: #fff;
         border-radius: 50%;
       }
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
