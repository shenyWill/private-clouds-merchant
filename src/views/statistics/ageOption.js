export default {
  option: {
    tooltip: {
      trigger: 'axis'
    },
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
        restore: {
          show: true
        },
        saveAsImage: {
          show: true
        }
      }
    },
    calculable: true,
    radar: [{
      indicator: [{
          text: '老年',
          max: 100
        },
        {
          text: '中年',
          max: 100
        },
        {
          text: '青年',
          max: 100
        },
        {
          text: '少年',
          max: 100
        },
        {
          text: '儿童',
          max: 100
        }
      ],
      radius: '75%',
      name: {
        textStyle: {
            color: '#00ffff'
        }
    }
    }],
    series: [{
      name: '完全实况球员数据',
      type: 'radar',
      itemStyle: {
        normal: {
          areaStyle: {
            type: 'default'
          }
        }
      },
      data: [{
          value: [97, 42, 88, 94, 90],
          name: '舍普琴科'
        }
      ]
    }],
    grid: {
        top: '50px'
    }
  }
};
