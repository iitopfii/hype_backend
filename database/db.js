const mysql = require('mysql');

const pool = mysql.createPool({
    host: '',
    user: '',
    password: '',
    database: ''
    
});

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) connection.release() 
    return
})

const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
            }
            connection.query(sql, args, (err, rows) => {
                if (err) {
                    reject(err)
                }
                connection.release()
                resolve(rows)
            })
        })
    })
}

module.exports = { query }