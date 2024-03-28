module.exports = (sequelize, DataTypes) => {
    const Genre = sequelize.define('Genre', 
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      genre: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: false,
      tableName: 'genre',
      underscored: true
    });

    Genre.associate = (models) => {
        Genre.hasMany(models.Book, {
            as: "books",
            foreignKey: "genre_id",
            sourceKey: "id"
        })
    }
  
    return Genre;
  };
  