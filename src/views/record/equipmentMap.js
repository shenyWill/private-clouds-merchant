export default {
  option: {
    tooltip: {
      trigger: 'axis',
      axisPointer: { // 坐标轴指示器，坐标轴触发有效
        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['人证比对机', '摄像头', '人脸识别门禁平板', '闸机', '门']
    },
    color: ['#20c8cb', '#b6a2de', '#d87a80', '#ffb980', '#5ab1ef'],
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
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#008aff', // y轴颜色
          width: 3
        }
      },
      axisLabel: {
        textStyle: {
          color: 'rgba(0,0,0,0)'
        }
      },
      axisTick: {
        show: false
      }
    }],
    yAxis: [{
      type: 'category',
      data: ['统计'],
      axisLine: {
        lineStyle: {
          color: '#008aff', // y轴颜色
          width: 3
        }
      },
      axisLabel: {
        textStyle: {
          color: 'rgba(0,0,0,0)'
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
        name: '人证比对机',
        type: 'bar',
        stack: '总量',
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideLeft'
            },
            barBorderRadius: [6, 6, 6, 6]
          }
        },
        data: [0]
      },
      {
        name: '摄像头',
        type: 'bar',
        stack: '总量',
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideLeft'
            },
            barBorderRadius: [6, 6, 6, 6]
          }
        },
        data: [0]
      },
      {
        name: '人脸识别门禁平板',
        type: 'bar',
        stack: '总量',
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideLeft'
            },
            barBorderRadius: [6, 6, 6, 6]
          }
        },
        data: [0]
      },
      {
        name: '闸机',
        type: 'bar',
        stack: '总量',
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideLeft'
            },
            barBorderRadius: [6, 6, 6, 6]
          }
        },
        data: [0]
      },
      {
        name: '门',
        type: 'bar',
        stack: '总量',
        barWidth: 50,
        itemStyle: {
          normal: {
            label: {
              show: true,
              position: 'insideLeft'
            },
            barBorderRadius: [6, 6, 6, 6]
          }
        },
        data: [0]
      }
    ],
    grid: {
        top: '100px',
        left: '40px',
        right: '40px'
    }
  }
};
