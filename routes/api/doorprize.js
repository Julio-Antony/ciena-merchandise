const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
require('dotenv').config();

const Prizes = require('../../models/Doorprize');
const Participants = require('../../models/Participants');

const rateLimit = require('express-rate-limit');

const limit = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 2, // limit each IP to 2 requests per windowMs
    handler: function (req, res, /*next*/) {
      return res.status(400).json('Anda sudah mendapatkan hadiah, tidak boleh merefresh halaman')
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

router.put('/:id', auth, async (req, res) => {
  const { name, email, company, jabatan, isUsefull, need, prizeName } = req.body;

  try {
    const prize = await Prizes.findById(req.params.id);
    if(!prize) {
      return res.status(400).json({msg: "Hadiah tidak ditemukan"});
    }
    prize.weight = prize.weight - 1
    prize.save()

    const participant = await Participants.findById(req.user.id)
    if(!participant){
      return res.status(400).json({msg: "Kode Voucer tidak ditemukan"});
    }
    participant.name = name, 
    participant.email = email, 
    participant.company = company,
    participant.jabatan = jabatan,
    participant.isUsefull = isUsefull,
    participant.need = need,
    participant.prize= prizeName,
    participant.isValid= false,
    participant.save()
  
    res.json({msg : "Hadiah berhasil di Claim"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

module.exports = router;
