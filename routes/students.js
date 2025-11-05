/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
router.get('/:id', ash(async(req, res) => {
  // Find student by Primary Key
  let student = await Student.findByPk(req.params.id, {include: [Campus]});  // Get the student and its associated campus
  res.status(200).json(student);  // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post('/', async (req, res, next) => {
  try {
    // Remove empty imageUrl so default applies
    if (req.body.imageUrl === '') delete req.body.imageUrl;

    const newStudent = await Student.create(req.body);
    res.status(201).json(newStudent);
  } catch (err) {
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      // Format readable error messages
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    next(err); // for unexpected errors
  }
});


/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', async (req, res, next) => {
  try {
    // Remove empty imageUrl so default applies
    if (req.body.imageUrl === '') delete req.body.imageUrl;

    // Attempt to update the student
    await Student.update(req.body, { where: { id: req.params.id } });

    // Find the updated student
    const student = await Student.findByPk(req.params.id);
    res.status(200).json(student);  // Status 200 OK - successful update
  } catch (err) {
    // Handle Sequelize validation errors (required fields, unique constraints, etc.)
    if (err.name === 'SequelizeValidationError' || err.name === 'SequelizeUniqueConstraintError') {
      const messages = err.errors.map(e => e.message);
      return res.status(400).json({ errors: messages });
    }
    next(err);  // For unexpected errors
  }
});

// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;