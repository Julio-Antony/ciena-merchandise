const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
require('dotenv').config();

const Participants = require('../../models/Participants');

//Change Participant's info
router.patch('/:id', auth, async (req, res) => {
  const { participation_reason, prize } = req.body;
  try {
    const participant = await Participants.findById(req.params.id);

    if (!participant) {
      return res.status(404).json({
        errors: [{ msg: 'Participant not found' }],
      });
    }

    participant.participation_reason = participation_reason ? participation_reason : participant.participation_reason,
    participant.prize = prize ? prize : participant.prize,
    await participant.save();

    res.json({msg: 'Participants Updated', participant});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
