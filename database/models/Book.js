module.exports = (sequelize, DataTypes) => {
    const Book = sequelize.define('Book', 
    {
      id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
      },
      genre_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      author: {
        type: DataTypes.STRING,
        allowNull: false
      },
      year: {
        type: DataTypes.STRING(5),
        allowNull: false
      },
      publisher: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cover: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.DECIMAL(6, 2),
        allowNull: false,
      },
      quantity: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
      },
      synopsis: {
        type: DataTypes.TEXT,
        allowNull: false
      },
    },
    {
      timestamps: false,
      tableName: 'book',
      underscored: true
    });

    Book.associate = (models) => {
        Book.belongsTo(models.Genre, {
            as: "genre",
            foreignKey: "genre_id",
            targetKey: "id"
        })
    }
  
    return Book;
  };
  