export default {
  option: {
    color: ['#20c8cb', '#b6a2de', '#d87a80', '#ffb980', '#008aff'],
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
          type: ['pie', 'funnel'],
          option: {
            funnel: {
              x: '25%',
              width: '50%',
              funnelAlign: 'left',
              max: 1548
            }
          }
        },
        restore: {
          show: true
        }
      }
    },
    calculable: true,
    series: [{
      name: '访问来源',
      type: 'pie',
      radius: '65%',
      center: ['45%', '50%'],
      data: [{
          value: 39,
          name: '白名单'
        },
        {
          value: 10,
          name: '黑名单'
        },
        {
          value: 10,
          name: '其他'
        },
        {
          value: 20,
          name: '访客'
        },
        {
          value: 22,
          name: 'VIP'
        }
      ],
      label: {
        normal: {
          formatter: '{b}:\r\n{d}%'
        }
      }
    }]
  }
};
