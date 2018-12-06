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
      data: ['白名单', '黑名单', '访客', '其他'], // 导航栏字样，与数据对应
      textStyle: {
        color: '#000'
      },
      x: 'right',
      icon: 'line'
    },
    color: ['rgba(32,200,203,0.3)', 'rgba(182,162,222,0.3)', 'rgba(255,0,255,0.6)', 'rgba(0,255,136,0.6)'], // 图和线条颜色
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
      data: [],
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
        name: '白名单',
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
        data: []
      },
      {
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
        data: []
      },
      {
        name: '访客',
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
        data: []
      },
      {
        name: '其他',
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
        data: []
      }
    ],
    grid: {
      top: '40px',
      left: '60px',
      right: '10px'
    }
  }
};
