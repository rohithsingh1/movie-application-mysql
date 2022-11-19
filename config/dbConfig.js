const mysql=require('mysql')
const mysqlConn=mysql.createConnection({
    //Host: Specifies the host that runs the database
    host: "sql12.freemysqlhosting.net",// default localhost
    //User: Sets the user’s name
    user: "sql12578821",// default root
    //Password: Sets up a password
    password: "l7eg32KrvV",
    //Database: Names the database
    database:"sql12578821"
})

module.exports = mysqlConn








