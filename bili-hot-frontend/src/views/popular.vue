<script setup>
import { onMounted, ref } from 'vue'
import BChart from '@/components/bChart.vue'
import axios from '@/utils/axios'

const tableData = ref({})
const durDate = ref([new Date(), new Date()])
const loading = ref(true)

const chartData = ref({})

const getData = async (v) => {
  loading.value = true
  const params = {
    startDate: durDate.value[0],
    endDate: durDate.value[1],
    pn: v===-1?1:v,
  }
  const res = await axios.get('/getPopularlist', { params })
  const data = res.data.data
  if(v===-1){
    chartData.value = data.chartData
  }
  tableData.value = data
  loading.value = false
}

onMounted(async () => {
  await getData(-1)
})

</script>
<template>
  <div v-loading="loading">
    <BChart ref="bChartRef" :chartData="chartData"/>
    <el-table class="popular-table" :data="tableData.list" height="50vh">
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="bili-desc">
            <p v-if="row.vdesc">视频描述：{{ row.vdesc }}</p>
          </div>
          <div class="bili-frame">
            <iframe
              :src="`//player.bilibili.com/player.html?aid=${row.aid}&bvid=${row.bid}&cid=${row.cid}&page=1&high_quality=1`"
              width="60%" height="360" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"
              sandbox="allow-top-navigation allow-same-origin allow-forms allow-scripts"> </iframe>
          </div>
        </template>
      </el-table-column>
      <el-table-column v-for="col in tableData.columns" :key="col.key" :prop="col.key" :label="col.label"
        :width="col.width" :show-overflow-tooltip="!['title'].includes(col.key)">
        <template #default="{ row }">
          <span v-if="!col.cType">{{ row[col.key] }}</span>
          <a v-else-if="col.cType === 'href'" :href="row[`${col.key}_url`]">{{ row[`${col.key}`] }}</a>
        </template>
      </el-table-column>
    </el-table>
    <div class="popular-foot">
      <div style="width: 280px">
        <el-date-picker v-model="durDate" type="daterange" @change="getData(-1)"
          :disabled-date="(date) => date < new Date('2023-08-12') || date > new Date()" range-separator="~"
          start-placeholder="开始日期" end-placeholder="结束日期" size="small" />
      </div>
      <el-pagination small background layout="prev, pager, next" @current-change="getData" :pager-count="5"
        :page-size="100" :total="tableData.total" class="mt-4" />
    </div>
  </div>
</template>
<style scoped lang='scss'>
@mixin card {
  border-radius: 4px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .08);
}

.popular-charts {
  display: flex;

  >div {
    border-radius: 4px;
    margin: 6px 8px;
    @include card;
  }
}

.popular-table {
  margin-top: 12px;
  @include card;
}

.bili-desc {
  padding: 6px;
}

.bili-frame {
  text-align: center;
}

.popular-foot {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 4px;
}
</style>