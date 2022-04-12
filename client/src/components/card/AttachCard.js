import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addAttachment } from "../../actions/board";
import PropTypes from "prop-types";
import { styled } from "@mui/material/styles";
import Button from "@material-ui/core/Button";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import UploadIcon from "@mui/icons-material/Upload";
import { Stack } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const AttachCard = ({ cardId }) => {
  const [filename, setFilename] = useState("");
  const [attach, setAttach] = useState(false);
  const [attachment, setAttachment]=useState("")
  const dispatch = useDispatch();

  function onFileUpload(event) {
    setFilename(event.target.files[0].name);
    event.preventDefault();
    let file_reader = new FileReader();
    let file = event.target.files[0];
    file_reader.onload = () => {
      setAttachment(
        file_reader.result.substr(file_reader.result.indexOf(",") + 1)
      );
    };

    if (file) {
      file_reader.readAsDataURL(file);
    }
    setAttach(true)
  }

  const data = {
    name : filename,
    filename : attachment,
  }

  const onAddAttachment = async (e) => {
    e.preventDefault();
    dispatch(addAttachment(cardId, data));
    setAttach(false)
  };

  return (
    <div>
      {attach && (
        <div>
          <p style={{ marginBottom: "10px" }}>{filename}</p>
          <Stack
            direction="row"
            spacing={2}
            style={{ marginBottom: "10px", justifyContent: "space-between" }}
          >
            <Button
              variant="contained"
              component="span"
              style={{ width: "100%" }}
              onClick={(e) => onAddAttachment(e)}
            >
              <UploadIcon style={{ marginRight: "5px" }} /> attach
            </Button>
            <Button
              variant="contained"
              component="span"
              onClick={(e) => setAttach(false)}
              style={{ width: "100%" }}
            >
              <HighlightOffIcon style={{ marginRight: "5px" }} /> clear
            </Button>
          </Stack>
        </div>
      )}
      <label htmlFor="contained-button-file">
        <Input id="contained-button-file" type="file" onChange={onFileUpload} />
        <Button variant="contained" component="span" style={{ width: "100%" }}>
          <AttachFileIcon style={{ transform: "rotate(30deg)" }} />
          attach File
        </Button>
      </label>
    </div>
  );
};

AttachCard.propTypes = {
  cardId: PropTypes.string.isRequired,
};

export default AttachCard;
