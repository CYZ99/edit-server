const KoaRouter = require('@koa/router');
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const userController = require('../controller/user.controller')
const userRouter = new KoaRouter();

userRouter.post('/', verifyUser, handlePassword, userController.create);

module.exports = userRouter;
