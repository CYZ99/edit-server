const mysql2 = require('mysql2')

const connectionPool = mysql2.createPool({
	host: 'localhost',
	port: 3306,
	database: 'edit',
	user: 'root',
  password: 'Cai15089505680.',
  connectionLimit: 5
});

connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log('获取连接失败', err);
    retrun
  }
  connection.connect(err => {
    if (err) {
      console.log('和数据库交互失败', err);
    } else {
      console.log('和数据库交互成功');
    }
  })
})

// 3. 获取连接池中的连接对象
const connection = connectionPool.promise()

module.exports = connection