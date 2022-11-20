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




