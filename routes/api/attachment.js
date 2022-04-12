const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const member = require('../../middleware/member');
const { check, validationResult } = require('express-validator');

const Card = require('../../models/Card');
const User = require('../../models/User');
const Board = require('../../models/Board');

// Add an attachment
router.post(
  '/:cardId',
  [auth, member, [check('filename', 'Filename is required').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: 'Card not found' });
      }

      const { name, filename } = req.body
      const user = await User.findById(req.user.id);
      const boardId = req.header('boardId');

      card.attachment.push({ filename: filename, name: name, user :user.name });
      await card.save();

      res.json(card);

      // Log activity
      
      const board = await Board.findById(boardId);
      board.activity.unshift({
        text: `${user.name} added '${name}'`,
        source : 'attachment'
      });
      await board.save();
      
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// Get attachment by id
router.get('/:cardId/:itemId', [auth], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' + req.params.cardId});
    }

    const attachment = card.attachment.find((item) => item.id === req.params.itemId);
    if (!attachment) {
      return res.status(404).json({ msg: 'Attachment not found ' + req.params.itemId});
    }

    res.json(attachment)
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

// Delete a card attachment
router.delete('/:cardId/:itemId', [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: 'Card not found' + req.params.cardId});
    }

    const index = card.attachment.findIndex((item) => item.id === req.params.itemId);
    if (index !== -1) {
      card.attachment.splice(index, 1);
      await card.save();
    }

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
