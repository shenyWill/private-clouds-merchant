export default {
  option: {
    title: {
      // text: '某楼盘销售情况',
      // subtext: '纯属虚构'
    },
    tooltip: {
      trigger: 'axis'
    },
    legend: {
      data: ['摄像头', '门禁', '警务终端', '认证机'], // 导航栏字样，与数据对应
      textStyle: {
        color: '#fff'
      },
      icon: 'line'
    },
    color: ['rgba(187,148,17,0.6)', 'rgba(255,0,0,0.6)', 'rgba(255,0,255,0.6)', 'rgba(0,255,136,0.6)'], // 图和线条颜色
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
          color: '#00fcfc' // x轴颜色
        }
      },
      // 轴字体样式
      axisLabel: {
        interval: 0,
        rotate: 40,
        textStyle: {
          fontSize: 12,
          fontWeight: 100
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#37387f'
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
          color: '#00fcfc' // x轴颜色
        }
      },
      splitLine: {
        show: false
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
        name: '摄像头',
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
        data: [10, 12, 21, 54, 260, 830, 710, 823, 125, 456, 123, 456]
      },
      {
        name: '门禁',
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
        data: [30, 182, 434, 791, 390, 30, 10, 568, 515, 252, 120, 452]
      },
      {
        name: '警务终端',
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
        data: [1320, 1132, 601, 234, 120, 90, 20, 123, 450, 123, 256, 852]
      },
      {
        name: '认证机',
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
        data: [580, 0, 120, 956, 356, 280, 1200, 23, 598, 125, 888, 123]
      }
    ],
    grid: {
      top: '40px'
    }
  }
};
