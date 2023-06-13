const connection = require('../app/database');

class UserService {
  async create(user) {
		const { username, password, nickname } = user;
		const statement = 'INSERT INTO `users` (name, password, nickname) VALUES (?, ?, ?);';
		// 3. 执行 sql 语句
		const [result] = await connection.execute(statement, [
			username,
			password,
			nickname
		]);
		return result;
	}
	async findUserName(name) {
		const statement = 'SELECT * FROM `users` WHERE `NAME`= ?;'
		const [values] = await connection.execute(statement, [name]);
		return values;
	}
}

module.exports = new UserService()