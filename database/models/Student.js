/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true, // prevents empty string
    },
  },

  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true,
      isEmail: true, // built-in Sequelize email validation
    },
  },

  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true,
    defaultValue: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  },

  gpa: {
    type: Sequelize.DECIMAL(3, 2), // e.g. 3.75
    allowNull: true,
    validate: {
      min: 0.0,
      max: 4.0,
    },
  },
});

module.exports = Student;