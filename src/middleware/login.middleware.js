const userService = require('../service/user.service')
const md5Password = require('../utils/handle-password')
const jwt = require('jsonwebtoken')
const { USERNAME_NOT_EXITS, PASSWORD_IS_INCORRENT, UNAUTHORIZATION } = require('../config/error-constent')
const { SMART_KEY } = require('../config/server')

const verifyLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 1. 判断用户是否存在
  const users = await userService.findUserName(username)
  const user = users[0]
  if (!user) {
    return ctx.app.emit('error', USERNAME_NOT_EXITS, ctx)
  }
  // 2. 判断密码是否正确
  if (user.PASSWORD !== md5Password(password)) {
    return ctx.app.emit('error', PASSWORD_IS_INCORRENT, ctx)
  }
  // 将 user 传递给下一个中间件
  ctx.user = user
  await next()
}

const verifyAuth = async (ctx, next) => {
  const authorization = ctx.headers.authorization;
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx);
  }
  const token = authorization.replace('Bearer ', '')
  // 2.验证 token是否有效
  try {
    const result = jwt.verify(token, SMART_KEY);
    ctx.user = result
    await next()
  } catch (error) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx);
  }
}

module.exports = { verifyLogin, verifyAuth };