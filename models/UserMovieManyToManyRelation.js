// const UserMovieManyToManyRelation = (sequelize, DataTypes) => {
//   const UserMovieJunction = sequelize.define("UserMovieJunction", {
//     Id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true
//     },
//     UserId: {
//         type: DataTypes.INTEGER,
//         allowNull:false,
//     },
//     MovieId: {
//         type: DataTypes.INTEGER,
//         allowNull:false,
//     },
//   },{
//       timestamps: false
//   });
//   UserMovieJunction.associate = models => {
//     UserMovieJunction.belongsTo(models.User, {
//       foreignKey: {
//         UserId : 'UserId'
//       }
//     });
//     UserMovieJunction.belongsTo(models.Movie, {
//       foreignKey: 'MovieId'
//     });
//   }
//   return UserMovieJunction;
// };

// module.exports = UserMovieManyToManyRelation