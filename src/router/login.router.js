const KoaRouter = require('@koa/router');
const app = require('../app/index')

const loginRouter = new KoaRouter({ prefix: '/login' })
loginRouter.post('/')

app.use(loginRouter.routes());
app.use(loginRouter.allowedMethods());

module.exports = loginRouter