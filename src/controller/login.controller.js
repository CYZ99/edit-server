const loginServiece = require('../service/login.service')

class LoginController {
  async sign(ctx, next) {
    // 1.获取到用户的信息
    // 2. 颁发 token
    // 3. 返回用户信息
    await next()
  }

}

module.exports = new LoginController