const {Sequelize}=require("sequelize");
const path = require('path');
const db = {};
const sequelize = new Sequelize(
   'sql12578821',//database name
   'sql12578821',//username default root
   'l7eg32KrvV',//password
    {
      host: 'sql12.freemysqlhosting.net',//default localhost
      port : 3306,
      dialect: 'mysql'
    }
  );

sequelize.authenticate().then(() => {
   console.log('Connection has been established successfully.');
}).catch((error) => {
   console.error('Unable to connect to the database: ', error);
});

let arr=['user','movie','cast','MovieCastManyToManyRelation'];
arr.forEach((file) => {
   const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
})
Object.keys(db).forEach(modelName => {
  if(db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;


module.exports = db





// const fs = require('fs');
// const path = require('path');
// const Sequelize = require('sequelize');
// const process = require('process');
// const basename = path.basename(__filename);
// const env = process.env.NODE_ENV || 'development';
// const config = require(__dirname + '/../config/config.json')[env];
// const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
//   }).forEach((file) => {
//     // const model = require(path.join(__dirname, 'user'))(sequelize, Sequelize.DataTypes);
//     // db[model.name] = model;
//   })
// let arr=['user','movie','cast','MovieCastManyToManyRelation'];
// arr.forEach((file) => {
//    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
// })

// Object.keys(db).forEach(modelName => {
//   if(db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize = sequelize;
// db.Sequelize = Sequelize;

// module.exports = db;
