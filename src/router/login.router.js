const KoaRouter = require('@koa/router');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware');
const loginController = require('../controller/login.controller');


const loginRouter = new KoaRouter({ prefix: '/login' })
loginRouter.post('/', verifyLogin, loginController.sign);
loginRouter.post('/test', verifyAuth, loginController.test)
module.exports = loginRouter