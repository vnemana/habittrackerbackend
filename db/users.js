const DbConnection = require("./db_connection");

class Users extends DbConnection {
    #tableName = null;
    constructor() {
        super();
        this.#tableName = 'users';
    }

    async getByUserId(id) {
        try {
            let get_sql = "SELECT * FROM " + this.#tableName + " where id='" + id+"'";
            let conn = await super.getConnection();
            let [rows] = await conn.query(get_sql);
            return rows;
        } catch (err) {
            console.log(err);
        }
        return [];
    }

    async add(userData) {
        try {
            let insert_sql = "INSERT INTO users (id, email, first_name, last_name, full_name) values (" +
                userData.sub.toString() + ",'" + userData.email + "','" + userData.given_name + "','" +
                userData.family_name + "','" + userData.name + "')"

            let conn = await super.getConnection();
            await conn.query(insert_sql);
        } catch (err) {
            console.log (err);
        }
    }

    async deleteByUserId(id) {
        try {
            let delete_sql = "DELETE FROM users WHERE id='" + id +"'";

            let conn = await super.getConnection();
            await conn.query(delete_sql);
        } catch (err) {
            console.log(err);
        }
    }

    async update(user) {
        try {
            let update_sql = "UPDATE users SET email=?, first_name=?, last_name=?, full_name=? WHERE id=?";
            let data = [user.email, user.given_name, user.family_name, user.name, user.sub];
            let conn = await super.getConnection();
            await conn.query(update_sql, data);
        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = Users;
