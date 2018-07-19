<template>
  <div class="sidebar-item">
    <template v-for="route in routes">
      <router-link
        :key="route.name"
        class="sidebar-item__container"
        :to="route.path"
        v-if="route.children && route.children.length === 0">
        <el-menu-item :index="route.path">
          <i :class="['iconfont', 'sidebar-item__icon', route.icon]"></i>
          <span slot="title" class="sidebar-item__name">{{ route.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="route.path" :key="route.name">
        <template slot="title">
          <i :class="['iconfont', 'sidebar-item__icon', route.icon]"></i>
          <span slot="title" v-if="route.name">{{ route.name }}</span>
        </template>
        <template v-for="child in route.children">
          <router-link class="sidebar-item__container" :to="child.path" :key="child.name">
            <el-menu-item :index="child.path">
              <span slot="title">{{ child.name }}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
 export default {
   name: 'SidebarItem',
   props: {
     routes: {
       type: Array
     }
   },
   data () {
     return {
     };
   },
   mounted () {
   }
 };
</script>

<style>
</style>
