'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class neighborhood extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  neighborhood.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    } ,
    description:{
      type: DataTypes.TEXT,
      allowNull: false
    } ,
    amenities: {
      type: DataTypes.STRING,
      allowNull: false
    } ,
    number_of_parks:{
      type: DataTypes.INTEGER,
      allowNull: false
    } ,
    property_id: {
      type: DataTypes.INTEGER,
    }
  }, {
    sequelize,
    modelName: 'neighborhood',
    tableName: 'Neighborhoods',
  });
  return neighborhood;
};