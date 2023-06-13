const KoaRouter = require('@koa/router');
const { verifyUser, handlePassword } = require('../middleware/user.middleware')
const userController = require('../controller/user.controller')
const userRouter = new KoaRouter({ prefix: '/api' });

userRouter.post('/user/register', verifyUser, handlePassword, userController.create);
userRouter.get('/user/info/:id', userController.getUserInfo);
module.exports = userRouter;
