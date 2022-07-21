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

    const { name, voucer_code, email, company, jabatan, isUsefull, need } = req.body;

    try {
      // See if voucer code exists
      let participant = await Participants.findOne({ voucer_code });
      if (!participant) {
        return res.status(400).json('Kode voucer invalid');
      }

      // Check for voucer code is valid
      if (participant.isValid === false) {
        return res.status(400).json('Kode voucher sudah di claim');
      }

      // Return jsonwebtoken
      jwt.sign(
        {
         user: {
            id: participant._id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token, name, voucer_code, email, company, jabatan, isUsefull, need});
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);


module.exports = router;
