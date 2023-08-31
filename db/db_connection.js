let mysql = require('mysql2');

let conn = mysql.createConnection({
    host: process.env.HOSTNAME,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: 'habit_tracker'
});

conn.connect(function(err) {
    if(err) {
        console.log("Error connecting to db", err.toString())
        throw err;
    }
    console.log("Connected!")
});

module.exports = conn;