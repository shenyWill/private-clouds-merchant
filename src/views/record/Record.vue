<template>
    <div class="record">
        <!-- 数据统计 -->
        <div class="data-statistics">
            <h2 class="data-statistics-title">数据统计</h2>
            <div class="data-statistics-screen">
                <el-form :inline="true" :model="screenObj" class="screen-form">
                    <el-form-item label="摄像头">
                        <el-select v-model="screenObj.equipmentList" placeholder="全部" multiple size="mini">
                            <el-option v-for="item in deviceList" :key="item.equipmentId" :value="item.equipmentId" :label="item.equipmentName"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="统计时间">
                        <el-date-picker v-model="screenObj.date" type="daterange" range-separator="至" start-placeholde="开始时间" end-placeholde="结束时间"></el-date-picker>
                    </el-form-item>
                </el-form>
                <span v-for="(item, index) in timeList" :key="item.id" :class="['screen-time-list', timeActiveList[index] ? 'active' : '']" @click="changeRecordTime(item, index)">{{item.label}}</span>
            </div>
            <div class="data-statistics-draw">
                <div id="data-map" class="data-map"></div>
            </div>
        </div>
        <!-- 设备数 -->
        <div class="equipment-statistics">
            <EquipmentStatistics @drawMap="drawMap"></EquipmentStatistics>
        </div>
        <!-- 识别数 -->
        <div class="recognition-statistics">
            <RecognitionStatistics @drawMap="drawMap"></RecognitionStatistics>
        </div>
        <!-- 统计表格 -->
        <div class="statistics-table">
            <ul class="table-title-nav">
                <li v-for="item in tableTitleList" :key="item" class="table-title-list">{{item}}</li>
            </ul>
            <ul :class="['table-info-nav', childActiveList[index] ? 'active' : '']" v-for="(item, index) in tableList" :key="item.id">
                <li class="table-info-list" @click="openChildTable(item, index)">{{index}}</li>
                <li class="table-info-list" @click="openChildTable(item, index)">{{item.equipmentName}}</li>
                <li class="table-info-list" @click="openChildTable(item, index)">{{item.personnelName}}</li>
                <li class="table-info-list" @click="openChildTable(item, index)">{{item.personnelName}}</li>
                <li class="table-info-list" @click="openChildTable(item, index)">{{item.personnelName}}</li>
                <li class="table-info-list" @click="openChildTable(item, index)">{{item.personnelName}}</li>
                <!-- 子表格 -->
                <div class="child-table" v-if="childActiveList[index]">
                    <ul class="child-table-title-nav">
                        <li v-for="item in childTableTitleList" :key="item" class="child-table-title-list">{{item}}</li>
                    </ul>
                    <ul class="child-table-info-nav" v-for="childItem in childTableList" :key="childItem && childItem.id">
                        <li class="child-table-info-list">{{childItem && childItem.recognitionTime && childItem.recognitionTime.split(' ')[1]}}</li>
                        <li class="child-table-info-list">{{childItem && childItem.personnelName}}</li>
                        <li class="child-table-info-list">{{childItem && childItem.personnelName}}</li>
                        <li class="child-table-info-list">{{childItem && childItem.personnelName}}</li>
                        <li class="child-table-info-list">{{childItem && childItem.personnelName}}</li>
                    </ul>
                </div>
            </ul>
            <!-- 分页 -->
            <el-pagination
            background
            layout="prev, pager, next"
            v-if="count > 9"
            :total="count"
            :current-page.sync="currentPage"
            class="paging"
            @current-change="handleCurrentChange"
            prev-text="上一页"
            next-text="下一页"
            ></el-pagination>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import menu from './config';
import dataMap from './dataMap.js';
import api from '@/api';
import config from '@/config';
import EquipmentStatistics from './EquipmentStatistics.vue';
import RecognitionStatistics from './RecognitionStatistics.vue';
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/line');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  data () {
    return {
      screenObj: {}, // 数据统计的筛选条件
      deviceList: [],
      tableTitleList: ['序号', '摄像头名称', '黑名单', '白名单', '访客', '其他'],
      childTableTitleList: ['日期', '黑名单', '白名单', '访客', '其他'],
      timeActiveList: [true, false, false, false, false],
      childActiveList: [], // 是否展开子表格
      tableList: [], // 列表中的统计数据
      childTableList: [], // 子表格中的统计数据
      count: 0,
      childCount: 0,
      currentPage: 1
    };
  },
  computed: {
    ...mapGetters(['user']),
    timeList () {
      return [...menu];
    }
  },
  methods: {
    // 切换筛选时间段
    changeRecordTime (val, count) {
      this.timeActiveList.forEach((item, index) =>
        this.$set(this.timeActiveList, index, index === count)
      );
    },
    // 画图
    drawMap (element, data) {
      let myChart = echarts.init(document.getElementById(element));
      myChart.setOption(data);
    },
    // 列表展示
    async responseAPI (data = {}) {
        const response = await api.post(config.witness.list, data);
        if (Number(response.data.code) === 200) {
            this.count = response.data.data.total;
            this.tableList = response.data.data.rows;
        }
    },
    // 子表格展示
    async childResponseAPI (data = {}) {
        const response = await api.post(config.witness.list, data);
        if (Number(response.data.code) === 200) {
            this.childCount = response.data.data.total;
            this.childTableList = response.data.data.rows;
        }
    },
    // 展开子表格
    async openChildTable (item, index) {
        this.childActiveList.forEach((item, allindex) => (index !== allindex && (this.childActiveList[allindex] = false)));
        this.$set(this.childActiveList, index, !this.childActiveList[index]);
        if (this.childActiveList[index]) {
            this.childResponseAPI();
        } else {
            this.childCount = 0;
            this.childTableList = [];
        }
    },
    // 关闭子表格
    async closeChildTable () {
        this.childActiveList = this.childTableList = [];
        this.childCount = 0;
    },
    // 分页
    handleCurrentChange (val) {
        this.responseAPI({offset: val * 10});
        this.closeChildTable();
    }
  },
  mounted () {
    this.user && (this.deviceList = [...this.user.equipmentList]);
    this.drawMap('data-map', dataMap.option);
    this.responseAPI();
  },
  watch: {
    user: {
      handler (newVal) {
        this.deviceList = newVal.equipmentList;
      },
      deep: true
    }
  },
  components: {
    EquipmentStatistics,
    RecognitionStatistics
  }
};
</script>

