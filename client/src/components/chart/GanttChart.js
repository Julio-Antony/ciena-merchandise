import React, { useEffect } from "react";
import data from "./data";
import Gantt from "./Gantt";
import { Divider, Modal, Stack, Typography } from "@mui/material";
import useStyles from "../../utils/modalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getCardsOfBoard } from "../../actions/board";
import ButtonDownload from "./ButtonDownload";

const GanttChart = ({ open, setOpen, board }) => {
  Date.prototype.toJSON = function () {
    return this.toISOString().split("T")[0];
  };

  const classes = useStyles();
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.board.payload);

  useEffect(() => {
    dispatch(getCardsOfBoard(board._id));
  }, [dispatch, board._id]);

  if (!cards) {
    return <></>;
  }

  // const tasks = data.tasks
  //   .map((task) => ({
  //     ...task,
  //     start: new Date(task.start),
  //     end: new Date(task.end),
  //   }))
  //   .map((task) => ({
  //     ...task,
  //     duration: task.end.getTime() - task.start.getTime(),
  //   }))
  //   .map((task) => ({
  //     ...task,
  //     progress: (Date.now() - task.start.getTime()) / task.duration,
  //   }));

  // console.log(tasks);

  const cleanData = cards
    .map((object) => ({
      name: object.title,
      type: "category",
      start: new Date(object.startdate.substring(0, 10)),
      end: new Date(object.deadline.substring(0, 10)),
    }))
    .map((object) => ({
      ...object,
      duration: object.end.getTime() - object.start.getTime(),
    }))
    .map((object) => ({
      ...object,
      progress: (Date.now() - object.start.getTime()) / object.duration,
    }));

  const checklist = cards.map((card) =>
    card.checklist.map((task) => ({
      name: task.text,
      type: "task",
      category: task.complete === true ? "done" : "overdue",
      start: new Date(card.startdate.substring(0, 10)),
      end: new Date(card.deadline.substring(0, 10)),
    }))
    .map((task) => ({
      ...task,
      duration: task.end.getTime() - task.start.getTime(),
    }))
    .map((task) => ({
      ...task,
      progress: (Date.now() - task.start.getTime()) / task.duration,
    }))
  );

  const task = checklist.map((card, index) => [
    cleanData.find((data, key) => index === key),
    ...card,
  ]);
  const tasks = [].concat(...task);

  console.log(tasks);
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.chartModal}`}>
        <div className="Gantt">
        <Stack direction="row" justifyContent="center" spacing={2}>
          <Typography variant="h4">{board.title}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem ml={2} />
          <Typography variant="h4" color="#2a3eb1">{`${Math.round(
            board.task_total > 0
              ? (board.task_complete / board.task_total) * 100
              : 0
          )}%`}</Typography>
        </Stack>
          <Gantt tasks={tasks} style={data.style} />
          <ButtonDownload/>
        </div>
      </div>
    </Modal>
  );
};

export default GanttChart;
