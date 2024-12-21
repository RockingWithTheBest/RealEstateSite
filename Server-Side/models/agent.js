'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class agent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  agent.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    full_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password:{
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    phone_number:{
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email_address: {
     type: DataTypes.STRING(50),
     allowNull: false
    }
  }, {
    sequelize,
    modelName: 'agent',
    tableName: 'Agents',
  });
  return agent;
};