let conn = require ("./db_connection")
exports.add = function(user) {
    let insert_sql = "INSERT INTO users (id, email, first_name, last_name, full_name) values (" +
        user.id + user.email + user.first_name + user.last_name + user.full_name + ")"

    conn.query(insert_sql, function(err, result){
        if(err) throw err;
    });
}