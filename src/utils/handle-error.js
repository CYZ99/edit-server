const app = require('../app')
const {
	USERNAME_IS_ALREADY_EXITS,
	USERNAME_NOT_EXITS,
	PASSWORD_IS_INCORRENT,
	UNAUTHORIZATION,
	CREATE_QUESTION_ERROR,
  QUESTION_TITLE_ALREDY_EXITS,
  SERVER_ERROR
} = require('../config/error-constent');

app.on('error', (error, ctx) => {
  let message = ''
  let code = ''
  switch (error) {
    case USERNAME_IS_ALREADY_EXITS:
      code = -1001,
        message = '用户名已经存在'
      break;
    case USERNAME_NOT_EXITS:
      code = -1002,
        message = '用户名不存在'
      break;
    case PASSWORD_IS_INCORRENT:
      code = -1003,
        message = '密码错误'
      break;
    case UNAUTHORIZATION:
      code = 401,
        message = '没有权限认证,请重新登录'
      break;
    case CREATE_QUESTION_ERROR:
      code = -1004,
        message = '创建问卷列表失败'
      break;
    case QUESTION_TITLE_ALREDY_EXITS:
      code = -1005,
        message = '问卷标题已存在'
      break;
    case SERVER_ERROR:
      code = -1006,
        message = '服务端出错了'
  }
  ctx.body = { message, code }
})