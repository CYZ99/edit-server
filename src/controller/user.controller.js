const userService = require('../service/user.service')

class UserController {
	async create(ctx, next) {
		// 1. 拿到用户传递过来的信息 (POST请求)
		const user = ctx.request.body;
		// 2.1 将 user 信息存储到数据中
		const result = await userService.create(user);

		// 3. 查看存储的结果,告知前端创建成功
		ctx.body = {
			code: 0,
			message: '创建用户成功',
			data: result
		};
	}
	async getUserInfo(ctx, next) {
		// 1. 拿到用户传递过来的信息 (POST请求)
		const id = ctx.params.id
		// 2.1 将 user 信息存储到数据中
		const result = await userService.findUserInfoById(id);

		// 3. 查看存储的结果,告知前端创建成功
		ctx.body = {
			code: 0,
			message: '获取用户信息成功',
			data: result
		};
	}
}

module.exports = new UserController()
