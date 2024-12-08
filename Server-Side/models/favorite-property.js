'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class favorite_property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  favorite_property.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    quantity_room:{
      type: DataTypes.INTEGER,
      allowNull: false,
    } ,
    price: 
    {
      type: DataTypes.STRING,
      allowNull: false,
    },
    client_id:{
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'clients',
        key: 'id',
      },
    }
  }, {
    sequelize,
    modelName: 'favorite-property',
    tableName:'Favorite_Properties',
  });
  return favorite - property;
};