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
      allowNull: false
    },  
  }, );

  Category.hasMany(Product);
  Product.belongsTo(Category);
  Product.sync({ alter: true });

  const Order = db.define('Order', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    fulfil: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },  
    cancel: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },  
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },  
    collect: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },  
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    
  }, );
  
  Product.hasMany(Order);  
  Order.belongsTo(Product);
  User.hasMany(Order);
  Order.belongsTo(User);
  Order.sync({ alter: true });

  const Cart = db.define('Cart', {
  
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },    
  }, );

  Product.hasMany(Cart);  
  Cart.belongsTo(Product);
  User.hasOne(Cart);
  Cart.sync({ alter: true })

  module.exports = { User, Category, Product, Order, Cart }