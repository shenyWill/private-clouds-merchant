export default {
  option: {
    tooltip: {
      trigger: 'axis'
    },
    calculable: false,
    color: ['#f8b500'],
    xAxis: [{
      type: 'category',
      data: ['摄像头1', '摄像头2', '摄像头3', '摄像头4', '摄像头5', '摄像头6', '移动警务终端', '认证比对机', '人脸考勤1', '人脸考勤2', '人脸考勤3'],
      axisLine: {
        lineStyle: {
          color: '#00fcfc' // x轴颜色
        }
      },
      axisLabel: {
        interval: 0,
        rotate: 40,
        textStyle: {
          fontSize: 12,
          fontWeight: 100
        }
      },
      axisTick: {
        show: false
      }
    }],
    yAxis: [{
      type: 'value',
      splitLine: {
        show: false
      },
      axisLine: {
        lineStyle: {
          color: '#00fcfc' // x轴颜色
        }
      },
      axisTick: {
        show: false
      }
    }],
    series: [{
      name: '蒸发量',
      type: 'bar',
      data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4],
      markPoint: {
        data: [{
            type: 'max',
            name: '最大值'
          },
          {
            type: 'min',
            name: '最小值'
          }
        ]
      },
      barWidth: 12
    }],
    grid: {
      top: '30px'
    }
  }
};
