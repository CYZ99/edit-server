const Koa = require('koa')
const bodyParser = require('koa-bodyparser')
const registerRouter = require('../router')

const app = new Koa()
// 使用中间件
app.use(bodyParser())
// 动态注册所有路由
registerRouter(app)
// app.use(testRouter.routes());
// app.use(testRouter.allowedMethods());

module.exports = app