import React, { useEffect } from "react";
import data from "./data";
import useStyles from "../../utils/modalStyles";
import { useDispatch, useSelector } from "react-redux";
import { getCardsOfBoard } from "../../actions/board";
import ButtonDownload from "./ButtonDownload";
import TestGantt from "./TestGantt";

const GanttChart = ({ board }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const allCards = useSelector((state) => state.board.payload);

  console.log(allCards)
  console.log(typeof(allCards))

  useEffect(() => {
    dispatch(getCardsOfBoard(board._id));
  }, [dispatch, board._id]);

  if (!allCards) {
    return <></>;
  }

  const cleanData = allCards
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

  const checklist = allCards.map((card) =>
    card.checklist
      .map((task) => ({
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

  return (
        <div id="gantt-cart" className={`${classes.paper} ${classes.chartModal}`}>
      {tasks.length > 0 ? (
          <div className="Gantt" id="gant-chart-value">
            <TestGantt tasks={tasks} style={data.style} board={board} />
            <ButtonDownload title={board.title} />
          </div>
      ) : (
        <h1>NO CARDS YET</h1>
        )}
        </div>
  );
};

export default GanttChart;
