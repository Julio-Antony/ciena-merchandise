const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const member = require("../../middleware/member");
const { check, validationResult } = require("express-validator");
const mongoose = require('mongoose');
const Card = require("../../models/Card");
const Board = require("../../models/Board");

const moment = require("moment");

// Add a checklist item
router.post(
  "/:boardId/:cardId",
  [auth, member, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.checklist.push({ text: req.body.text, complete: false });
      await card.save();

      // Log activity
      var flag = 1;
      const board = await Board.findByIdAndUpdate(req.params.boardId, {
        $inc: { task_total: flag },
      });
      await board.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Edit a checklist's item's text
router.patch(
  "/:cardId/:itemId",
  [auth, member],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const card = await Card.findById(req.params.cardId);
    
      if (!card) {
        return res.status(404).json({ msg: "Card/user not found" });
      }

      const checklistItem = card.checklist.find((item) => item.id === req.params.itemId)
      
      checklistItem.text = req.body.text || checklistItem.text
      checklistItem.start = req.body.start || checklistItem.start
      checklistItem.end = req.body.end || checklistItem.end
      checklistItem.portion = req.body.portion || checklistItem.portion
      if(req.body.member){
        const user = await User.findById(req.body.member) 
        checklistItem.member = user.id || checklistItem.member
       }
      await card.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Complete/Uncomplete a checklist item
router.patch(
  "/:boardId/:cardId/:complete/:itemId",
  [auth, member],
  async (req, res) => {
    try {
      const card = await Card.findById(req.params.cardId);
      if (!card) {
        return res.status(404).json({ msg: "Card not found" });
      }

      card.checklist.find((item) => item.id === req.params.itemId).complete =
        req.params.complete === "true";
      await card.save();

      // Log activity
      var flag = req.params.complete === "true" ? 1 : -1;
      const board = await Board.findByIdAndUpdate(req.params.boardId, {
        $inc: { task_complete: flag },
      });
      await board.save();

      res.json(card);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// Delete a checklist item
router.delete("/:boardId/:cardId/:itemId", [auth, member], async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    const index = card.checklist.findIndex(
      (item) => item.id === req.params.itemId
    );
    if (index !== -1) {
      card.checklist.splice(index, 1);
      await card.save();
    }

    // Log activity
    var flag = -1;
    const board = await Board.findByIdAndUpdate(req.params.boardId, {
      $inc: { task_total: flag },
    });
    await board.save();

    res.json(card);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//get all checklist of a user
router.get("/", [auth], async (req, res) => {
  try {
    const card = await Card.find({});
    if (!card) {
      return res.status(404).json({ msg: "Card not found" });
    }

    const user = await User.findById(req.user.id);

    const filteredCard = card.filter((object) =>
      object.members.find((object) => object.user.toString() === user._id.toString()
      
      ));

    const filteredChecklist = []
    for(const checklist of card){
      filteredChecklist.push(checklist.checklist.filter((object) => object.member && object.member.toString() === user._id.toString()))
    }

    const complete = [];
    for (const task of filteredCard) {
      for (const done of task.checklist) {
        complete.push(done);
      }
    }

    task_complete = filteredChecklist.flat().filter((object) => object.complete === true);
    task_uncomplete = filteredChecklist.flat().filter((object) => object.complete === false);

    const filteredDeadline = card
      .filter((object) => object.deadline)
      .filter((object) =>
        object.members.find((object) => object.user.toString() === user._id.toString())
      );

    const task_todo = [];
    for (const task of filteredDeadline) {
      if (moment(task.startdate).unix() - moment().unix() > 0) {
        task_todo.push(
          ...task.checklist.filter((object) => object.complete === false)
        );
      }
    }

    const task_overdue = [];
    for (const task of filteredDeadline) {
      if (moment(task.deadline).unix() - moment().unix() < 0) {
        if (
          task.checklist.filter((object) => object.complete === false).length >
          0
        )
          task_overdue.push(
            ...task.checklist.filter((object) => object.complete === false)
          );
      }
    }

    const task_onProgress = [];
    for (const task of filteredDeadline) {
      if (moment(task.deadline).unix() - moment().unix() > 0 && moment(task.startdate).unix() - moment().unix() < 0) {
        task_onProgress.push(
          ...task.checklist.filter((object) => object.complete === false)
        );
      }
    }

    res.json({
      to_do: task_todo.length,
      done: task_complete.length,
      on_progress: task_onProgress.length,
      overdue: task_overdue.length,
      filter : complete
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
