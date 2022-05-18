import React, { Fragment, useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";
import { getCard, editCard } from "../../actions/board";
import moment from "moment";
import useStyles from "../../utils/modalStyles";

import CardMUI from "@material-ui/core/Card";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import SubjectIcon from "@material-ui/icons/Subject";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AssignmentTurnedInIcon from "@material-ui/icons/AssignmentTurnedIn";
import {
  TextField,
  CardContent,
  Button,
} from "@material-ui/core";
import CardModal from "./CardModal";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import getInitials from "../../utils/getInitials";

const Card = ({ boardId, cardId, list, index }) => {
  const [editing, setEditing] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [title, setTitle] = useState("");
  const [height, setHeight] = useState(0);
  const [completeItems, setCompleteItems] = useState(0);
  const cardRef = useRef(null);
  const card = useSelector((state) =>
    state.board.board.cardObjects.find((object) => object._id === cardId)
  );
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCard(cardId));
  }, [cardId, dispatch]);

  useEffect(() => {
    if (card) {
      setTitle(card.title);
      card.checklist &&
        setCompleteItems(
          card.checklist.reduce(
            (completed, item) => (completed += item.complete ? 1 : 0),
            0
          )
        );
    }
  }, [card, dispatch, cardId]);

  useEffect(() => {
    cardRef && cardRef.current && setHeight(cardRef.current.clientHeight);
  }, [list, card, cardRef]);

  const onSubmitEdit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title }));
    setEditing(false);
    setMouseOver(false);
  };

  return !card || (card && card.archived) ? (
    ""
  ) : (
    <Fragment>
      <CardModal
        boardId={boardId}
        cardId={cardId}
        open={openModal}
        setOpen={setOpenModal}
        card={card}
        list={list}
      />
      {!editing ? (
        <Draggable draggableId={cardId} index={index}>
          {(provided) => (
            <CardMUI
              className={`card ${mouseOver && !editing ? "mouse-over" : ""}`}
              onMouseOver={() => setMouseOver(true)}
              onMouseLeave={() => setMouseOver(false)}
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              {mouseOver && !editing && (
                <div className={classes.itemButtons}>
                  <IconButton
                    aria-label="edit"
                    className={classes.itemButton}
                    style={{
                      position: "absolute",
                      bottom: height - 40,
                      left: "210px",
                      top: "5px",
                      zIndex: 1,
                    }}
                    onClick={() => setEditing(true)}
                  >
                    <EditIcon style={{ color: "#333" }} />
                  </IconButton>
                </div>
              )}
              <CardContent
                onClick={() => {
                  setOpenModal(true);
                  setMouseOver(false);
                }}
                ref={cardRef}
              >
                {card.label && card.label !== "none" && (
                  <div
                    className="card-label"
                    style={{ backgroundColor: card.label }}
                  />
                )}
                <p style={{ marginBottom: "10px" }}>{card.title}</p>
                <div className="card-bottom">
                  <div className="card-bottom-left">
                    {card.description && (
                      <SubjectIcon
                        className="description-indicator"
                        fontSize="small"
                      />
                    )}
                    {card.checklist && card.checklist.length > 0 && (
                      <div
                        className={`checklist-indicator ${
                          completeItems === card.checklist.length
                            ? "completed-checklist-indicator"
                            : ""
                        }`}
                      >
                        <AssignmentTurnedInIcon
                          fontSize="small"
                          className="checklist-indicator-icon"
                        />
                        {completeItems}/{card.checklist.length}
                      </div>
                    )}
                    {card.deadline && (
                      <div
                        className={`checklist-indicator ${
                          moment(card.deadline).unix() - moment().unix() < 0 &&
                          completeItems !== card.checklist.length
                            ? "overdue-checklist-indicator"
                            : completeItems === card.checklist.length
                            ? "completed-checklist-indicator"
                            : ""
                        }`}
                      >
                        <AccessTimeIcon
                          className="checklist-indicator-icon"
                          fontSize="small"
                        />
                        {card.startdate &&
                          moment(card.startdate).format("MMM D")}
                        {card.startdate && " - "}
                        {moment(card.deadline).format("MMM D")}{" "}
                      </div>
                    )}
                  </div>
                </div>
                <div className="card-bottom">
                  <div className="card-left"></div>
                  <div className="card-member-avatars">
                    {card.members.map((member) => {
                      return (
                        <Tooltip title={member.name} key={member.user}>
                          {member.avatar ? (
                            <Avatar
                            alt="card-member"
                            src={"data:image/png;base64," + member.avatar}
                            className="avatar"
                          />
                          ):(
                          <Avatar className="avatar">
                            {getInitials(member.name)}
                          </Avatar>
                          )}
                        </Tooltip>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </CardMUI>
          )}
        </Draggable>
      ) : (
        <form className="create-card-form" onSubmit={(e) => onSubmitEdit(e)}>
          <CardMUI>
            <CardContent className="card-edit-content">
              <TextField
                margin="normal"
                fullWidth
                multiline
                required
                label="Edit this card's title"
                autoFocus
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && onSubmitEdit(e)}
              />
            </CardContent>
          </CardMUI>
          <div className="card-actions">
            <Button type="submit" variant="contained" color="primary">
              Save
            </Button>
            <Button
              onClick={() => {
                setEditing(false);
                setMouseOver(false);
                setTitle(card.title);
              }}
            >
              <CloseIcon />
            </Button>
          </div>
        </form>
      )}
    </Fragment>
  );
};

Card.propTypes = {
  boardId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  list: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
};

export default Card;
