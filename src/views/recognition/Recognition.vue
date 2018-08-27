<template>
  <div class="recognition">
    <Search :searchResult='searchResult' :equipmentArr='equipmentArr' :databaseArr='databaseArr'>
      <el-form ref="search-form" :model="searchForm" slot="search-form" label-width="80px" class="search-form-box">
        <el-row>
          <el-col :span="5">
            <el-form-item label="姓名">
              <el-input v-model="searchForm.personnelName" size="small"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="5" :offset="3">
            <el-form-item label="库类型">
              <el-select v-model="searchForm.libraryTypeId" size="small">
                <el-option v-for="item in databaseArr" :key="item.id" :label="item.libraryTypeName" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="5">
            <el-form-item label="设备">
              <el-select v-model="searchForm.equipmentId" size="small" multiple>
                <el-option v-for="item in equipmentArr" :key="item.id" :label="item.equipmentName" :value="item.id"></el-option>
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
    <el-card class="recognition-card" v-if="recognitionList && recognitionList.length > 0">
      <div slot="header" class="clearfix">
        <span>人员识别</span>
      </div>
      <div v-for="item in recognitionList" :key="item.id" class="recognition-card-info">
        <div class="recognition-card-image">
          <img :src="recognitionUrl + item.imageUrl2" alt="" :onerror="`src='${recognitionUrl + item.imageUrl1}'`">
          <img :src="recognitionUrl + item.imageUrl1" alt="">
        </div>
        <div class="recognition-card-content">
          <p class="recognition-card-detail">
            <span class="detail-name">{{ item.personnelName }}</span>
            <span class="detail-position">{{ item.describe }}</span>
          </p>
          <p class="recognition-card-tag">
            <el-tag type="warning">{{ equipmentTypeName[item.equipmentType] }}</el-tag>
            <el-tag :type="item.libraryTypeName=='黑名单' ? 'danger' : 'success'">{{ item.libraryTypeName }}</el-tag>
          </p>
          <p class="recognition-card-equipment">
            <span class="equipment-name">设备名称： {{ item.equipmentName }}</span>
          </p>
        </div>
        <div class="recognition-card-simi">
          <span><i class="iconfont icon-xiangsidu-lan"> 相似度：{{ item.confidence }}%</i></span>
        </div>
        <div class="recognition-card-date">
          <span><i class="el-icon-time"> 比对时间：{{ item.createTime }}</i></span>
        </div>
        <div class="recognition-card-operation">
          <i class="iconfont icon-chakan-lan" @click="showPersonDetail(item.personnelId)"></i>
          <i class="iconfont icon-shibiejilu-lan" @click="showRecognitionDetail(item.personnelId, true)"></i>
        </div>
      </div>
    </el-card>
    <div v-else class="recognition__empty">
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
      <PersonDetail :personDetail="personDetail"></PersonDetail>
    </el-dialog>
    <!-- 比对详情 -->
    <el-dialog
      class="recognition-dialog-detail"
      :visible.sync="dialogRecognitionDetail"
      width="31%"
      custom-class="recognition-detail-show"
      title="比对详情"
      :lock-scroll="true">
      <RecognitionDetail :recognitionDetail="recognitionDetail" :recognitionDetailUrl="recognitionDetailUrl"></RecognitionDetail>
    </el-dialog>
  </div>
</template>

