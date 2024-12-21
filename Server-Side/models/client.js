'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  client.init({
    id:{
      type: DataTypes.INTEGER,
      primaryKey: true,
      unique: true,
      allowNull: false,
      autoIncrement: true,
    },
    full_name:{
      type: DataTypes.STRING(50),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    phone_number: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    email_address:{
      type: DataTypes.STRING(50),
      allowNull: false
    } ,
    passport_number:{
      type: DataTypes.STRING(8),
      allowNull: false
    } ,
    agent_id: {
      type: DataTypes.INTERER,
    }

  }, {
    sequelize,
    modelName: 'client',
    tableName: 'Clients',
  });
  return client;
};