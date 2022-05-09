import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import React from "react";
import useStyles from "../../utils/modalStyles";
import unknwon from "../../img/unknown.jpg";
import { Link } from "react-router-dom";

const CardUser = ({ user }) => {
  const classes = useStyles();

  return (
    <Card sx={{ maxWidth: 345, mx: "auto" }}>
      <Box sx={{ mx: "auto", width: 200, pt:2 }}>
        <img
          alt="user card"
          src={user.avatar ? "data:image/png;base64," + user.avatar : unknwon}
          className="user-card-avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div" align="center">
            <strong>
            {user.name}
            </strong>
          </Typography>
          <Typography gutterBottom variant="h5" component="div" align="center" style={{color:'#4D77FF'}}>
          {user.level}
          </Typography>
        </CardContent>
        <CardActions>
        <Link to="/setting">
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            Edit Account
          </Button>
        </Link>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CardUser;
