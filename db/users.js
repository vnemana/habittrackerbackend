const db = require('./db_connection')
// const db = require('mysql2/promise');

exports.add = async function(user) {

    let insert_sql = "INSERT INTO users (id, email, first_name, last_name, full_name) values (" +
        user.sub.toString() + ",'" + user.email + "','" + user.given_name + "','" + user.family_name + "','" + user.name + "')"

    let conn = await db.getConnection();
    await conn.query(insert_sql, function(err, result){
        if(err) throw err;
        return result
    });
}

exports.get = async function(id) {
    let get_sql = "SELECT * FROM users where id='" + id+"'";
    let conn = await db.getConnection();
    let [rows] = await conn.query(get_sql);
    if (rows.length === 0 || !rows) {
        return {"Error": "No user found for this id: " + id}
    }
    return rows;
}