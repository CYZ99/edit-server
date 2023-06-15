const connection = require('../app/database')

class QuestionService {
	async create(title, isPublished, awswerCount, isStar, isDeleted) {
		const statement =
			'INSERT INTO `questions` (title, isPublished, awswerCount, isStar, isDeleted) VALUES (?, ?, ?, ?, ?);';
		const [result] = await connection.execute(statement, [
			title,
			isPublished,
			awswerCount,
			isStar,
			isDeleted
		]);
		return result;
	}
	// 分页查询
	async getQuestionListService(offset, pageSize) {
		const statement = 'SELECT * FROM questions LIMIT ? OFFSET ?;';
		let result = [];
		try {
			[result] = await connection.execute(statement, [pageSize, offset]);
		} catch (error) {
			console.log('error', error);
		}
		return result;
	}
	// 模糊查询
	async getQuestionListByKeywordServeice(keyword) {
		const statement = 'SELECT * FROM `questions` WHERE `title` LIKE ?;';
		let result = [];
		const keyWord = '%' + keyword + '%';
		if (keyWord == undefined) {
			keyWord = null;
		}
		try {
			[result] = await connection.execute(statement, [keyWord]);
		} catch (error) {
			console.log('error', error);
		}
		return result;
	}
	// 根据ID查询
	async getQuestionByIdService(id) {
		const statement = 'SELECT * FROM questions WHERE id = ?;';
		let result = [];
		try {
			[result] = await connection.execute(statement, [id]);
		} catch (error) {
			console.log('error', error);
		}
		return result;
	}
	// 根据 isStar 查询
	async getQuestionByIsStarService(isStar) {
		const statement = 'SELECT * FROM `questions` WHERE `isStar` = ?;';
		let result = [];
		try {
			[result] = await connection.execute(statement, [isStar]);
		} catch (error) {
			console.log('error', error);
		}
		return result;
	}
	// 根据 isDeleted 查询
	async getQuestionByIsDeletedService(isDeleted) {
		const statement = 'SELECT * FROM `questions` WHERE `isDeleted` = ?;';
		let result = [];
		try {
			[result] = await connection.execute(statement, [isDeleted]);
		} catch (error) {
			console.log('error', error);
		}
		return result;
	}
	async deleteQuestionsService(ids) {
		const length = ids.length;
		let countString = '';
		for (let i = 0; i < length; i++) {
			countString = countString.concat('?,');
		}
		countString = countString.slice(0, -1);

		const statement = `DELETE FROM questions WHERE id IN (${countString});`;
		try {
			await connection.execute(statement, ids);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = new QuestionService()