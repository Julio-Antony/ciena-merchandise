import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { GithubPicker } from "react-color";
import { editCard, archiveCard } from "../../actions/board";
import { Modal, TextField, Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import MoveCard from "./MoveCard";
import DeleteCard from "./DeleteCard";
import CardMembers from "./CardMembers";
import Checklist from "../checklist/Checklist";
import Attachment from "../attachment/Attachment";
import useStyles from "../../utils/modalStyles";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateTimePicker from "@mui/lab/DateTimePicker";
import { Box, Grid, Stack } from "@mui/material";
import AttachCard from "./AttachCard";

const CardModal = ({ boardId, cardId, open, setOpen, card, list }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(card.title);
  const [description, setDescription] = useState(card.description);
  const [startDate, setStartDate] = useState(card.startdate);
  const [deadline, setDeadline] = useState(card.deadline);
  const dispatch = useDispatch();

  useEffect(() => {
    setTitle(card.title);
    setDescription(card.description);
  }, [card]);

  const onTitleDescriptionSubmit = async (e) => {
    e.preventDefault();
    dispatch(editCard(cardId, { title, description }));
  };

  const onStartDate = () => {
    dispatch(editCard(cardId, { startDate }));
  };

  const onDeadline = () => {
    dispatch(editCard(cardId, { deadline }));
  };

  const onArchiveCard = async () => {
    dispatch(archiveCard(cardId, true));
    setOpen(false);
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
          <Grid item lg={10}>
          <form onSubmit={(e) => onTitleDescriptionSubmit(e)}>
              <div className={classes.modalTop}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  multiline
                  label="Card title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && onTitleDescriptionSubmit(e)
                  }
                  className={classes.cardTitle}
                />
              </div>
              <TextField
                variant="outlined"
                margin="normal"
                fullWidth
                multiline
                label="Card description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={
                  title === card.title &&
                  (description === card.description ||
                    (description === "" && !card.description))
                }
                className={classes.button}
              >
                Save All Changes
              </Button>
            </form>
          </Grid>
          <Grid item lg={2}>
          <Button
              onClick={() => setOpen(false)}
              style={{ marginLeft: "65%" }}
            >
              <CloseIcon />
            </Button>
          </Grid>
          <div style={{height:'1px',width:'100%', backgroundColor:'black', marginTop:'10px'}}></div>
          </Grid>
          <Grid container spacing={2}> 
            <Grid item lg={8}>
              <div>
                <div className={classes.modalSection}>
                  <CardMembers card={card} />
                </div>
                <Checklist boardId={boardId} card={card} />
                <Attachment card={card} />
                <div className={classes.modalSection}>
                  <MoveCard cardId={cardId} setOpen={setOpen} thisList={list} />
                </div>
              </div>
            </Grid>
            <Grid item lg={4}>
              <div>
                <div>
                  <h3 className={classes.labelTitle}>Label</h3>
                  <Stack spacing={3}>
                    <GithubPicker
                      className={classes.colorPicker}
                      onChange={async (color) =>
                        dispatch(editCard(cardId, { label: color.hex }))
                      }
                    />
                    <Button
                      className={classes.noLabel}
                      variant="outlined"
                      onClick={async () =>
                        dispatch(editCard(cardId, { label: "none" }))
                      }
                    >
                      No Label
                    </Button>
                  </Stack>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack spacing={3}>
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="Start Date"
                        value={startDate}
                        onChange={(newValue) => {
                          setStartDate(newValue);
                          onStartDate();
                        }}
                      />
                      <DateTimePicker
                        renderInput={(props) => <TextField {...props} />}
                        label="End Date"
                        value={deadline}
                        onChange={(newValue) => {
                          setDeadline(newValue);
                          onDeadline();
                        }}
                      />
                      <AttachCard cardId={cardId} />
                    </Stack>
                  </LocalizationProvider>
                  <div className={classes.modalBottomRight}>
                    <Button
                      variant="contained"
                      className={classes.archiveButton}
                      onClick={onArchiveCard}
                    >
                      Archive Card
                    </Button>
                    <DeleteCard cardId={cardId} setOpen={setOpen} list={list} />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </Modal>
  );
};

CardModal.propTypes = {
  boardId: PropTypes.string.isRequired,
  cardId: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  card: PropTypes.object.isRequired,
  list: PropTypes.object.isRequired,
};

export default CardModal;
