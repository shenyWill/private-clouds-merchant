
const radius = [45, 55];
const centerLabel = {
    normal: {
        show: true,
        position: 'center',
        formatter: function (params) {
            return params.name + '\n' + params.value + '人\n' + params.data.totle + '%';
        },
        color: '#333',
        fontWeight: 'bold'
    }
};
const noLabel = {
    normal: {
        show: false
    }
};
const noLine = {
    normal: {
        show: false
    }
};
const totalNum = 100000;
export default {
  option: {
    toolbox: {
      show: true,
      feature: {
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
    series: [{
        type: 'pie',
        center: ['13%', '30%'],
        radius: radius,
        x: '0%', // for funnel
        data: [{
            name: 'other',
            value: totalNum,
            label: noLabel,
            itemStyle: {
                color: '#ccc'
            }
          },
          {
            name: '白名单',
            value: 762362,
            totle: 50,
            label: centerLabel,
            itemStyle: {
                color: '#20c8cb'
            }
          }
        ],
        labelLine: noLine
      },
      {
        type: 'pie',
        center: ['38%', '30%'],
        radius: radius,
        x: '20%', // for funnel
        data: [{
            name: 'other',
            value: 26,
            label: noLabel,
            itemStyle: {
                color: '#ccc'
            }
          },
          {
            name: '黑名单',
            value: 54,
            totle: 50,
            label: centerLabel,
            itemStyle: {
                color: '#d87a80'
            }
          }
        ],
        labelLine: noLine
      },
      {
        type: 'pie',
        center: ['63%', '30%'],
        radius: radius,
        x: '40%', // for funnel
        data: [{
            name: 'other',
            value: 65,
            label: noLabel,
            itemStyle: {
                color: '#ccc'
            }
          },
          {
            name: '访客',
            value: 35,
            label: centerLabel,
            itemStyle: {
                color: '#ffb980'
            }
          }
        ],
        labelLine: noLine
      },
      {
        type: 'pie',
        center: ['87%', '30%'],
        radius: radius,
        x: '60%', // for funnel
        data: [{
            name: 'other',
            value: 70,
            label: noLabel,
            itemStyle: {
                color: '#ccc'
            }
          },
          {
            name: '其他',
            value: 30,
            label: centerLabel,
            itemStyle: {
                color: '#b6a2de'
            }
          }
        ],
        labelLine: noLine
      }
    ]
  }
};
