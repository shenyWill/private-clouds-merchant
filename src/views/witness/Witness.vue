<template>
  <div class="witness">
    <Search :searchResult='searchResult' :equipmentArr='equipmentArr'>
      <el-form ref="search-form" :model="searchForm" slot="search-form" label-width="80px" class="search-form-box">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.personnelName" size="small"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="设备">
              <el-select v-model="searchForm.equipmentId" size="small" multiple>
                <el-option v-for="item in equipmentArr" :key="item.equipmentId" :label="item.equipmentName" :value="item.equipmentId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="3">
            <el-form-item label="比对时间">
              <el-date-picker v-model="searchForm.startTime" type="datetime" placeholder="请选择起始时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="至" label-width="40px">
              <el-date-picker v-model="searchForm.endTime" type="datetime" placeholder="请选择终止时间" size="small"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8">
            <el-form-item label="相似度">
              <el-slider v-model="searchForm.confidence" :min="0" :max="100" class="search-slider"></el-slider>
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
    <el-card class="witness-card" v-if="witnessList && witnessList.length > 0">
      <div slot="header" class="clearfix">
        <span>比对记录</span>
      </div>
      <div v-for="item in witnessList" :key="item.id" class="witness-card-info">
        <div class="witness-card-image">
          <img :src="item.imageUrl2 ? (witnessUrl + item.imageUrl2) : ''" alt="" :onerror="`src='${errorImage}'`">
          <img :src="item.imageUrl1 ? (witnessUrl + item.imageUrl1) : ''" alt="" :onerror="`src='${errorImage}'`">
        </div>
        <div class="witness-card-content">
          <p class="witness-card-detail">
            <span class="detail-name">{{ item.personnelName }}</span>
            <span class="detail-position">{{ item.personnelSex }}</span>
          </p>
          <p class="witness-card-id">
              <span class="id-info">身份证号：{{item.personnelIdnum}}</span>
          </p>
          <p class="witness-card-result">
            <span class="result-success">比对结果：<span :class="item.recognitionType==0 ? 'is-success': 'is-error'">{{ item.recognitionType == 0 ? '比对成功' : '比对失败' }}</span> </span>
            <span class="result-equipment">设备名称： {{item.equipmentName}}</span>
            <span class="result-time">比对时间：{{item.recognitionTime}}</span>
          </p>
        </div>
        <div class="witness-card-operation">
          <i class="iconfont icon-chakan-lan" @click="showPersonDetail(item.personnelId)"></i>
        </div>
      </div>
    </el-card>
    <div v-else class="witness__empty">
      <img :src="emptyImage">
      <div>
        暂无数据
      </div>
    </div>
    <!-- 分页 -->
    <el-pagination
      v-if="count > 10"
      background
      layout="prev,pager,next"
      :current-page.sync="currentPage"
      :total="count"
      class="paging"
      @current-change="handleCurrentChange">
    </el-pagination>
    <!-- 显示详情 -->
    <el-dialog :visible.sync="dialogPersonDetail" width="25%" custom-class="person-detail-show">
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
import api from '@/api';
import config from '@/config';
import { scollTop, parseTime } from '@/utils';
import { mapGetters } from 'vuex';
export default {
  name: 'Recognition',
  data () {
    return {
      emptyImage: require('@/assets/image/empty.png'),
      errorImage: require('@/assets/image/timg.jpg'),
      searchForm: {},
      searchResult: {},
      witnessList: [],
      count: 0,
      personDetail: {}, // 个人详情
      dialogPersonDetail: false, // 个人详情框是否显示,
      equipmentArr: [], // 设备集合
      currentPage: 1, // 当前页码
      witnessUrl: '' // 当前url
    };
  },
  components: {
    Search
  },
  methods: {
    // 点击搜索
    searchSubmit () {
      const startTime = new Date(this.searchForm.startTime).getTime();
      const endTime = new Date(this.searchForm.endTime).getTime();
      if (startTime && endTime && (startTime > endTime)) {
        this.$message({type: 'error', message: '开始时间不能大于结束时间'});
        return;
      }
      this.searchForm.startTime && (this.searchForm.startTime = parseTime(this.searchForm.startTime).replace(new RegExp(/-/gm), '/'));
      this.searchForm.endTime && (this.searchForm.endTime = parseTime(this.searchForm.endTime).replace(new RegExp(/-/gm), '/'));
      this.searchResult = { ...this.searchForm };
    },
    // 请求
    async responseAPI (data = {}) {
      const response = await api.post(config.witness.list, data);
      if (Number(response.data.code) === 200) {
        this.count = response.data.data.total;
        this.witnessList = response.data.data.rows;
        this.witnessUrl = response.data.url;
      }
    },
    // 分页
    handleCurrentChange (val) {
      let Num = (val - 1) * 10;
      let requestObj = {...this.searchForm};
      if (requestObj.startTime && !requestObj.endTime) {
        requestObj.endTime = parseTime(new Date());
      }
      if (!requestObj.startTime && requestObj.endTime) {
        requestObj.startTime = parseTime(new Date(1970));
      }
      requestObj.limit = 10;
      requestObj.offset = Num;
      this.responseAPI(requestObj);
      scollTop(80);
    },
    // 查看个人详情
    async showPersonDetail (id) {
    }
  },
  async mounted () {
    this.responseAPI({limit: 10, offset: 0});
    this.user && (this.equipmentArr = this.user.equipmentList);
  },
  watch: {
    searchResult: {
      // 搜索发送请求
      handler (newVal, oldVal) {
        this.searchForm = {
          ...newVal,
          equipmentId: newVal.equipmentId ? newVal.equipmentId : []
        };
        let requestObj = {...newVal};
        if (requestObj.startTime && !requestObj.endTime) {
          requestObj.endTime = parseTime(new Date());
        }
        if (!requestObj.startTime && requestObj.endTime) {
          requestObj.startTime = parseTime(new Date(1970));
        }
        requestObj.limit = 10;
        requestObj.offset = 0;
        this.currentPage = 1;
        this.responseAPI(requestObj);
      },
      deep: true
    },
    user: {
        handler (newVal) {
            this.equipmentArr = newVal.equipmentList;
        },
        deep: true
    }
  },
  computed: {
  ...mapGetters([
      'user'
      ])
  }
};
</script>

