const KoaRouter = require('@koa/router');
const app = require('../app/index');

const testRouter = new KoaRouter();
testRouter.get('/', async (ctx) => {
  ctx.body = 'Hello World!'
});



module.exports = testRouter;
