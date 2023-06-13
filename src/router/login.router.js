const KoaRouter = require('@koa/router');
const { verifyLogin, verifyAuth } = require('../middleware/login.middleware');
const loginController = require('../controller/login.controller');


const loginRouter = new KoaRouter({ prefix: '/api' })
loginRouter.post('/user/login', verifyLogin, loginController.sign);
loginRouter.post('/test', verifyAuth, loginController.test)
module.exports = loginRouter