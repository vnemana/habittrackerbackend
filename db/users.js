let conn = require ("./db_connection")
exports.add = function(user) {

    let insert_sql = "INSERT INTO users (id, email, first_name, last_name, full_name) values (" +
        user.sub.toString() + ",'" + user.email + "','" + user.given_name + "','" + user.family_name + "','" + user.name + "')"

    conn.query(insert_sql, function(err, result){
        if(err) throw err;
    });
}