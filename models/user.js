'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product, {
        foreignKey : 'user_id'
      })
      this.hasMany(models.Transaction, {
        foreignKey : 'user_id'
      })
    }
  }
  User.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    phone_number : DataTypes.STRING,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    role: DataTypes.STRING,
    balance: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};