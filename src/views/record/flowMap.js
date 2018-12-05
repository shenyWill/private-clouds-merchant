export default {
  option: {
    tooltip: {
      trigger: 'axis'
    },
    color: ['rgba(32,200,203,0.3)'], // 图和线条颜色
    toolbox: {
      show: true,
      feature: {
        mark: {
          show: true
        },
        dataView: {
          show: true,
          readOnly: false
        },
        magicType: {
          show: true,
          type: ['line', 'bar', 'stack', 'tiled']
        },
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    xAxis: [{
      type: 'category',
      boundaryGap: false,
      data: ['2017-11', '2017-12', '2018-01', '2018-02', '2018-03', '2018-04', '2018-05', '2018-06', '2018-07', '2018-08', '2018-09', '2018-10'],
      axisLine: {
        lineStyle: {
          color: '#008aff', // x轴颜色
          width: 3
        }
      },
      // 轴字体样式
      axisLabel: {
        interval: 0,
        rotate: 0,
        textStyle: {
          fontSize: 12,
          fontWeight: 100,
          color: '#000'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#eeeeee'
        }
      },
      axisTick: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      axisLine: {
        lineStyle: {
          color: '#008aff', // y轴颜色
          width: 3
        }
      },
      // 轴字体样式
      axisLabel: {
        interval: 0,
        rotate: 0,
        textStyle: {
          fontSize: 12,
          fontWeight: 100,
          color: '#000'
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      splitArea: {
        show: true,
        areaStyle: {
          color: [
            'rgba(248,248,248,1)',
            'rgba(255,255,255,1)'
          ]
        }
      }
    }],
    series: [{
        name: '黑名单',
        type: 'line',
        symbol: 'none',
        smooth: true,
        itemStyle: {
          normal: {
            areaStyle: {
              type: 'default'
            }
          }
        },
        data: [8600, 8726, 9101, 9001, 9576, 9438, 9915, 11002, 10386, 10012, 10002, 11563]
      }
    ],
    grid: {
      top: '40px',
      left: '60px',
      right: '10px'
    }
  }
};
