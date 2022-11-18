const mysql=require('mysql')
const mysqlConn=mysql.createConnection({
    //Host: Specifies the host that runs the database
    host: "localhost",
    //User: Sets the user’s name
    user: "root",
    //Password: Sets up a password
    password: "Geethasingh@10",
    //Database: Names the database
    database:"movies"
})

module.exports = mysqlConn








