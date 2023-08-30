let conn = require ("db_connection")
function add(user) {
    conn.query('INSERT INTO users SET ?', user, function(err, result){
        if(err) throw err;
    });
}