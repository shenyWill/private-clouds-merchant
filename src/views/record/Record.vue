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
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import menu from './config';
import dataMap from './dataMap.js';
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
      timeActiveList: [true, false, false, false, false]
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
    }
  },
  mounted () {
    this.user && (this.deviceList = [...this.user.equipmentList]);
    this.drawMap('data-map', dataMap.option);
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
.data-statistics,.equipment-statistics,.recognition-statistics {
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
</style>
