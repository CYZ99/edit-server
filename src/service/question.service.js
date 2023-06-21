const connection = require('../app/database')

class QuestionService {
	// 创建
	async create(title, isPublished, awswerCount, isStar, isDeleted, desc) {
		const statement =
			'INSERT INTO `questions` (title, isPublished, awswerCount, isStar, isDeleted, `desc`) VALUES (?, ?, ?, ?, ?, ?);';
		const [result] = await connection.execute(statement, [
			title,
			isPublished,
			awswerCount,
			isStar,
			isDeleted,
			desc
		]);
		return result;
	}
	async findService(title) {
		const statement = 'SELECT * FROM `questions` WHERE title = ?;';
		try {
			const [result] = await connection.execute(statement, [title]);
			return result;
		} catch (error) {
			console.log(error);
		}
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
		// const statement = 'SELECT * FROM questions WHERE id = ?;';
		const statement = `SELECT qs.id, qs.title, qs.awswerCount, qs.desc,
		JSON_ARRAYAGG(JSON_OBJECT('fe_id', comp.fe_id, 'type', comp.type, 'title', comp.title, 'isHidden', comp.isHidden, 'isLocked', comp.isLocked, 'props', comp.props )) AS componentList
		FROM questions AS qs
		LEFT JOIN components comp ON comp.qf_id = qs.id
		WHERE comp.qf_id = qs.id`
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
	// 删除问卷
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
	// 更新问卷
	async updateQuestionService(id, data) {
		// 构建更新字段
		const fields = Object.keys(data)
		const placeholders = fields.map(field => `${field} = ?`).join(', ')
		// 构建查询数组
		const values = Object.value(data)
		const statement = `UPDATE questions SET ${placeholders} WHERE id = ?;`
		try {
			await connection.execute(statement, [...values, id])
		} catch (error) {
			console.log('service error', error);
		}
	}
}

module.exports = new QuestionService()