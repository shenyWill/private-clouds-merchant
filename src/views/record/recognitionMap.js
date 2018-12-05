
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
            value: 0,
            label: noLabel,
            itemStyle: {
                color: '#eee'
            }
          },
          {
            name: '白名单',
            value: 0,
            totle: 0,
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
            value: 0,
            label: noLabel,
            itemStyle: {
                color: '#eee'
            }
          },
          {
            name: '黑名单',
            value: 0,
            totle: 0,
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
            value: 0,
            label: noLabel,
            itemStyle: {
                color: '#eee'
            }
          },
          {
            name: '访客',
            value: 0,
            totle: 0,
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
            value: 0,
            label: noLabel,
            itemStyle: {
                color: '#eee'
            }
          },
          {
            name: '其他',
            value: 0,
            totle: 0,
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
