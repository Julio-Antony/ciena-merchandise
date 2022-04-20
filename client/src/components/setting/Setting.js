import {
  Avatar,
  Button,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import React, { useState } from "react";
import ChangePassword from "./ChangePassword";
import useStyles from "../../utils/modalStyles";
import { useDispatch } from "react-redux";
import { updateProfile } from "../../actions/auth";

const Input = styled('input')({
    display: 'none',
  });

const Setting = ({ user }) => {
  const [username, setUsername] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [disable, setDisable] = useState(true)

  const classes = useStyles();
  const dispatch = useDispatch();

  function onUpload(event) {
    event.preventDefault();
    let file_reader1 = new FileReader();
    let file1 = event.target.files[0];
    file_reader1.onload = () => {
      setDisable(false)
      setAvatar(
        file_reader1.result.substr(file_reader1.result.indexOf(",") + 1)
      );
    };

    if (file1) {
      file_reader1.readAsDataURL(file1);
    }
  }

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
    setDisable(false)
  }

  const onChangeEmail = (e) => {
    setEmail(e.target.value)
    setDisable(false)
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateProfile(user._id, username, email, avatar));
  };

  return (
    <Grid item xs={9}>
      <Typography variant="h4" gutterBottom component="div">
        Account
      </Typography>
      <Typography variant="h6" gutterBottom component="div">
        Profile
      </Typography>
      <p style={{ marginBottom: "30px" }}>
        This information will be displayed publicly so be careful what you
        input.
      </p>
      <div>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "55ch" },
          }}
          noValidate
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Avatar
              alt={username}
              src={"data:image/png;base64," + avatar}
              sx={{ width: 120, height: 120 }}
            />
            <label htmlFor="contained-button-file">
              <Input
                accept="image/*"
                id="contained-button-file"
                onChange={onUpload}
                multiple
                type="file"
              />
              <Button variant="contained" component="span">
                Upload
              </Button>
            </label>
          </Stack>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                id="outlined-required"
                label="Username"
                defaultValue={username}
                onChange={onChangeUsername}
              />
              <TextField
                required
                id="outlined-required"
                label="Email"
                defaultValue={email}
                onChange={onChangeEmail}
              />
            </Stack>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={disable}
              className={classes.button}
            >
              Save All Changes
            </Button>
          </Stack>
        </Box>
      </div>
      <Divider style={{marginTop: "30px"}}/>
      <ChangePassword/>
    </Grid>
  );
};

export default Setting;
