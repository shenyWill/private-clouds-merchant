<template>
  <div class="recognition">
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
    <el-card class="recognition-card">
      <div slot="header" class="clearfix">
        <span>人员识别</span>
      </div>
      <div v-for="item in recognitionList" :key="item.id" class="recognition-card-info">
        <div class="recognition-card-image">
          <img :src="item.image" alt="">
          <img :src="item.image" alt="">
        </div>
        <div class="recognition-card-content">
          <p class="recognition-card-detail">
            <span class="detail-name">{{ item.name }}</span>
            <span class="detail-position">{{ item.position }}</span>
          </p>
          <p class="recognition-card-tag">
            <el-tag type="warning">{{ item.type }}</el-tag>
            <el-tag :type="item.ipStatus=='黑名单' ? 'danger' : 'success'">{{ item.ipStatus }}</el-tag>
          </p>
          <p class="recognition-card-equipment">
            <span class="equipment-name">设备名称： {{ item.equipmentName }}</span>
          </p>
        </div>
        <div class="recognition-card-simi">
          <span><i class="el-icon-refresh"> 相似度：{{ item.simi }}%</i></span>
        </div>
        <div class="recognition-card-date">
          <span><i class="el-icon-time"> 比对时间：{{ item.startDate }}</i></span>
        </div>
        <div class="recognition-card-operation">
          <i class="el-icon-view" @click="showPersonDetail(item.id)"></i>
          <i class="el-icon-service" @click="showRecognitionDetail(item.id)"></i>
        </div>
      </div>
    </el-card>
    <!-- 分页 -->
    <el-pagination background layout="prev,pager,next" :total="count" class="paging" @current-change="handleCurrentChange"></el-pagination>
    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>
    <!-- 比对详情 -->
    <el-dialog :visible.sync="dialogRecognitionDetail" width="30%" custom-class="recognition-detail-show" title="比对详情">
      <RecognitionDetail :recognitionDetail="recognitionDetail"></RecognitionDetail>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
import api from '@/api';
import config from '@/config';
import { scollTop } from '@/utils';
import PersonDetail from '@/views/person/PersonDetail';
import RecognitionDetail from '@/views/recognition/RecognitionDetail';
export default {
  name: 'Recognition',
  data () {
    return {
      searchForm: {},
      searchResult: {},
      recognitionList: [],
      count: 0,
      personDetail: {}, // 个人详情
      dialogPersonDetail: false, // 个人详情框是否显示,
      recognitionDetail: [], // 比对详情
      dialogRecognitionDetail: false // 比对详情框是否显示
    };
  },
  components: {
    Search,
    PersonDetail,
    RecognitionDetail
  },
  methods: {
    // 点击搜索
    searchSubmit () {
      this.searchResult = { ...this.searchForm };
    },
    // 请求
    async responseAPI (data = {}) {
      const response = await api.post(config.recognition.list, data);
      if (Number(response.data.resCode) === 200) {
        this.count = response.data.size;
        this.recognitionList = response.data.data;
      }
    },
    // 分页
    handleCurrentChange (val) {
      this.responseAPI({pageSize: 9, page: val});
      scollTop(80);
    },
    // 查看个人详情
    async showPersonDetail (id) {
      const response = await api.post(config.recognition.detail, {id: id});
      if (Number(response.data.resCode) === 200) {
        this.personDetail = response.data.data[0];
        this.dialogPersonDetail = true;
      }
    },
    // 查看比对详情
    async showRecognitionDetail (id) {
      const response = await api.post(config.recognition.compareDetail, {id: id});
      if (Number(response.data.resCode) === 200) {
        this.recognitionDetail = response.data.data;
        this.dialogRecognitionDetail = true;
      }
    }
  },
  mounted () {
    this.responseAPI();
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

<style lang="scss" scoped>
.search-form-box {
  margin: 30px 40px;
}
.recognition-card {
  text-align: left;
  margin: 30px 40px;
  .clearfix {
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    color: #555;
  }
}
.recognition-card-info {
  height: 159px;
  box-sizing: border-box;
  border-bottom: 1px solid #dcdcdc;
  overflow: hidden;
  padding: 20px;
}
.recognition-card-image {
  height: 100%;
  width: 260px;
  overflow: hidden;
  float: left;
  img {
    height: 120px;
    width: 120px;
    border-radius: 10px;
  }
}
.recognition-card-content {
  height: 100%;
  width: 400px;
  float: left;
  margin-left: 20px;
  p {
    margin: 8px 0 0px 0;
  }
  .recognition-card-detail {
    height: 21px;
    line-height: 21px;
    font-size: 21px;
    color: #333;
    font-weight: bold;
  }
  .detail-name {
    display: inline-block;
    padding-right: 11px;
    position: relative;
    box-sizing: border-box;
    &::before {
      content: '';
      position: absolute;
      display: block;
      height: 100%;
      width: 2px;
      background-color: #333;
      right: 0;
    }
  }
  .detail-position {
    font-size: 18px;
  }
  .recognition-card-equipment {
    height: 18px;
    line-height: 18px;
    color: #666;
    font-size: 16px;
    margin-top: 15px;
  }
}
.recognition-card-simi,.recognition-card-date,.recognition-card-operation {
  height: 100%;
  width: 200px;
  float: left;
  margin-left: 20px;
  line-height: 120px;
  overflow: hidden;
  font-size: 16px;
  color: #666;
}
.recognition-card-date {
  width: 380px;
}
.recognition-card-operation {
  color: #008aff;
  font-weight: bold;
  font-size: 30px;
  text-align: right;
  i {
    margin-left: 20px;
    cursor: pointer;
  }
}
</style>

<style>
.recognition-card .el-card__body {
  padding: 0;
  margin: 0;
}
.recognition-detail-show {
  text-align: left;
  border-radius: 15px;
}
</style>
