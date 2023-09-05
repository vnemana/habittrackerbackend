const DbConnection = require("./db_connection");

class Habits extends DbConnection {
    #tableName = null;
    constructor() {
        super();
        this.#tableName = 'habits';
    }

    async getByUserId(userId) {
        let get_sql = "SELECT * FROM habits WHERE user_id = '" + userId + "'";
        let conn = await super.getConnection();
        let [rows] = await conn.query(get_sql);
        return rows;
    }

    async add(habitData) {
        var createdOnDate = new Date();
        let insert_sql =
            "INSERT INTO habits (name, user_id, frequency, time_of_day, active, created_on) VALUES (" +
            "'" + habitData.name + "', "  +
            "'" + habitData.userId +"', " +
            "'" + habitData.frequency + "', " +
            "'" + habitData.timeOfDay + "', " +
            habitData.active +", NOW())";

        let conn = await super.getConnection();
        await conn.query(insert_sql);
    }

    async deleteByUserId(userId) {
        let delete_sql =
            "DELETE FROM habits WHERE user_id='" + userId + "'";
        let conn = await super.getConnection();
        await conn.query(delete_sql);
    }

    async update(habit, habitId) {
        let update_sql = "UPDATE habits SET name = ?, frequency = ?, time_of_day = ?, active = ? WHERE id=?";
        let data = [habit.name, habit.frequency, habit.timeOfDay, habit.active, habitId];

        let conn = await super.getConnection();
        await conn.query(update_sql, data);
    }
}

module.exports = Habits;