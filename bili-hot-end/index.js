const koa = require('koa')
const koaRouter = require('koa-router')
const koaCors = require('koa-cors')
const cron = require('node-cron');
const { exec } = require('child_process');
const { getPopularlist, addPopularlistByDate  } = require('./usePopular.js')

const app = new koa()
const router = new koaRouter()

router.get('/getPopularlist', async (ctx) => {
  const res = await getPopularlist(ctx)
  ctx.body = res
})

router.get('/addPopularlistByDate', async (ctx) => {
  const res = await addPopularlistByDate(ctx)
  ctx.body = res
})


app.use(koaCors())
app.use(router.routes())
app.use(router.allowedMethods({throw: true}))


// 创建一个每天的23:30:00执行的定时任务
cron.schedule('30 23 * * *', () => {
  addPopularlistByDate()
  console.log('执行任务');
  commitToGit();
});


// 定义提交函数
function commitToGit() {
  exec('git add . && git commit -m "定时提交" && git push', (error, stdout, stderr) => {
    if (error) {
      console.error(`提交到Git仓库时出错：${error.message}`);
      return;
    }
    console.log('提交成功');
  });
}


app.listen(process.env.PORT || 3000, ()=>{
  console.log('server listen 3000')
})