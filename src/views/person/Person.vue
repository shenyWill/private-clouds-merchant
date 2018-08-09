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
    <div class="person-nav">
      <!-- 添加新人员 -->
        <el-card class="person-add person-list">
          <div class="add-content">
            <i class="el-icon-plus"></i>
          </div>
          <p class="add-text">添加新人员</p>
        </el-card>
      <!-- 人员列表 -->
        <el-card class="person-list" v-for="item in personList" :key="item.id" @click.native="showPersonDetail(item.id)">
          <i class="el-icon-more"></i>
          <div class="list-content">
            <img :src="item.image" class="person-image">
            <p class="person-name">{{ item.name }}</p>
            <p class="person-position">{{ item.position }}</p>
            <p class="person-company">{{ item.company }}</p>
          </div>
        </el-card>
    </div>
    <!-- 分页 -->
    <el-pagination background layout="prev,pager,next" :total="count" class="paging" @current-change="handleCurrentChange"></el-pagination>
    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
import PersonDetail from '@/views/person/PersonDetail';
import api from '@/api';
import config from '@/config';
export default {
  name: 'Person',
  data () {
    return {
      searchForm: {},
      searchResult: {},
      personList: [], // 人员列表
      count: 0, // 人员数量
      personDetail: {}, // 个人详情
      dialogPersonDetail: false // 详情框是否显示
    };
  },
  components: {
    Search,
    PersonDetail
  },
  methods: {
    // 点击搜索
    searchSubmit () {
      this.searchResult = { ...this.searchForm };
    },
    // 请求
    async responseAPI (data) {
      const response = await api.post(config.person.list, data);
      if (Number(response.data.resCode) === 200) {
        this.count = response.data.size;
        this.personList = response.data.data;
      }
    },
    // 点击分页
    async handleCurrentChange (val) {
      this.responseAPI({pageSize: 19, page: val});
      this.scollTop(80);
    },
    // 回到顶部
    scollTop (val) {
      document.documentElement.scrollTop -= val;
      if (document.documentElement.scrollTop > 0) {
        var topTime = setTimeout(() => this.scollTop(val), 10);
      } else {
        clearTimeout(topTime);
      }
    },
    // 查看详情
    async showPersonDetail (id) {
      const response = await api.post(config.person.detail, {id: id});
      if (Number(response.data.resCode) === 200) {
        this.personDetail = response.data.data[0];
        this.dialogPersonDetail = true;
      }
    }
  },
  async mounted () {
    this.responseAPI({pageSize: 19});
  },
  watch: {
    searchResult: {
      handler (newVal, oldVal) {
        this.searchForm = { ...newVal };
        this.responseAPI(this.searchForm);
      },
      deep: true
    }
  }
};
</script>
<style>
.person-detail-show {
  border-radius: 15px;
}
</style>

<style lang="scss" scoped>
.search-form-box {
  margin: 30px 40px;
}
.person-nav {
  margin: 35px 0 5px 35px;
  overflow: hidden;
}
.person-list {
  width: 260px;
  height: 360px;
  border-radius: 10px;
  margin-right: 70px;
  margin-bottom: 65px;
  float: left;
  position: relative;
  overflow: hidden;
  &:nth-child(5n) {
    margin-right: 0;
  }
  .el-icon-more {
    position: absolute;
    color: #666666;
    right: 15px;
    top: 5px;
    cursor: pointer;
  }
  .list-content {
    margin: 30px 20px;
    width: 180px;
    overflow: hidden;
    text-align: center;
  }
  .person-image {
    width: 150px;
    height: 150px;
  }
  .person-name {
    font-size: 22px;
    margin-top: 5px;
    margin-bottom: 20px;
    color: #444;
    font-weight: bold;
  }
  .person-position {
    margin-top: 0;
    font-size: 14px;
    color: #666;
    font-weight: bold;
    margin-bottom: 5px;
  }
  .person-company {
    margin-top: 0;
    font-size: 14px;
    color: #666;
  }
}
.person-add {
  border: 1px dashed #999;
}
.add-content {
  margin: 0 auto;
  height: 120px;
  width: 120px;
  border: 1px dashed #999;
  border-radius: 15px;
  margin-top: 80px;
  line-height: 120px;
  font-size: 60px;
  color: #999;
  cursor: pointer;
}
.add-text {
  font-size: 18px;
  color: #666;
  font-weight: bold;
  margin-top: 25px;
}
.paging {
  display: block;
  margin-bottom: 40px;
}

</style>
