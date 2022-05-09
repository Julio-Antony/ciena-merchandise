import React, { useState } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import Stack from "@mui/material/Stack";
import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteAttachment } from "../../actions/board";
import useStyles from "../../utils/modalStyles";
import PDF from "../../img/pdf.png";
import Excel from "../../img/excel.png";
import Word from "../../img/word.png";
import PowerPoint from "../../img/ppt.png";
import Modals from "../card/Modals";

const AttachmentItem = ({ doc, card }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const file = doc;
  const [openDialog, setOpenDialog] = useState(false);
  const extention = file.name.split(".").pop();

  const onOpenDialog = async (e) => {
    setOpenDialog(true);
  };

  const onDelete = async (e) => {
    dispatch(deleteAttachment(card._id, doc._id));
  };

  return (
    <>
      <Modals
        open={openDialog}
        setOpen={setOpenDialog}
        data={file}
        extention={extention}
        type="attachment"
      />
      <div>
        <Stack direction="row" spacing={2}>
          <div className={classes.fileThumb} onClick={onOpenDialog}>
            {extention === "png" ? (
              <img
                src={"data:image/png;base64," + doc.filename}
                alt="thumb"
                className={classes.thumbImg}
              />
            ) : extention === "jpg" ? (
              <img
                src={"data:image/png;base64," + doc.filename}
                alt="thumb"
                className={classes.thumbImg}
              />
            ) : extention === "jpeg" ? (
              <img
                src={"data:image/png;base64," + doc.filename}
                alt="thumb"
                className={classes.thumbImg}
              />
            ) : extention === "pdf" ? (
              <img src={PDF} alt="pdf" />
            ) : extention === "docx" ? (
              <img src={Word} alt="word" />
            ) : extention === "xlsx" ? (
              <img src={Excel} alt="excel" />
            ) : extention === "pptx" ? (
              <img src={PowerPoint} alt="ppt" />
            ) : null}
          </div>
          <Stack>
            <h3 className={classes.attachmentTitle}>{file.name}</h3>
            <Stack direction="row" spacing={1} style={{ marginBottom: "10px" }}>
              <p>Added by</p> <p className={classes.userText}>{file.user}</p>{" "}
              <p>at</p> <Moment format="YYYY/MM/DD hh:mm">{file.date}</Moment>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Button variant="contained" color="secondary" onClick={onDelete}>
                Delete
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </div>
    </>
  );
};
AttachmentItem.propTypes = {
  doc: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

export default AttachmentItem;
