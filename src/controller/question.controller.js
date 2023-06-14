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
  async getQuestionList(ctx, next) {
    const page = ctx.query.page
    const pageSize = ctx.query.pageSize
    // 这里的 offset 要转换未 number 格式
    // const offset = Number((page - 1) * pageSize);
    // console.log(1, offset);

    try {
      const result = await questionService.getQuestionListService(page, pageSize);
      ctx.body = {
				code: 0,
				message: '获取列表成功',
				data: result
			};
    } catch (error) {
      console.log(error);
    }
  }

  async getQuestionById(ctx, next) {
    const id = ctx.params.id
    try {
      const result = await questionService.getQuestionByIdService(id)
      ctx.body = {
        code: 0,
        message: '查询成功',
        data: result
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deletedQuestions(ctx, next) {
    const { data } = ctx.request.body
    try {
      await questionService.deleteQuestionsService(data)
      ctx.body = {
				code: 0,
				message: '删除成功'
			};
    } catch (error) {
      console.log('controller', error);
    }
  }
}

module.exports = new QuestionController