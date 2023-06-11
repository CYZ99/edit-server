/**
 * 动态注册每一个路由， 前提路由文件的命名必须使用 .router.js 的格式返回
 */

const fs = require('fs')

function registerRouter(app) {
  // 获取当前目录下的所有文件, 返回一个数组
  const files = fs.readdirSync(__dirname)
  for (file of files) {
    if (!file.endsWith('.router.js')) continue
    // 获取路由对象
    const router = require(`./${file}`)
    app.use(router.routes());
		app.use(router.allowedMethods());
  }
}

module.exports = registerRouter