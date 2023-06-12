/**
 * 加密密码
 * 参数 密码
 * 返回值 加密后的密码
 */

const crypto = require('crypto')

function md5Password(password) {
  const md5 = crypto.createHash('md5')
  const newPassword = md5.update(password).digest('hex')
  return newPassword
}

module.exports = md5Password