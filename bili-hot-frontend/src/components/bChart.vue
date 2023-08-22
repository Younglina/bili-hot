<script setup>
import echarts from '@/utils/useEcharts.js'
import { watch, onMounted, onBeforeUnmount, ref } from 'vue'
import { getPopularBarOptions, getWrodChartOptions, getPieChartOptions } from './chartOptions.js'
const props = defineProps({
  chartData: {},
})
let wordChartDiv = null
let pieChartDiv = null
let barChart = null
onMounted(()=>{
  wordChartDiv = echarts.init(document.getElementById('wordChartDiv'))
  pieChartDiv =  echarts.init(document.getElementById('pieChartDiv'))
  barChart = echarts.init(document.getElementById('barChartDiv'))
})

watch(()=>props.chartData, (val)=>{
  const { barValueTotal, wordSeriesData, pieYAxisDatas, pieSeriesData, barChartDatas } = val
  wordChartDiv.setOption(getWrodChartOptions(wordSeriesData))
  pieChartDiv.setOption(getPieChartOptions(pieYAxisDatas, pieSeriesData))
  barChart.setOption(getPopularBarOptions(barChartDatas[0].barYAxisDatas, barChartDatas[0].barSeriesData, barValueTotal), true)
  animationBar(barChartDatas, barValueTotal)
  window.addEventListener('resize', handleResize)
})

async function animationBar(datas, barValueTotal) {
  let curIdx = 1, chartData=null
  let interval = setInterval(function () {
    run()
  }, 3000);

  function run(){
    if (datas.length > 1) {
      chartData = datas[curIdx++]
      if (!chartData) {
        clearInterval(interval)
        interval = null
        return
      }
      barChart.setOption(getPopularBarOptions(chartData.barYAxisDatas, chartData.barSeriesData, barValueTotal))
    }
  }
  run()
}

function handleResize(){
  pieChartDiv.resize();
  wordChartDiv.resize();
  barChart.resize();
}

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<template>
  <div class="popular-charts">
    <div id="wordChartDiv" style="height: 42vh;width:33%;"></div>
    <div id="barChartDiv" style="height: 42vh;width:33%;"></div>
    <div id="pieChartDiv" style="height: 42vh;width:33%;"></div>
  </div>
</template>
<style scoped lang='scss'>
.popular-charts {
  display: flex;

  >div {
    border-radius: 4px;
    margin: 6px 8px;
    border-radius: 4px;
    box-shadow: 0px 0px 6px rgba(0, 0, 0, .08);
  }
}
</style>
