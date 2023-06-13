const jwt = require('jsonwebtoken');
const { SMART_KEY } = require('../config/server')
class LoginController {
  async sign(ctx, next) {
    // 1.获取到用户的信息
    const { id, NAME} = ctx.user
    // 2. 颁发 token
   const token = jwt.sign({ id, NAME }, SMART_KEY, { expiresIn: 24 * 60 * 60 });
    // 3. 返回用户信息
    ctx.body = { code: 0, data: { id, NAME, token } };
    await next()
  }
  test(ctx, next) {
    console.log(11);
    ctx.body = '测试成功'
  }

}

module.exports = new LoginController()