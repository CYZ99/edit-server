const QuestionService = require('../service/question.service')
const { QUESTION_TITLE_ALREDY_EXITS, SERVER_ERROR } = require('../config/error-constent')

const verifyQuestion = async (ctx, next) => {
  const { title } = ctx.request.body
  let res = []
  try {
    res = await QuestionService.findService(title);
  } catch (error) {
    return ctx.app.emit('error', SERVER_ERROR, next)
  }
  if (res.length > 0) {
    return ctx.app.emit('error', QUESTION_TITLE_ALREDY_EXITS, ctx);
  }
  await next();
}

module.exports = { verifyQuestion }