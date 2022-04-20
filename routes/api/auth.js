const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
require('dotenv').config();

const User = require('../../models/User');

// Get authorized user
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Authenticate user & get token
router.post(
  '/',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // See if user exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      // Check for email and password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          errors: [{ msg: 'Invalid credentials' }],
        });
      }

      // Return jsonwebtoken
      jwt.sign(
        {
          user: {
            id: user.id,
          },
        },
        process.env.JWT_SECRET,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

//Change User's info
router.patch('/:id', auth, async (req, res) => {
  const { name, avatar, email, level } = req.body;
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        errors: [{ msg: 'User not found' }],
      });
    }

    user.name = name ? name : user.name,
    user.email = email ? email : user.email,
    user.level = level ? level : user.level,
    user.avatar = email ? avatar : user.avatar,
    await user.save();

    res.json({msg: 'Profile Updated', user});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

//Change Password
router.patch('/', auth, async (req, res) => {
  const { password, confirm } = req.body;
  try {
    const user = await User.findById(req.user.id);

    // Check password match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        errors: [{ msg: 'Invalid credentials' }],
      });
    }

    user.password = await bcrypt.hash(confirm, await bcrypt.genSalt(10))
    await user.save();

    res.json({msg: 'Password Changed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

router.post('/makePassword', async (req, res) => {
  try {
    const {password} = req.body
    const pass =await bcrypt.hash(password, await bcrypt.genSalt(10))

    res.json({password :pass})
  } catch (err) {
    res.status(500).send('Server Error')
  }
})

module.exports = router;
