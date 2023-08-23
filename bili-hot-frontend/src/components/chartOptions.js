import echarts from '@/utils/useEcharts.js'
import 'echarts-wordcloud';

export function getWrodChartOptions(seriesData) {
  return {
    title: {
      text: '热榜分类词云',
      top: 6,
      left: 6
    },
    tooltip: {
      trigger: "item",
      backgroundColor: 'rgba(255,255,255,0.98)',
      borderColor: 'rgba(0,0,0,0)',
    },
    graphic: getGraphic(seriesData),
    series: [
      {
        type: "wordCloud", // 词云类型
        gridSize: 5, // 文字间隙
        sizeRange: [12, 40], // 文字大小范围
        rotationRange: [-90, 90], // 文字旋转角度范围
        layoutAnimation: true, // 生成动画
        shape: "circle", // 词云展示的形状
        left: '0',
        top: '0',
        width: '100%',
        height: '100%',
        textStyle: {
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
          // 生成随机颜色
          color: function () {
            return 'rgb(' + [
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160),
              Math.round(Math.random() * 160)
            ].join(',') + ')';
          }
        },
        // hover时文字的样式
        emphasis: {
          shadowBlur: 10,
          shadowColor: "#333",
        },
        data: seriesData,
      },
    ],
  };
}

export function getPopularBarOptions(yDatas, seriesData, total) {
  return {
    title: {
      text: '热榜前20的分类',
      top: 6,
      left: 6
    },
    tooltip: {
      trigger: "axis",
      formatter: (p) => {
        return `${p[0].name}: ${p[0].value}(${((p[0].value / total) * 100).toFixed(1)}%)`
      },
    },
    graphic: getGraphic(yDatas),
    grid: {
      top: 40,
      bottom: 20,
      right: 40,
      left: 100
    },
    yAxis: {
      type: 'category',
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      axisLine: { show: false },
      axisTick: { show: false },
      data: yDatas
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear',
    xAxis: {
      type: 'value',
      max: 'dataMax',
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: '视频类型数量',
        type: 'bar',
        data: seriesData,
        smooth: true,
        realtimeSort: true,
        barWidth: 6,
        itemStyle: {
          borderRadius: 6,
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            {
              offset: 0,
              color: "rgb(57,89,255,1)",
            },
            {
              offset: 1,
              color: "rgb(46,200,207,1)",
            },
          ]),
        },
        label: {
          show: true,
          precision: 1,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
  }
}

export function getPieChartOptions(legendData, seriesData) {
  return {
    title: {
      text: '推荐原因',
      top: 6,
      left: 6
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 0,
      top: 20,
      bottom: 20,
      data: legendData
    },
    graphic: getGraphic(seriesData),
    series: seriesData.length > 0 ? [
      {
        name: '推荐原因',
        type: 'pie',
        radius: ['40%', '60%'],
        avoidLabelOverlap: false,
        left: "-30%",
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          formatter: '{b}: {c}({d}%)',
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 18,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: seriesData
      }
    ] : []
  };
}

function getGraphic(data) {
  return {
    type: 'text',     // 类型：文本
    left: 'center',
    top: 'middle',
    silent: true,     // 不响应事件
    invisible: data.length > 0,   // 有数据就隐藏
    style: {
      fill: '#9d9d9d',
      fontWeight: 'bold',
      text: '暂无数据',
      fontFamily: 'Microsoft YaHei',
      fontSize: '25px'
    }
  }
}