const app = require('../app')
const { USERNAME_IS_ALREADY_EXITS } = require('../config/error-constent')

app.on('error', (error, ctx) => {
  let message = ''
  let code = ''
  switch (error) {
    case USERNAME_IS_ALREADY_EXITS:
      code = -1001,
        message = '用户名已经存在'
      break;
  }
  ctx.body = { message, code }
})