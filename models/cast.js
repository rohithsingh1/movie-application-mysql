const Cast=(sequelize, DataTypes) => {
  const Cast = sequelize.define("Cast", {
    CastName: {
        type: DataTypes.STRING,
        allowNull:false,
    },
    CastId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull : false
    },
  }, {
      timestamps: false
  });
  return Cast;
};

module.exports = Cast