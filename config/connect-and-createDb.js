const mysqlConn=require('./dbConfig')


const connectDB=() => {
    mysqlConn.connect(function(err) {
        if(err) {
            console.log(`error while connection : ${err}`);
        } else {
            console.log('database connected.....');
        }
    })
    let sqlQuery="CREATE DATABASE IF NOT EXISTS movies";
    mysqlConn.query(sqlQuery, (err, result) => {
        if(err) {
            console.log(`err while database creation : ${err}`);
        } else {
            console.log('Database created');
        }
    })
     mysqlConn.end((err) => {
        console.log('connection terminated : '+ err)
    })
}


module.exports={
    connectDB,
}