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
    const keyword = ctx.query.keyword
    const isStar = ctx.query.isStar
    const isDeleted = ctx.query.isDeleted;
    // 这里的 offset 要转换未 number 格式
    // const offset = Number((page - 1) * pageSize);
    // console.log(1, offset);
    if (page && pageSize) {
			try {
				const result = await questionService.getQuestionListService(
					page,
					pageSize
				);
				ctx.body = {
					code: 0,
					message: '根据ID获取列表成功',
					data: result
        };
        next()
			} catch (error) {
				console.log(error);
			}
    }
    // 模糊查询
    if (keyword) {
      try {
				const result = await questionService.getQuestionListByKeywordServeice(
					keyword
				);
				ctx.body = {
					code: 0,
					message: '模糊查询获取列表成功',
					data: result
        };
        next()
      } catch (error) {
				console.log('controller',error);
			}
    }
    // 查询星标问卷
    if (isStar) {
      try {
				const result = await questionService.getQuestionByIsStarService(
					isStar
				);
				ctx.body = {
					code: 0,
					message: '星标问卷查询获取列表成功',
					data: result
				};
				next();
			} catch (error) {
				console.log('controller', error);
			}
    }
    // 查询 假删除问卷
    if (isDeleted) {
      try {
				const result = await questionService.getQuestionByIsDeletedService(
					isDeleted
				);
				ctx.body = {
					code: 0,
					message: '查询假删除问卷列表成功',
					data: result
				};
				next();
			} catch (error) {
				console.log('controller', error);
			}
    }

  }

  async getQuestionById(ctx, next) {
    const id = ctx.params.id
    const keyword = ctx.params.keyword
    console.log(keyword);
    console.log(id);
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