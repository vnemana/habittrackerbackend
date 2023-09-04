const DbConnection = require("./db_connection");

class Users extends DbConnection {
    #tableName = null;
    constructor() {
        super();
        this.#tableName = 'users';
    }
    async getByUserId(id) {
        let get_sql = "SELECT * FROM " + this.#tableName + " where id='" + id+"'";
        let conn = await super.getConnection();
        let [rows] = await conn.query(get_sql);
        if (rows.length === 0 || !rows) {
            return {"Error": "No user found for this id: " + id}
        }
        return rows;
    }

    async add(userData) {
        let insert_sql = "INSERT INTO users (id, email, first_name, last_name, full_name) values (" +
            userData.sub.toString() + ",'" + userData.email + "','" + userData.given_name + "','" +
            userData.family_name + "','" + userData.name + "')"

        let conn = await super.getConnection();
        await conn.query(insert_sql);
    }

    async deleteByUserId(id) {
        let delete_sql = "DELETE FROM users WHERE id='" + id +"'";

        let conn = await super.getConnection();
        await conn.query(delete_sql);
    }
}

module.exports = Users;