<script>
import Search from '@/views/search/Search';
import api from '@/api';
import config from '@/config';
import { scollTop, parseTime } from '@/utils';
import PersonDetail from '@/views/person/PersonDetail';
import RecognitionDetail from '@/views/recognition/RecognitionDetail';
export default {
  name: 'Recognition',
  data () {
    return {
      emptyImage: require('@/assets/image/empty.png'),
      searchForm: {},
      searchResult: {},
      recognitionList: [],
      count: 0,
      personDetail: {}, // 个人详情
      dialogPersonDetail: false, // 个人详情框是否显示,
      recognitionDetail: {}, // 比对详情
      dialogRecognitionDetail: false, // 比对详情框是否显示
      equipmentTypeName: ['人证比对机', '摄像头', '人脸识别门禁平板', '闸机', '门'], // 设备类型名称
      equipmentArr: [], // 设备集合
      currentPage: 1, // 当前页码
      databaseArr: [], // 库集合
      recognitionDetailTag: true, // 滚动的tag
      recognitionDetailId: '', // 当前对比详情ID
      recognitionOffset: 0, // 当前对比详情偏移量
      recognitionUrl: '', // 当前url
      recognitionDetailUrl: '' // 比对详情url
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
      const startTime = new Date(this.searchForm.startTime).getTime();
      const endTime = new Date(this.searchForm.endTime).getTime();
      if (startTime && endTime && (startTime > endTime)) {
        this.$message({type: 'error', message: '开始时间不能大于结束时间'});
        return;
      }
      this.searchForm.startTime && (this.searchForm.startTime = parseTime(this.searchForm.startTime));
      this.searchForm.endTime && (this.searchForm.endTime = parseTime(this.searchForm.endTime));
      this.searchResult = { ...this.searchForm };
    },
    // 请求
    async responseAPI (data = {}) {
      const response = await api.post(config.recognition.list, data);
      if (Number(response.data.code) === 0) {
        this.count = response.data.data.total;
        this.recognitionList = response.data.data.rows;
        this.recognitionUrl = response.data.url;
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
      const response = await api.post(config.person.detail, {personnelId: id});
      if (Number(response.data.code) === 0) {
        this.personDetail = response.data.data;
        this.dialogPersonDetail = true;
      }
    },
    // 查看比对详情
    async showRecognitionDetail (personnelId, tag) {
      if (tag) {
        this.recognitionOffset = 0;
        this.recognitionDetail = {};
        this.recognitionDetailId = personnelId;
      }
      const response = await api.post(config.recognition.compareDetail, {personnelId: this.recognitionDetailId, offset: this.recognitionOffset});
      if (Number(response.data.code) === 0) {
        for (let item in response.data.data) {
          this.$set(this.recognitionDetail, item, response.data.data[item]);
        }
        this.recognitionDetailUrl = response.data.url;
        this.recognitionDetail = Object.assign(this.recognitionDetail, response.data.data);
        this.recognitionOffset = response.data.offset;
        this.dialogRecognitionDetail = true;
        setTimeout(() => {
          this.recognitionDetailTag = true;
        }, 2000);
      }
    },
    // 滚动条再次调用
    detailScroll () {
      if (!document.getElementsByClassName('recognition-detail-show')[0]) return;
      document.getElementsByClassName('recognition-detail-show')[0].onscroll = () => {
        let _self = document.getElementsByClassName('recognition-detail-show')[0];
        let distance = _self.scrollHeight - _self.scrollTop - _self.clientHeight;
        if (distance < 100 && this.recognitionDetailTag === true) {
          this.recognitionDetailTag = false;
          this.showRecognitionDetail(this.recognitionDetailId);
        }
      };
    }
  },
  async mounted () {
    this.responseAPI({limit: 10, offset: 0});
    let response = await api.post(config.device.all, {});
    if (Number(response.data.code) === 0) {
      this.equipmentArr = response.data.data.rows;
    }
    let databaseRes = await api.post(config.database.typeList, {});
    if (Number(databaseRes.data.code) === 0) {
      this.databaseArr = databaseRes.data.data.dataList;
    }
    this.detailScroll();
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
     font-size: 28px;
     margin-left: 30px;
     cursor: pointer;
   }
 }
</style>

<style lang="scss">
 .recognition-card .el-card__body {
   padding: 0;
   margin: 0;
 }
 .recognition-detail-show {
   position: relative;
   text-align: left;
   border-radius: 15px;
   height: 700px;
   overflow-y: auto;
   .el-dialog {
     border-radius: 20px;
   }
 }
 .recognition-dialog-detail {
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
 .recognition .el-dialog__wrapper {
   overflow: hidden;
 }
 .recognition__empty {
   font-size: 20px;
   font-weight: bold;
   margin-top: 180px;
   margin-bottom: 40px;
 }
</style>
