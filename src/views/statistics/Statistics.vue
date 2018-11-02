<template>
    <div class="statistics">
        <div class="statistics-left">
            <div class="statistics-recognition">
                <div id="recognition-map" class="recognition-map"></div>
            </div>
            <div class="statistics-compare">
                <div id="compare-map" class="compare-map"></div>
            </div>
        </div>
        <div class="statistics-center">
            <img :src="mapBgImg" alt="" class="statistics-center-map">
            <div class="statistics-count">
                <span class="recognition-count">{{snapTotal}}</span>
                <span class="compare-count">{{compareTotal}}</span>
            </div>
        </div>
        <div class="statistics-right">
            <div class="statistics-age">
                <div id="age-map" class="age-map"></div>
            </div>
            <div class="statistics-sex">
                <div id="sex-map" class="sex-map"></div>
            </div>
        </div>
    </div>
</template>
<script>
import recognitionOption from './recognitionOption.js';
import compareOption from './compareOption.js';
import ageOption from './ageOption.js';
import sexOption from './sexOption.js';
import config from '@/config';
import Socket from '@/api/Socket';
let echarts = require('echarts/lib/echarts');
require('echarts/lib/chart/bar');
require('echarts/lib/chart/radar');
require('echarts/lib/chart/pie');
require('echarts/lib/chart/line');
require('echarts/lib/component/legend');
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
  data () {
    return {
      mapBgImg: require('@/assets/image/recognition-map.gif'),
      snapTotal: 12530,
      compareTotal: 8610
    };
  },
  methods: {
    drawMap (element, data) {
      let myChart = echarts.init(document.getElementById(element));
      myChart.setOption(data);
    },
    subscribeSocket () {
      if (this.socketConnected) {
        this.initSocket(config.socketURL);
      } else {
        this.$store.subscribe((mutation, state) => {
          if (mutation.type === 'CONNECT_SOCKET') {
            this.initSocket(config.socketURL);
          }
        });
      }
    },
    initSocket (url) {
       this.socket = Socket.init(url);
       this.socket.subscribe('/face/recognition', response => {
         const data = JSON.parse(response.body);
         this.snapTotal = data.snapTotal;
         this.compareTotal = data.compareTotal;
         var randomNum = parseInt(Math.random() * 10);
         if (randomNum < 3) {
             compareOption.option.series[0].data[0] += 1;
         } else if (randomNum < 6) {
             compareOption.option.series[0].data[4] += 1;
         } else {
             compareOption.option.series[0].data[randomNum] += 1;
         }
         this.drawMap('compare-map', compareOption.option);
       });
     }
  },
  mounted () {
    this.drawMap('recognition-map', recognitionOption.option);
    this.drawMap('compare-map', compareOption.option);
    this.drawMap('age-map', ageOption.option);
    this.drawMap('sex-map', sexOption.option);
    this.subscribeSocket();
  }
};
</script>

<style lang="scss" scoped>
.statistics {
  position: relative;
  overflow: hidden;
  height: 1050px;
  font-size: 16px;
  background: url(../../assets/image/statistics-bg.png) no-repeat center;
  background-size: 100% 100%;
  margin: 20px 30px;
  // left
  .statistics-left,
  .statistics-right {
    width: 500px;
    height: 930px;
    overflow: hidden;
    float: left;
    margin: 60px 0 20px 40px;
  }
  .statistics-recognition,
  .statistics-compare,
  .statistics-age,
  .statistics-sex {
    width: 490px;
    height: 455px;
    margin-bottom: 20px;
    background-size: 100% 100%;
    padding: 80px 0 0 30px;
    box-sizing: border-box;
  }
  .statistics-recognition {
    background-image: url(../../assets/image/recognition-bg.png);
  }
  .statistics-compare {
    background-image: url(../../assets/image/compare-bg.png);
  }
  .recognition-map {
    width: 465px;
    height: 380px;
  }
  .compare-map {
    width: 470px;
    height: 370px;
  }
  .age-map {
    width: 455px;
    height: 370px;
  }
  .sex-map {
    width: 455px;
    height: 370px;
  }
  // center
  .statistics-center {
    width: 720px;
    height: 950px;
    overflow: hidden;
    float: left;
    margin: 80px 0 20px 10px;
  }
  .statistics-center-map {
    width: 98%;
    height: 80%;
  }
  .statistics-count {
    width: 100%;
    background-image: url(../../assets/image/recognition-count.png);
    background-size: 100% 100%;
    height: 165px;
    margin-top: 15px;
    overflow: hidden;
    color: #00ffff;
    font-size: 55px;
    position: relative;
  }
  .recognition-count,
  .compare-count {
    position: absolute;
    top: 70px;
  }
  .recognition-count {
    left: 48px;
  }
  .compare-count {
    right: 45px;
  }
  .statistics-right {
    margin: 60px 40px 20px 20px;
  }
  .statistics-age {
    background-image: url(../../assets/image/age-bg.png);
  }
  .statistics-sex {
    background-image: url(../../assets/image/sex-bg.png);
  }
}
</style>
