<template>
  <div class="person">
    <Search :searchResult='searchResult'>
      <el-form ref="search-form" :model="searchForm" slot="search-form" label-width="60px" class="search-form-box">

        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.name" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" :offset="3">
            <el-form-item label="库类型">
              <el-select v-model="searchForm.type" size="small">
                <el-option label="类型一" value="one"></el-option>
                <el-option label="类型二" value="two"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="设备">
              <el-select v-model="searchForm.config" size="small">
                <el-option label="设备一" value="one"></el-option>
                <el-option label="设备二" value="two"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="3">
            <el-form-item label="比对时间">
              <el-date-picker v-model="searchForm.startDate" type="datetime" placeholder="请选择开始时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="至" label-width="40px">
              <el-date-picker v-model="searchForm.endDate" type="datetime" placeholder="请选择结束时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="相似度">
              <el-slider v-model="searchForm.slider" :min="60" :max="100" class="search-slider"></el-slider>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="3" :offset="21">
            <el-form-item>
              <el-button type="primary" @click="searchSubmit">搜 索</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </Search>
    <el-col :span="8">
      <el-card class="person-add">
        <div class="add-content"><i class="el-icon-plus"></i></div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
export default {
  name: 'Person',
  data () {
    return {
      searchForm: {},
      searchResult: {}
    };
  },
  components: {
    Search
  },
  methods: {
    // 点击搜索
    searchSubmit () {
      this.searchResult = {...this.searchForm};
    },
    // 请求
    responseAPI (data) {
      // console.log(data);
    }
  },
  watch: {
    searchResult: {
      handler (newVal, oldVal) {
        this.searchForm = {...newVal};
        this.responseAPI(this.searchForm);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.search-form-box {
  margin: 30px 40px;
}
.person-add {
  width: 250px;
  height: 300px;
  margin-left: 40px;
  border-radius: 10px;
}
.add-content {
  margin: 0 auto;
  height: 150px;
  width: 150px;
  border: 1px dashed #666;
  border-radius: 15px;
  margin-top: 50px;
  line-height: 150px;
  font-size: 60px;
  color: #999;
}
</style>
