let mysql = require('mysql2/promise');
let conn = null;

class DbConnection {
    #tableName = null;
    #connection= null;
    constructor(tableName) {
        this.#tableName = tableName;
    }

    async getConnection() {
        if (this.#connection == null) {
            this.#connection = await mysql.createConnection({
                host: process.env.MYSQL_HOSTNAME,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: 'habit_tracker'
            });
        }
        return this.#connection;
    }

    async closeConnection() {
        if (this.#connection) {
            this.#connection.end();
        }
    }
}

module.exports = DbConnection;
