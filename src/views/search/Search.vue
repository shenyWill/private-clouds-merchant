<template>
    <div class="search">
        <!-- 搜索导航栏 -->
        <div :class="['search-title',visibleSearch ? 'hide-search-title' : '']" @click.self="visibleSearch = !visibleSearch">
            <i class="el-icon-search" @click.stop="visibleSearch = !visibleSearch"></i>
            <i class="el-icon-delete" @click.stop="removeTag"></i>
            <el-tag v-for="(value, key) in searchResult" :key="key" closable class="search-tag" @click.prevent.stop="true" @close.stop="closeTag(key)">{{key}}: {{value}} </el-tag>
        </div>
        <div :class="['search-form',visibleSearch ? '' : 'hide-search-form']">
            <slot name="search-form"></slot>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
export default {
  data () {
    return {
      visibleSearch: true // 搜索框显示与否标识
    };
  },
  methods: {
    // 删除单个tag
    closeTag (tag) {
      Vue.delete(this.searchResult, tag);
    },
    // 删除全部tag
    removeTag () {
      this.$confirm('此操作将清空所有搜索条件，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        for (let key in this.searchResult) {
          Vue.delete(this.searchResult, key);
        }
      });
    }
  },
  props: {
    searchResult: {
      type: Object
    }
  }
};
</script>

<style lang="scss" scoped>
.search {
  margin: 35px;
  // 搜索头部
  .search-title {
    width: 1600px;
    height: 60px;
    line-height: 50px;
    border-radius: 7px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    background-color: #fff;
    position: relative;
    text-align: left;
    transition: all 1s;
    cursor: pointer;
    .el-icon-search {
      position: relative;
      top: 7px;
      margin-left: 20px;
      color: #999999;
    }
    .el-icon-delete {
      position: absolute;
      right: 10px;
      top: 13px;
      color: #999999;
    }
    .search-tag {
      line-height: 30px;
      margin-left: 20px;
      cursor: auto;
    }
  }
  .hide-search-title {
    box-shadow: none;
    border-radius: 7px 7px 0 0;
  }
  // 搜索框
  .search-form {
    background-color: #eeeeee;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    transition: all 1s;
    overflow: hidden;
    max-height: 600px;
    border-radius: 0 0 7px 7px;
  }
  .hide-search-form {
    max-height: 0;
  }
}
</style>
