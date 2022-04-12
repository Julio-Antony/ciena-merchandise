const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const member = require("../../middleware/member");
const { check, validationResult } = require("express-validator");

const User = require("../../models/User");
const Board = require("../../models/Board");
const List = require("../../models/List");
const Card = require("../../models/Card");

// Get all of a board's lists
router.get("/boardLists/:boardId", auth, async (req, res) => {
  try {
    const board = await Board.findById(req.params.boardId);
    if (!board) {
      return res.status(404).json({ msg: "Board not found" });
    }

    // const lists = [];
    for (const listId of board.lists) {
      lists = await List.aggregate([
        {
          $lookup: {
            from: "cards",
            localField: "cards",
            foreignField: "_id",
            as: "detail",
          },
        },
      ]);
    }

    res.json(lists);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
