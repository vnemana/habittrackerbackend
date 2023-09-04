let mysql = require('mysql2/promise');
let conn = null;

exports.getConnection = async function() {
    if (conn == null) {
        conn = await mysql.createConnection({
            host: process.env.HOSTNAME,
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: 'habit_tracker'
        });
    }
    return conn;
}

exports.closeConnection = async function() {
    if (conn) {
        await conn.end()
    }
}
// conn.connect(function(err) {
//     if(err) {
//         console.log("Error connecting to db", err.toString())
//         throw err;
//     }
//     console.log("Connected!")
// });

// module.exports = conn;