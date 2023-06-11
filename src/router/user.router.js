const KoaRouter = require('@koa/router');
const app = require('../app/index');
const userController = require('../controller/user.controller')
const userRouter = new KoaRouter();

userRouter.post('/', userController.create);

module.exports = userRouter;
