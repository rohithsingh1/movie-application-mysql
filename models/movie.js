const Movie=(sequelize, DataTypes) => {
  const Movie = sequelize.define("Movie", {
    MovieName: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    Rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    Genre: {
        type: DataTypes.STRING,
        allowNull : false
      },
    ReleaseDate: {
        type: DataTypes.DATEONLY,
        defaultValue: DataTypes.NOW,
        allowNull : false
    },
    MovieId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    // UserId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    // }
  }, {
      timestamps: false
  });
  Movie.associate = models => {
    Movie.belongsTo(models.User, {
       targetKey: 'UserId',
      foreignKey: {
        name: 'UserId',
        allowNull:false
      },
      onDelete: 'CASCADE',
      onUpdate : 'CASCADE'
    });
  }
  return Movie;
};

module.exports = Movie