<style lang="scss" scoped>
 .search-form-box {
   margin: 30px 40px;
 }
 .witness-card {
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
 .witness-card-info {
   height: 159px;
   box-sizing: border-box;
   border-bottom: 1px solid #dcdcdc;
   overflow: hidden;
   padding: 20px;
 }
 .witness-card-image {
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
 .witness-card-content {
   height: 100%;
   float: left;
   margin-left: 20px;
   p {
     margin: 8px 0 0px 0;
   }
   .witness-card-detail {
     height: 21px;
     line-height: 21px;
     font-size: 21px;
     color: #333;
     font-weight: bold;
     margin-bottom: 30px;
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
   .witness-card-result,.witness-card-id {
     height: 18px;
     line-height: 18px;
     color: #666;
     font-size: 16px;
     margin-top: 15px;
   }
   .witness-card-result>span {
       margin-right: 90px;
   }
   .is-success {
       color: #00cc66;
   }
   .is-error {
       color: #ff0000;
   }
 }
 .witness-card-operation {
   color: #008aff;
   font-weight: bold;
   font-size: 30px;
   text-align: right;
   i {
     font-size: 28px;
     margin-left: 30px;
     cursor: pointer;
     font-weight: normal;
   }
 }
</style>

<style lang="scss">
 .witness-card .el-card__body {
   padding: 0;
   margin: 0;
 }
 .witness-detail-show {
   position: relative;
   text-align: left;
   border-radius: 15px;
   height: 700px;
   overflow-y: auto;
   .el-dialog {
     border-radius: 20px;
   }
 }
 .witness-dialog-detail {
   .el-dialog {
     position: relative;
     .el-dialog__header {
       position: sticky;
       top: 0;
       height: 30px;
       background-color: #fff;
       border-radius: 20px;
       z-index: 1;
     }
     .el-dialog__title {
       font-size: 20px;
       font-weight: bold;
     }
     .el-dialog__close {
       font-size: 32px;
     }
   }
 }
 .witness .el-dialog__wrapper {
   overflow: hidden;
 }
 .witness__empty {
   font-size: 20px;
   font-weight: bold;
   margin-top: 180px;
   margin-bottom: 40px;
 }
</style>
