const { formatPopularData, popularColumns } = require('./config.js')
const axios = require('axios')
const fs = require('fs')
const dayjs = require('dayjs')
const path = require('path')
var isSameOrBefore = require('dayjs/plugin/isSameOrBefore')
dayjs.extend(isSameOrBefore)
require('dotenv').config();

const getPopularlist = async (ctx) => {
  try {
    const datesInRange = getDatesInRange(ctx.query);
    let dList = [], barChartDatas = []
    const returnData = {
      code: 0,
      data: {
        columns: popularColumns.filter(item => item.isShow),
        total: datesInRange.length * 100
      },
    }
    if (ctx.query.pn == 1) {
      for (let dates of datesInRange) {
        const fileData = await getFileData(dates, ctx)
        if (fileData.length === 0) continue
        dList = dList.concat(fileData)
        const { barYAxisDatas, barSeriesData } = formatData(dList)
        barChartDatas.push({ barYAxisDatas, barSeriesData })
      }
      returnData.data.chartData = formatData(dList)
      returnData.data.chartData.barChartDatas = barChartDatas.length === 0 ? [{ barSeriesData: [], barYAxisDatas: [] }] : barChartDatas
      returnData.message = '获取热门榜成功'
    } else {
      dList = dList.concat(await getFileData([datesInRange[ctx.query.pn - 1]], ctx))
      returnData.message = '获取分页表格数据成功'
    }
    returnData.data.list = dList.slice(0, 100).map(item => {
      item.favorite = formatNumberWithUnit(item.favorite || 0)
      item.like_count = formatNumberWithUnit(item.like_count || 0)
      item.share = formatNumberWithUnit(item.share || 0)
      item.view = formatNumberWithUnit(item.view || 0)
      item.coin = formatNumberWithUnit(item.coin || 0)
      return item
    })
    return returnData
  } catch (err) {
    console.log(err)
    return {
      code: -1,
      message: '执行查询时发生错误'
    }
  }
}

async function addPopularlistByDate(ctx) {
  const dates = dayjs(new Date).format('YYYYMMDD')
  const fileName = `bili/bili_popular_${dates}.json`
  let dList = ctx ? await getFileData(dates, ctx) : []
  if (dList.length === 0) {
    const requests = Array.from({ length: 5 }).map((_, idx) => axios.get(`https://api.bilibili.com/x/web-interface/popular?ps=20&pn=${idx + 1}`))
    const results = await Promise.all(requests)
    results.map(rst => {
      dList = dList.concat(rst.data.data.list.map(list => formatPopularData(list)))
    })
    let msg = ''
    fs.writeFile(fileName, JSON.stringify(dList), 'utf-8', (err) => {
      if (err) msg = err
    })
    fs.writeFile(`bili_popular_${dates}.js`, `module.exports = ${JSON.stringify(dList)}`, 'utf-8', (err) => {
      if (err) msg = err
    })
    return {
      code: msg ? -1 : 0,
      message: msg || `存入${dates}文件成功`
    }
  } else {
    return {
      code: 0,
      message: `已存在${dates}文件`
    }
  }
}

function formatData(data) {
  let barObj = {}, barYAxisDatas = [], barSeriesData = [],
    wordSeriesData = [],
    pieObj = {}, pieYAxisDatas = [], pieSeriesData = []
  data.map(item => {
    barObj[item.tname] = (barObj[item.tname] || 0) + 1
    if (item.rcmd_reason) {
      pieObj[item.rcmd_reason] = (pieObj[item.rcmd_reason] || 0) + 1
    }
  })
  Object.entries(barObj).sort((a, b) => b[1] - a[1]).map(item => {
    if (barYAxisDatas.length < 20) {
      barYAxisDatas.unshift(item[0])
      barSeriesData.unshift(item[1])
    }
    wordSeriesData.push({ name: item[0], value: item[1] })
  })
  Object.entries(pieObj).map(item => {
    pieYAxisDatas.push(item[0])
    pieSeriesData.push({ name: item[0], value: item[1] })
  })
  return {
    barYAxisDatas,
    barSeriesData,
    barValueTotal: barSeriesData.reduce((a, b) => a + b, 0),
    wordSeriesData,
    pieYAxisDatas,
    pieSeriesData
  }
}

const isDevelopment = process.env.NODE_ENV === 'development';
async function getFileData(dates) {
  let fileData = []
  let fileName = ''
  try {
    if (isDevelopment) {
      fileName = `bili/bili_popular_${dates}.json`
      const exist = fs.existsSync(fileName);
      if (exist) {
        const results = fs.readFileSync(fileName, 'utf8');
        console.log(`读取${fileName}文件成功`)
        fileData = JSON.parse(results)
      }
    } else {
      // fileName = `bili/bili_popular_${dates}.json`
      // const response = await axios.get(`https://younglina-1256042946.cos.ap-nanjing.myqcloud.com/${fileName}`);
      // fileData = response.data; // 返回文件内容
      let testFile = await require(`./bili_popular_${dates}.js`)
      testFile = JSON.parse(JSON.stringify(testFile))
      fileData = testFile; // 返回文件内容
    }
  } catch (err) {
    console.error('读取文件失败:', fileName, err.message);
  }
  return fileData
}

function getDatesInRange({ startDate, endDate }) {
  const dates = [];

  let current = dayjs(startDate);
  while (current.isSameOrBefore(dayjs(endDate), 'day')) {
    dates.push(current.format('YYYYMMDD'));
    current = current.add(1, 'day');
  }

  return dates;
}

function formatNumberWithUnit(number) {
  const units = ['', '万', '亿']; // 单位，可以根据需要进行扩展

  let unitIndex = 0;
  while (Math.abs(number) >= 10000 && unitIndex < units.length - 1) {
    number /= 10000;
    unitIndex++;
  }

  const formattedNumber = (number||0).toFixed(2);
  const decimalPart = formattedNumber.split('.')[1];
  const formattedValue = decimalPart === '00' ? (number||0).toFixed(0) : formattedNumber;

  return formattedValue + units[unitIndex];
}


module.exports = {
  getPopularlist,
  addPopularlistByDate,
}