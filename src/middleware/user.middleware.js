/**
 * 用于判断用户名是否已存在
 */
const { USERNAME_IS_ALREADY_EXITS } = require('../config/error-constent')
const userService = require('../service/user.service')
const md5Password = require('../utils/handle-password')
const verifyUser = async (ctx, next) => {
  // 1. 获取用户名信息
  const { username } = ctx.request.body
  // 2. 在数据库查询
  const users = await userService.findUserName(username)
  // 返回的查询结果是一个数组结构
  if (users.length) {
    return ctx.app.emit('error', USERNAME_IS_ALREADY_EXITS, ctx);
  }
  // 3. 没有重复执行下一个中间件
  await next()
}

const handlePassword = async (ctx, next) => {
  const { password } = ctx.request.body
  ctx.request.body.password = md5Password(password)
  await next()
}

module.exports = { verifyUser, handlePassword};