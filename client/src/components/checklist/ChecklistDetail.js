import React, { useState, useEffect } from "react";
import moment from "moment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@material-ui/icons/Close";
import AccessAlarmsIcon from "@mui/icons-material/AccessAlarms";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import IconButton from "@mui/material/IconButton";
import useStyles from "../../utils/modalStyles";
import EditIcon from "@material-ui/icons/Edit";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import { useDispatch, useSelector } from "react-redux";
import { deleteChecklistItem, editChecklistItem } from "../../actions/board";
import { Avatar, Button, Stack, TextField } from "@mui/material";
import ChecklistDialog from "./CheckilstDialog";
import { getSomeUser } from "../../actions/auth";

const ChecklistDetail = ({ boardId, item, card }) => {
  const classes = useStyles();
  const [text, setText] = useState(item.text);
  const [editing, setEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState(null);
  const users = useSelector((state) => state.user.users.payload) || [];
  const [user, setUsers] = useState(null)

  if(item.member !== null){
    const user = users.find((a) => a._id === item.member)
    console.log(user)
  }
  const dispatch = useDispatch();

  useEffect(() => {
    const ids = card.members.map((member) => member.user);
    dispatch(getSomeUser(ids));
  }, [card.members, dispatch]);

  const onEdit = async (e) => {
    e.preventDefault();
    dispatch(editChecklistItem(card._id, item._id, { text }));
    setEditing(false);
  };

  const onDelete = async (e) => {
    dispatch(deleteChecklistItem(boardId, card._id, item._id));
  };

  const handleDateOpen = () => {
    setOpen(true);
    setType("date");
  };

  const handleMemberOpen = () => {
    setOpen(true);
    setType("member");
  };

  const handlePortionOpen = () => {
    setOpen(true);
    setType("portion");
  };

  const handleClose = () => {
    setOpen(false);
    setType(null);
  };

  return (
    <div className="checklist-detail">
      <Stack direction="row">
        {item.end && (
          <div
            className={`checklist-indicator ${
              moment(item.end).unix() - moment().unix() < 0 &&
              card.checklist.find((cardItem) => cardItem._id === item._id)
                .complete === false
                ? "overdue-checklist-indicator"
                : card.checklist.find((cardItem) => cardItem._id === item._id)
                    .complete === true
                ? "completed-checklist-indicator"
                : ""
            }`}
          >
            <AccessTimeIcon
              className="checklist-indicator-icon"
              fontSize="small"
            />
            {item.start && moment(item.start).format("MMM D")}
            {item.start && " - "}
            {moment(item.end).format("MMM D")}{" "}
          </div>
        )}
        {item.member ? (
          <div className="checklist-indicator">
            <Avatar
              alt="card-member"
              src={
                "data:image/png;base64," +
                users.find((user) => user._id === item.member).avatar
              }
            />
          </div>
        ): (null)}
        {item.portion && (
          <div className="checklist-indicator">
            <DonutSmallIcon
              className="checklist-indicator-icon"
              fontSize="small"
              style={{ color: "#333" }}
            />
            {item.portion}%
          </div>
        )}
        <div className={classes.itemButtons}>
          <IconButton
            aria-label="edit"
            className={classes.itemButton}
            onClick={() => setEditing(true)}
          >
            <EditIcon style={{ color: "#333" }} />
          </IconButton>
          <IconButton
            aria-label="delete"
            className={classes.itemButton}
            onClick={onDelete}
          >
            <HighlightOffIcon style={{ color: "red" }} />
          </IconButton>
        </div>
      </Stack>
      {editing ? (
        <form
          onSubmit={(e) => onEdit(e)}
          className={classes.checklistFormLabel}
        >
          <TextField
            variant="filled"
            fullWidth
            multiline
            required
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && onEdit(e)}
            style={{ marginBottom: "5px" }}
          />
          <div>
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setText(item.text);
              }}
            >
              <CloseIcon />
            </Button>
            <Button onClick={handleDateOpen}>
              <AccessAlarmsIcon
                fontSize="small"
                style={{ marginRight: "4px" }}
              />
              Due Date
            </Button>
            <Button onClick={handleMemberOpen} style={{ marginLeft: "8px" }}>
              <PersonAddAltIcon
                fontSize="small"
                style={{ marginRight: "4px" }}
              />{" "}
              Asign member
            </Button>
            <Button onClick={handlePortionOpen} style={{ marginLeft: "8px" }}>
              <DonutSmallIcon fontSize="small" style={{ marginRight: "4px" }} />{" "}
              Portion
            </Button>
            <ChecklistDialog
              item={item}
              open={open}
              handleClose={handleClose}
              card={card}
              type={type}
              users={users}
            />
          </div>
        </form>
      ) : null}
    </div>
  );
};

export default ChecklistDetail;
