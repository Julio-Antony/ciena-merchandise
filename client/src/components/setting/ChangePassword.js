import { Button, Box, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../actions/auth";
import useStyles from "../../utils/modalStyles";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [password, setPassword] = useState("");
  const [confirm, setconfirm] = useState("");
  const [disable, setDisable] = useState(true)

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(changePassword(password, confirm));
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value)
    setDisable(false)
  }

  const onChangeconfirm = (e) => {
    setconfirm(e.target.value)
    setDisable(false)
  }

  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Change Password
      </Typography>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { width: "55ch" },
          }}
          autoComplete="off"
          onSubmit={onSubmit}
        >
          <Stack spacing={3}>
            <Stack direction="row" spacing={2}>
              <TextField
                required
                id="outlined-required"
                label="Password"
                type="password"
                defaultValue={password}
                onChange={onChangePassword}
              />
              <TextField
                required
                id="outlined-required"
                label="New Password"
                type="password"
                defaultValue={confirm}
                onChange={onChangeconfirm}
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
    </>
  );
};

export default ChangePassword;
