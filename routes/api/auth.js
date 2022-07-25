const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const { validationResult } = require('express-validator');
require('dotenv').config();

const Participants = require('../../models/Participants');

// Get authorized user
router.get('/', auth, async (req, res) => {
  try {
    const user = await Participants.findById(req.user.id).select('-voucer_code');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Authenticate user & get token
router.post(
  '/',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, phone, company, jabatan, isUsefull, need } = req.body;

    try {
      
      // Return jsonwebtoken
      jwt.sign(
        {
         user: {
            name: "Judgment of Euthymia",
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, name, email, phone, company, jabatan, isUsefull, need});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;
