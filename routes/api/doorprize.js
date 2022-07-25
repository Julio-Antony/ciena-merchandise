const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
require('dotenv').config();

const Prizes = require('../../models/Doorprize');
const Participants = require('../../models/Participants');

const rateLimit = require('express-rate-limit');

const limit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1, // limit each IP to 2 requests per windowMs
    handler: function (req, res, /*next*/) {
      return res.status(400).json('Anda sudah mendapatkan hadiah')
  }
});

router.get('/', auth, limit, async (req, res) => {
    try {
      const prize = await Prizes.find({});
    
      res.json(prize);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  });

router.post('/', auth, async (req, res) => {
  
  const { name, email, phone, company, jabatan, isUsefull, need, prizeName } = req.body;
  try {

    // Add new participant
    const participant = new Participants({
      name,
      email,
      phone,
      company,
      jabatan,
      isUsefull,
      need,
      prize : prizeName
    });


    participant.save()
  
    res.json({msg : "Hadiah berhasil di Claim"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
