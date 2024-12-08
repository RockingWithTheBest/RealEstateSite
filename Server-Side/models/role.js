'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class role extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  role.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    client: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } ,
    agent: {
      type: DataTypes.INTEGER,
      allowNull: false,
    } 
  }, {
    sequelize,
    modelName: 'role',
    tableName: 'Roles',
  });
  return role;
};