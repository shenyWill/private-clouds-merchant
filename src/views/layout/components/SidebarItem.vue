<template>
  <div class="sidebar-item">
    <template v-for="route in routes" v-if="!(route.jurisdiction===1 && user && user.roleId===0)">
      <router-link :key="route.name" class="sidebar-item__container" :to="route.path" v-if="route.children && route.children.length === 0">
        <el-menu-item :index="route.path">
          <i :class="['iconfont', 'sidebar-item__icon', route.icon]"></i>
          <span slot="title" class="sidebar-item__name">{{ route.name }}</span>
        </el-menu-item>
      </router-link>
      <el-submenu v-else :index="route.path" :key="route.name">
        <template slot="title">
          <i :class="['iconfont', 'sidebar-item__icon', route.icon]"></i>
          <span slot="title" v-if="route.name && !isCollapse">{{ route.name }}</span>
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
import { mapGetters, mapActions } from 'vuex';
 import api from '@/api';
 import config from '@/config';
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'user'
      ])
  },
  methods: {
    ...mapActions([
      'login'
    ])
  },
  data () {
    return {};
  },
  mounted () {},
  async created () {
      if (this.user === null) {
          const response = await api.post(config.personCenter.list, {});
          if (Number(response.data.code) === 200) {
              this.login(response.data.user);
          }
      }
    }
};
</script>

<style lang="scss">
 .sidebar-item {
   font-size: 0;
   .sidebar-item__icon {
     font-size: 28px;
     color: white;
     margin-right: 20px;
   }
 }
 .sidebar-item__container {
   text-decoration: none;
 }
</style>
