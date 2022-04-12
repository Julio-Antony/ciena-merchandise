import {
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBoards } from "../../actions/board";
import ProgressBar from "./ProgressBar";

const CardProject = () => {
  const boards = useSelector((state) => state.board.boards);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBoards());
  }, [dispatch]);
  return (
    <Card sx={2}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Recent Project
        </Typography>
        <div  style={{height: 220, overflowY:"auto"}}>
        {boards.map((board) => (
          <div key={board.index}>
            <Typography variant="subtitle1" color="text.secondary">
              {board.title}
            </Typography>
            <Box sx={{ width: "100%" }}>
              <ProgressBar value={board.task_total > 0 ? board.task_complete / board.task_total * 100 : 0} />
            </Box>
          </div>
        ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProject;
