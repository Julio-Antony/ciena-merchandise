import { Divider, Stack, Typography } from "@mui/material";
import React, { Fragment } from "react";

const TestGantt = ({ tasks, style, board }) => {
  if (tasks.length === 0) {
    return <></>;
  }
  style = style ? style : {};

  let first = null;
  let firstTime = Infinity;
  let last = null;
  let lastTime = 0;
  for (const task of tasks) {
    if (task.start.getTime() < firstTime) {
      firstTime = task.start.getTime();
      first = task;
    }
    if (task.end.getTime() > lastTime) {
      lastTime = task.end.getTime();
      last = task;
    }
  }

  const fullDuration = last.end.getTime() - first.start.getTime();
  const padX = 20;
  const padY = 40;
  const weeks = Math.ceil(fullDuration / (1000 * 60 * 60 * 24 * 7));

  console.log(weeks);
  console.log(tasks.length);

  tasks = tasks.map((task) => ({
    ...task,
    startRel: (task.start.getTime() - first.start.getTime()) / fullDuration,
    durationRel: task.duration / fullDuration,
    weeks: task.duration / (1000 * 60 * 60 * 24 * 7),
  }));

  console.log(
    tasks
      .filter((task) => task.type === "category")
      .map(
        (task) => (task.start.getTime() - first.start.getTime()) / fullDuration
      )
  );
  return (
    <div className="gantt-chart">
      <div className="wrapper" id="gantt">
        <Stack direction="row" justifyContent="center" spacing={2} mb={3}>
          <Typography variant="h4">{board.title}</Typography>
          <Divider orientation="vertical" variant="middle" flexItem ml={2} />
          <Typography variant="h4" color="#2a3eb1">{`${Math.round(
            board.task_total > 0
              ? (board.task_complete / board.task_total) * 100
              : 0
          )}%`}</Typography>
        </Stack>
        <div id="timeline-wrapper" className="timeline-wrapper">
          <div id="timeline" className="timeline">
            {[...Array(weeks).keys()].map((week) => (
              <div>
                <h3>W{week + 1}</h3>
              </div>
            ))}
          </div>
        </div>
        <div id="tasks" style={{ marginLeft: padX, marginTop: padY }}>
          <div className="graph">
            {[...Array(weeks).keys()].map((week) => (
              <div
                key={week}
                style={{
                  height: tasks.length * 32,
                }}
                className="graph-divider"
              ></div>
            ))}
          </div>
          {tasks.map((task, i) => (
            <div key={i}>
              <Stack direction="row">
                <div className="cart-sidebar">
                  <p
                    style={{
                      fontSize: 16,
                      color: style.taskTextColor,
                      marginTop: ".38em" + 48 + i * 48,
                      fontWeight: task.type === "task" ? 400 : 600,
                      marginLeft: task.type === "task" ? 10 : 0,
                      marginBottom: 10,
                    }}
                  >
                    {task.name}
                  </p>
                </div>
                <div style={{}}>
                  {task.type === "task" ? (
                    <div
                      style={{
                        backgroundColor: style.categories[task.category],
                        width: task.durationRel * 1100,
                        marginLeft: task.startRel * 1100,
                        borderRadius: "5px",
                        height: 20,
                      }}
                    ></div>
                  ) : (
                    <div
                      style={{
                        backgroundColor: "#909BA4",
                        border: "1px solid #000000",
                        width: task.durationRel * 1100,
                        marginLeft: task.startRel * 1100,
                        borderRadius: "5px",
                        height: 20,
                      }}
                    ></div>
                  )}
                </div>
              </Stack>
            </div>
          ))}
        </div>
        <div id="legend" className="legend">
          <Stack direction="row">
            {Object.keys(style.categories).map((cat, i) => (
              <Fragment key={i}>
                <h1 className="legend-text">{cat}</h1>
                <span
                  className="legend-bar"
                  style={{ backgroundColor: style.categories[cat] }}
                ></span>
              </Fragment>
            ))}
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default TestGantt;
