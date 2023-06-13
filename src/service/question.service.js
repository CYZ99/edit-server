const connection = require('../app/database')

class QuestionService {
	async create(title, isPublished, awswerCount, isStar, isDeleted) {
		const statement = 'INSERT INTO `questions` (title, isPublished, awswerCount, isStar, isDeleted) VALUES (?, ?, ?, ?, ?);'
		const [result] = await connection.execute(statement, [
			title,
			isPublished,
			awswerCount,
			isStar,
			isDeleted
    ]);
		return result
	}
}

module.exports = new QuestionService()