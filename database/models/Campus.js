/*==================================================
/database/models/Campus.js

It defines the campus model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

// Define the campus model
const Campus = db.define("campus", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },

  address: {
    type: Sequelize.STRING,
    allowNull: false
  },

  description: {
    type: Sequelize.STRING,
  },

  imageURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://www.cnu.org/sites/default/files/styles/public_square_feature_image/public/BostonCollege1.jpg?itok=iKc35HST',
  },

});

// Export the campus model
module.exports = Campus;