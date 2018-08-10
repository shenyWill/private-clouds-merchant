<template>
  <div class="database">
    <div class="database-nav">
      <el-card class="database-add">
        <div class="detabase-add-icon">
          <i class="el-icon-plus"></i>
        </div>
        <div class="detabase-add-content">
          <p class="content-num">0 人</p>
          <p class="content-operate">添加新的人员库</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
// import api from '@/api';
// import config from '@/config';
 export default {
   name: 'Database',
   data () {
     return {
     };
   },
   async mounted () {
   }
 };
</script>

<style lang="scss" scoped>
.database-nav {
  margin: 50px;
  .database-add {
    width: 700px;
    height: 160px;
    border: 1px dashed #999;
    border-radius: 10px;
  }
  .detabase-add-icon {
    width: 120px;
    height: 120px;
    line-height: 120px;
    border-radius: 8px;
    border: 1px dashed #999;
    color: #999;
    font-size: 60px;
    cursor: pointer;
    float: left;
  }
  .detabase-add-content {
    float: left;
    text-align: left;
    margin-left: 20px;
    p {
      margin: 15px 0;
    }
  }
  .content-num {
    font-size: 26px;
    font-weight: bold;
  }
  .content-operate {
    font-size: 18px;
    color: #666;
  }
}
</style>
