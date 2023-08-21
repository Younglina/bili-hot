<script setup>
import echarts from '@/utils/useEcharts.js'
import { watch, onBeforeUnmount, ref } from 'vue'
import { getPopularBarOptions, getWrodChartOptions, getPieChartOptions } from './chartOptions.js'
const props = defineProps({
  chartData: {},
})
let wordChartDiv = ref(null)
let pieChartDiv =  ref(null)
let barChart = ref(null)
watch(()=>props.chartData, (val)=>{
  const { barValueTotal, wordSeriesData, pieYAxisDatas, pieSeriesData, barChartDatas } = val
  if(!wordChartDiv.value){
    wordChartDiv.value = echarts.init(document.getElementById('wordChartDiv'))
    pieChartDiv.value = echarts.init(document.getElementById('pieChartDiv'))
    barChart.value = echarts.init(document.getElementById('barChartDiv'))
  }
  wordChartDiv.value.setOption(getWrodChartOptions(wordSeriesData))
  pieChartDiv.value.setOption(getPieChartOptions(pieYAxisDatas, pieSeriesData))
  barChart.value.setOption(getPopularBarOptions(barChartDatas[0].barYAxisDatas, barChartDatas[0].barSeriesData, barValueTotal), true)
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
      barChart.value.setOption(getPopularBarOptions(chartData.barYAxisDatas, chartData.barSeriesData, barValueTotal))
    }
  }
  run()
}

function handleResize(){
  pieChartDiv.value.resize();
  wordChartDiv.value.resize();
  barChart.value.resize();
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
