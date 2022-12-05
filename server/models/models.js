const { DataTypes } = require('sequelize');
const db = require('../config/database');

const User = db.define('User', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    mobile: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
      allowNull: false
    },
    refreshToken: {
      type: DataTypes.STRING
    }
  });
  
  User.sync();

  const Category = db.define('Category', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imgUrl: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, );
  
  Category.sync();

  const Product = db.define('Product', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },    
    listed: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },  
  }, );

  Category.hasMany(Product);
  Product.sync();

  const Order = db.define('Order', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    
  }, );
  
  Product.hasMany(Order);  
  User.hasMany(Order);
  Order.sync();

  module.exports = { User, Category, Product, Order }