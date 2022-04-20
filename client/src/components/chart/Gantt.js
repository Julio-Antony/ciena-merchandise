import React from "react";

function Gantt({ tasks, style }) {
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
  const topBarHeight = 37;
  const taskBarHeight = 48;
  const padX = 20;
  const padY = 40;
  const width = 1234;
  const graphHeight = (tasks.length + 0.5) * taskBarHeight;
  const height = topBarHeight + graphHeight + 40;
  const sideBarWidth = 198 * 2;
  const graphWidth = width - sideBarWidth / 2 - padX * 2;
  const weeks = Math.ceil(fullDuration / (1000 * 60 * 60 * 24 * 7));
  const now = Date.now();
  const relNow = (now - first.start.getTime()) / fullDuration;

  console.log(weeks);

  tasks = tasks.map((task) => ({
    ...task,
    startRel: (task.start.getTime() - first.start.getTime()) / fullDuration,
    durationRel: task.duration / fullDuration,
  }));

  console.log(tasks);

  return (
    <svg id="gantt" viewBox={"0 0 " + width + " " + height} fontFamily="Arial">
      <g id="timeline" transform="translate(20, 20)">
        <path
          d={`m17,0
                h962
                a17,17 0 0 1 17,17
                v1
                a17,17 0 0 1 -17,17
                h-962
                a17,17 0 0 1 -17,-17
                v-1
                a17,17 0 0 1 17,-17 z`}
          fill={style.weekBarColor}
          transform="translate(198)"
        ></path>
        {[...Array(weeks).keys()].map((week) => (
          <g key={week} transform="translate(198)">
            <text
              fontWeight="600"
              fontSize="19"
              fill={style.weekBarTextColor}
              textAnchor="middle"
              width="49.8"
              y="18"
              x={24.9 + week * 49.5}
              dy=".35em"
            >
              W{week + 1}
            </text>
          </g>
        ))}
        {[...Array(weeks - 1).keys()].map((week) => (
          <rect
            key={week}
            transform="translate(198)"
            fill={style.weekBarTextColor}
            rx="2"
            width="2"
            height="19"
            x={48.8 + week * 49.5}
            y="8"
          ></rect>
        ))}
      </g>
      <g id="tasks" transform={`translate(${padX}, ${padY})`}>
        {[...Array(weeks - 1).keys()].map((week) => (
          <rect
            key={week}
            transform="translate(198)"
            fill={style.weekNotchesColor}
            rx="2"
            width="2"
            height={graphHeight - taskBarHeight}
            x={48.8 + week * 49.5}
            y={topBarHeight}
          ></rect>
        ))}
        {tasks.map((task, i) => (
          <g key={i}>
            <text
              fontSize="16"
              name="Label"
              fill={style.taskTextColor}
              dy=".38em"
              textAnchor="start"
              fontWeight={task.type === "task" ? 400 : 600}
              x={task.type === "task" ? 10 : 0}
              y={48 + i * 48}
              style={{ whiteSpace: "pre" }}
            >
              {task.name}
            </text>

            <g>
              <linearGradient x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  stopColor="#F0C808"
                  style={{ stopOpacity: 1 }}
                ></stop>
                <stop
                  offset="0%"
                  stopColor="#086788"
                  style={{ stopOpacity: 1 }}
                ></stop>
              </linearGradient>
              <g
                transform={`
                                      translate(
                                        ${
                                          sideBarWidth / 2 +
                                          task.startRel * (graphWidth - padX)
                                        },
                                        ${topBarHeight + i * taskBarHeight})`}
              >
                {task.type === "task" ? (
                  <path
                    strokeWidth="0"
                    fill={style.categories[task.category]}
                    d={`m 0 4
                                            a 4 4 0 0 1 4 -4
                                            h ${
                                              task.durationRel * graphWidth - 8
                                            }
                                            a 4 4 0 0 1 4 4
                                            v 10
                                            a 4 4 0 0 1 -4 4
                                            h -${
                                              task.durationRel * graphWidth - 8
                                            }
                                            a 4 4 0 0 1 -4 -4
                                            v -10`}
                  ></path>
                ) : (
                  <path
                    strokeWidth="0"
                    fill="#909BA4"
                    stroke="#000000"
                    d={`m 0 0
                                        h ${task.durationRel * graphWidth}
                                        v 14
                                        l -5 -5
                                        h -${task.durationRel * graphWidth - 10}
                                        l -5 5
                                        v -14 z`}
                  ></path>
                )}
              </g>
            </g>
          </g>
        ))}
        {style.showNow ? (
          <rect
            fill="#ff8844"
            transform={`translate(${
              sideBarWidth / 2 + relNow * (graphWidth - padX) - 1
            }, ${topBarHeight})`}
            width="2"
            height={graphHeight}
          ></rect>
        ) : (
          <></>
        )}
      </g>
      <g
        id="legend"
        transform={`translate(${
          width - Object.keys(style.categories).length * 120
        }, ${graphHeight + 40})`}
      >
        {Object.keys(style.categories).map((cat, i) => (
          <g key={i} transform={`translate(${i * 120})`}>
            <text
              fontSize="16"
              name="Label"
              fill={style.taskTextColor}
              dy=".38em"
              textAnchor="start"
              fontWeight={600}
              x={34}
              y={8}
              style={{ whiteSpace: "pre" }}
            >
              {cat}
            </text>
            <path
              fill={style.categories[cat]}
              d={`m 0 4
                                                     a 4 4 0 0 1 4 -4
                                                     h 20
                                                     a 4 4 0 0 1 4 4
                                                     v 10 a 4 4 0 0 1 -4 4
                                                     h -20 a 4 4 0 0 1 -4 -4
                                                     v -10`}
            ></path>
          </g>
        ))}
      </g>
    </svg>
  );
}

export default Gantt;
