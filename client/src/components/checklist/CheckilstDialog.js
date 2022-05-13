import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editChecklistItem } from "../../actions/board";
import PersonIcon from "@mui/icons-material/Person";
// import AddIcon from "@mui/icons-material/Add";
import { blue } from "@mui/material/colors";

const CheckilstDialog = ({ card, item, open, handleClose, type, users }) => {
  const [start, setStart] = useState(item.start);
  const [end, setEnd] = useState(item.end);
  const [portion, setPortion] = useState(0);
  const [member, setMember] = useState(item.member);
  const dispatch = useDispatch();

  const onEdit = async (e) => {
    e.preventDefault();
    dispatch(
      editChecklistItem(card._id, item._id, {
        start,
        end,
        portion,
        member,
      })
    );
    handleClose()
  };

  return (
    <Dialog open={open} onClose={handleClose} disableEnforceFocus>
      {type === "date" ? (
        <>
          <DialogTitle>Due Date</DialogTitle>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={3}>
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="Start Date"
                  value={start}
                  onChange={(newValue) => {
                    setStart(newValue);
                  }}
                />
                <DateTimePicker
                  renderInput={(props) => <TextField {...props} />}
                  label="End Date"
                  value={end}
                  onChange={(newValue) => {
                    setEnd(newValue);
                  }}
                />
              </Stack>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={onEdit}>save</Button>
          </DialogActions>
        </>
      ) : type === "member" ? (
        <>
          <DialogTitle>Assign Member</DialogTitle>
          <List sx={{ pt: 0 }}>
            {users.map((user, i) => (
              <ListItem
                button
                key={i}
                selected={user._id === member}
                onClick={(event) => setMember(user._id)}
              >
                <ListItemAvatar>
                  {user.avatar ? (<Avatar
                    alt="card-member"
                    src={"data:image/png;base64," + user.avatar}
                  />) : (
                  <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
                    <PersonIcon />
                  </Avatar>
                  )}
                </ListItemAvatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
          <DialogActions>
            <Button onClick={onEdit}>save</Button>
          </DialogActions>
        </>
      ) : type === "portion" ? (
        <>
          <DialogTitle>Adjust Portion</DialogTitle>
          <DialogContent>
            <TextField
              id="outlined-password-input"
              label="Adjust Portion"
              type="number"
              value={portion}
              onChange={(e) => setPortion(e.target.value)}
              autoComplete="current-password"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={onEdit}>save</Button>
          </DialogActions>
        </>
      ) : null}
    </Dialog>
  );
};

export default CheckilstDialog;
