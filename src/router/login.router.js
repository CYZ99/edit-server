const KoaRouter = require('@koa/router');
const app = require('../app/index')

const loginRouter = new KoaRouter({ prefix: '/login' })
loginRouter.post('/')

module.exports = loginRouter