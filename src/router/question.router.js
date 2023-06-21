const KoaRouter = require('@koa/router');
const QuestionController = require('../controller/question.controller')
const questionRouter = new KoaRouter({prefix: '/api'});
const { verifyAuth } = require('../middleware/login.middleware');
const { verifyQuestion } = require('../middleware/findQuestion.middleware')

// 需要验证是否登录，登录才能创建
questionRouter.post('/question', verifyAuth, verifyQuestion, QuestionController.create);
questionRouter.get('/question', QuestionController.getQuestionList);
questionRouter.get('/question/:id', QuestionController.getQuestionById)
questionRouter.post('/question/duplicate/:id', verifyAuth, (ctx) => {
  ctx.body = '测试复制接口'
})
questionRouter.delete('/question', verifyAuth,  QuestionController.deletedQuestions)
questionRouter.patch('/question/:id', verifyAuth, QuestionController.updateQuestion)



module.exports = questionRouter;
