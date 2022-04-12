import {
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import React from "react";
import Navbar from "../other/Navbar";
import { useSelector } from "react-redux";
import Setting from "../setting/Setting";
import { Redirect } from "react-router-dom";

const Settings = () => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }
  
  return (
    <div>
      <div className="dashboard-and-navbar">
        <Navbar />
        <section className="board">
          <Grid container spacing={2}>
            <Grid item xs={3} style={{ backgroundColor: "#EFFFFD", height:"90vh"}} mt={1}>
                <Typography style={{color:'#4D77FF', marginLeft:'40%', justifyContent:"center"}}><strong>Settings</strong></Typography>
                <Divider />
              <div>
                <List component="nav" aria-label="mailbox folders">
                  <ListItem button>
                    <ManageAccountsIcon />
                    <ListItemText
                      primary="Account"
                      style={{ marginLeft: 15 }}
                    />
                  </ListItem>
                  <Divider />
                  {/* <ListItem button divider>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <Divider light />
                  <ListItem button>
                    <ListItemText primary="Spam" />
                  </ListItem> */}
                </List>
              </div>
            </Grid>
            <Setting user={user}/>
          </Grid>
        </section>
      </div>
    </div>
  );
};

export default Settings;
