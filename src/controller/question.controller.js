const questionService = require('../service/question.service')
const { CREATE_QUESTION_ERROR } = require('../config/error-constent')

class QuestionController {
  async create(ctx, next) {
    const { title, isPublished, awswerCount, isStar, isDeleted } =
      ctx.request.body;
    // 数据库语句
    let result = [];
    try {
      result = await questionService.create(title, isPublished, awswerCount, isStar, isDeleted);
    } catch (error) {
      return ctx.app.emit('error', CREATE_QUESTION_ERROR, ctx);
    }
    // 返回结果
    ctx.body = {
      code: 0,
      message: '创建问卷成功',
      data: result
    };
  }
}

module.exports = new QuestionController