const MovieCastManyToManyRelation = (sequelize, DataTypes) => {
  const MovieCastJunction = sequelize.define("MovieCastJunction", {
    Id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // CastId: {
    //     type: DataTypes.INTEGER,
    //   allowNull: false,
        
    // },
    // MovieId: {
    //     type: DataTypes.INTEGER,
    //     allowNull:false,
    // },
  },{
      timestamps: false
  });
  MovieCastJunction.associate = models => {
    MovieCastJunction.belongsTo(models.Cast, {
      targetKey: 'CastId',
      foreignKey: {
        name: 'CastId',
        allowNull:false
      },
      onDelete: 'CASCADE',
      onUpdate : 'CASCADE'
    });
    MovieCastJunction.belongsTo(models.Movie, {
      targetKey : 'MovieId',
      foreignKey: {
        name: 'MovieId',
        allowNull:false
      },
      onDelete: 'CASCADE',
      onUpdate : 'CASCADE'
    });
  }
  return MovieCastJunction;
};

module.exports = MovieCastManyToManyRelation