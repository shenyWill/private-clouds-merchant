<template>
    <div class="search">
        <!-- 搜索导航栏 -->
        <div :class="['search-title',visibleSearch ? 'hide-search-title' : '']" @click.self="visibleSearch = !visibleSearch">
            <i class="el-icon-search" @click.stop="visibleSearch = !visibleSearch"></i>
            <i class="el-icon-delete" @click.stop="removeTag"></i>
            <span v-if="Array.isArray(equipmentObj) && equipmentObj.length > 0">
              <el-tag
                closable
                class="search-tag"
                @click.prevent.stop="true"
                @close.stop="closeTag('equipmentId')">
                {{searchTagObj.equipmentId}} : {{equipmentObj}}
              </el-tag>
            </span>
            <span v-else-if="searchResult.equipmentId && !Array.isArray(equipmentObj)">
              <el-tag
                closable
                class="search-tag"
                @click.prevent.stop="true"
                @close.stop="closeTag('equipmentId')">
                {{searchTagObj.equipmentId}} : {{equipmentObj}}
              </el-tag>
            </span>
            <span>
              <el-tag
                v-for="(value, key) in searchResult"
                v-if="key !== 'equipmentId' && value"
                :key="key"
                closable
                class="search-tag"
                @click.prevent.stop="true"
                @close.stop="closeTag(key)">
                {{searchTagObj[key]}} : {{key == 'libraryTypeId' ? databaseObj[value]: value}}
              </el-tag>
            </span>
        </div>
        <div :class="['search-form',visibleSearch ? '' : 'hide-search-form']">
            <slot name="search-form"></slot>
        </div>
    </div>
</template>

<script>
 import Vue from 'vue';
 import SearchTag from '@/config/searchTag.js';
 export default {
   data () {
     return {
       visibleSearch: false, // 搜索框显示与否标识
       searchTagObj: {...SearchTag}
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
     },
     equipmentArr: {
       type: Array
     },
     databaseArr: {
       type: Array
     }
   },
   computed: {
     equipmentObj () {
       if (this.searchResult.equipmentId && Array.isArray(this.searchResult.equipmentId)) {
         let obj = [];
         this.searchResult.equipmentId.forEach(id => {
           this.equipmentArr.forEach(item => {
             if (id === item.equipmentCode) {
               obj.push(item.equipmentName);
             }
           });
         });
         return obj;
       } else {
         let obj = '';
         this.equipmentArr && this.equipmentArr.forEach(item => {
           if (item.id === this.searchResult.equipmentId) {
             obj = item.equipmentName;
           }
         });
         return obj;
       }
     },
     databaseObj () {
       let obj = {};
       this.databaseArr && this.databaseArr.forEach(item => {
         obj[item.id] = item.libraryTypeName;
       });
       return obj;
     }
   }
 };
</script>

<style lang="scss" scoped>
.search {
  margin: 35px 40px;
  // 搜索头部
  .search-title {
    // width: 1590px;
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
    // width: 1590px;
    border-radius: 0 0 7px 7px;
  }
  .hide-search-form {
    max-height: 0;
  }
}
</style>
