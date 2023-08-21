const koa = require('koa')
const koaRouter = require('koa-router')
const koaCors = require('koa-cors')
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

app.listen(3000, ()=>{
  console.log('server listen 3000')
})