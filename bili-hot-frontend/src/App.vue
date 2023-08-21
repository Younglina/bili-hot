<script setup>
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
const locale= zhCn

</script>
<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<style scoped lang='scss'>

</style>