const connection = require('../app/database');

class UserService {
  async create(user) {
		const { username, password } = user;
		const statement = 'INSERT INTO `users` (name, password) VALUES (?, ?);';
		// 3. 执行 sql 语句
		const [result] = await connection.execute(statement, [username, password]);
		return result;
	}
	async findUserName(name) {
		const statement = 'SELECT * FROM `users` WHERE `NAME`= ?;'
		const [values] = await connection.execute(statement, [name]);
		return values;
	}
}

module.exports = new UserService()