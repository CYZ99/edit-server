/**
 * @description: 读取 .env 文件的内容
 * @returns 返回端口等配置信息
 */
const dotenv = require('dotenv')
// 加载 dotenv 文件内容
dotenv.config()
module.exports = {
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  SMART_KEY: process.env.SMART_KEY
}