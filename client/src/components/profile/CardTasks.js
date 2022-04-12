import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, Grid, Stack, Typography } from "@mui/material";
import { getTasks } from "../../actions/profile";
import useStyles from "../../utils/profileStyle";

const CardTasks = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const tasks = useSelector((state) => state.board.profile);

  
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  useEffect(()=>{
    if (tasks) {
      const data = [
        {
          title: "To Do :",
          value: tasks.to_do,
          color: "#D7E9F7",
        },
        {
          title: "On Progress :",
          value: tasks.on_progress,
          color: "#FDD998",
        },
        {
          title: "Overdue :",
          value: tasks.overdue,
          color: "#FF7878",
        },
        {
          title: "Done :",
          value: tasks.done,
          color: "#CDF2CA",
        },
      ];
  
      setData(data)
    }
  },[tasks])

  return (
    <Card sx={2}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          My Tasks
        </Typography>
        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          {data.map((task) => (
            <Grid item xs={6} key={task.index}>
              <div
                className={classes.tasks}
                style={{ backgroundColor: task.color }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mr={6}
                  spacing={2}
                >
                  <Typography variant="body1" component="h2">
                    {task.title}
                  </Typography>
                  <Typography variant="h2" component="h2">
                    <strong>{task.value}</strong>
                  </Typography>
                </Stack>
              </div>
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardTasks;
