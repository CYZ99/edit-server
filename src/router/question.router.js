const KoaRouter = require('@koa/router');
const QuestionController = require('../controller/question.controller')

const questionRouter = new KoaRouter({prefix: '/api'});

questionRouter.post('/question', QuestionController.create);

module.exports = questionRouter;