<style lang="scss" scoped>
.data-statistics,.equipment-statistics,.recognition-statistics,.statistics-table {
  background-color: #fff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  text-align: left;
  color: #333333;
  overflow: hidden;
  border-radius: 6px;
}
.data-statistics {
  margin: 40px 50px 10px 50px;
  .data-statistics-title {
    font-size: 18px;
    text-indent: 40px;
    line-height: 45px;
    height: 45px;
    border-bottom: 1px solid #e5e5e5;
  }
  .data-statistics-screen {
    margin: 30px 80px 20px 40px;
    background-color: #eeeeee;
    height: 140px;
    border-radius: 6px;
    padding: 25px 40px;
    box-sizing: border-box;
  }
  .screen-time-list {
    display: inline-block;
    width: 70px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin-right: 30px;
    border-radius: 8px;
    font-size: 14px;
    cursor: pointer;
    border: 1px solid #008aff;
    color: #008aff;
    background-color: #fff;
    &.active {
      color: #fff;
      background-color: #008aff;
    }
  }
  .data-statistics-draw{
      height: 450px;
      width: 100%;
      padding: 10px 80px 20px 40px;
      box-sizing: border-box
  }
  .data-map {
      height: 450px;
      width: 100%;
  }
}
// 设备统计
.equipment-statistics {
    height: 500px;
    width: 768px;
    margin: 0 10px 10px 50px;
    float: left;
}

// 识别数
.recognition-statistics {
    height: 500px;
    width: 768px;
    float: left;
}
// 统计表格
.statistics-table {
    margin: 40px 50px 10px 50px;
    min-width: 900px;
    padding: 50px 40px;
    ul,li {
        list-style: none;
    }
    .table-title-nav,.table-info-nav,.child-table-title-nav,.child-table-info-nav {
        height: 60px;
        width: 100%;
        overflow: hidden;
        margin: 0;
        padding: 0;
        background-color: #f8f8f8;
        border: 1px solid #e5e5e5;
        font-size: 16px;
        font-weight: bold;
    }
    .table-title-list,.table-info-list,.child-table-title-list,.child-table-info-list {
        height: 60px;
        line-height: 60px;
        float: left;
        text-align: center;
        border-right: 1px solid #e5e5e5;
        width: 275px;
        cursor: pointer;
        &:first-child {
            width: 80px;
        }
        &:last-child {
            border-right: 0;
        }
    }
    .table-info-nav,.child-table-info-nav {
        background-color: #fff;
        border-top: 0;
        font-weight: normal;
        transition: all 0.5s;
        position: relative;
        &:nth-child(2n + 1) {
            background-color: #f8f8f8;
        }
        &.active {
            height: 782px;
            background: #cce8ff;
            color: #008aff;
            border: 1px solid #008aff;
        }
    }
    .paging {
        margin-top: 40px;
        text-align: center;
    }
}
// 子表格
.child-table {
    height: 720px;
    min-width: 900px;
    transition: all 2s;
    width: 100%;
    top: 60px;
    left: 0;
    position: absolute;
    border-top: 1px solid #008aff;
    background-color: #fff;
    box-sizing: border-box;
    padding: 30px;
    .child-table-title-list {
        width: 20%;
        box-sizing: border-box;
        color: #333;
        &:first-child {
            width: 20%;
        }
    }
    .child-table-info-list {
        border: 0;
        width: 20%;
        color: #666;
        &:first-child {
            width: 20%;
        }
    }
}
</style>

<style lang="scss">
.data-statistics {
  .el-select__tags span {
    overflow: hidden;
    white-space: nowrap;
  }
  .el-form-item__label {
    font-weight: bold;
    color: #333333;
  }
  .el-form-item {
    margin-right: 80px;
    margin-bottom: 15px;
  }
}
.record .statistics-table {
    .paging .number,.paging .btn-next,.paging .btn-prev,.paging .more {
        box-shadow: 3px 3px 2px 0 rgba(0, 0, 0, 0.2);
        height: 40px;
        border-radius: 4px;
        background-color: #fff;
    }
    .paging .number,.paging .more {
        width: 40px;
        line-height: 40px;
    }
    .btn-next,.btn-prev {
        width: 80px;
        font-weight: bold;
    }
}
</style>
