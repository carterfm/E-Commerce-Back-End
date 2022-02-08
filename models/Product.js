// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    // define columns
    product_name: {
      type: DataTypes.STRING,
      allowNull: false
    }, 
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      //verifying that we are, in fact, dealing with a decimal
      validate: {
        isDecimal: true
      }
      
    }, 
    stock: {
      type: DataTypes.INTEGER, 
      allowNull: false,
      defaultValue: 10,
      //verifying that we're using a number
      validate: {
        isNumeric: true
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'category',
        key: 'id'
      }
    }
    //My code in index.js is auto-generating a CategoryId field here
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
