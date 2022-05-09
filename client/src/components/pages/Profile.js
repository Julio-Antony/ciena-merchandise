import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import Navbar from "../other/Navbar";
import CardProject from "../profile/CardProject";
import CardTasks from "../profile/CardTasks";
import CardUser from "../profile/CardUser";

const Profile = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="dashboard-and-navbar">
        <Navbar user={user}/>
        <section className="board">
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <CardUser user={user}/>
            </Grid>
            <Grid item lg={9}>
              <Grid container spacing={2}>
                <Grid item lg={6}>
                  <CardProject/>
                </Grid>
                <Grid item lg={6}>
                  <CardTasks/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </section>
      </div>
    </div>
  );
};

export default Profile;
