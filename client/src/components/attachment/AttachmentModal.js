import { Box, Grid, Stack } from "@mui/material";
import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

import useStyles from "../../utils/modalStyles";
import DownloadButton from "./DownloadButton";
import { Modal } from "@material-ui/core";

const AttachmentModal = ({open, setOpen, attachment, extention}) => {
  const classes = useStyles();

  return (
      // <Modal open={open} onClose={() => setOpenAttachment(false)}>
        <div id="attachment" className={`${classes.paper} ${classes.cardModal}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item lg={10}>
              {extention === "png" ? (
                <img
                id="attachment-value"
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.modalImg}
                />
              ) : extention === "jpg" ? (
                <img
                id="attachment-value"
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.modalImg}
                />
              ) : extention === "jpeg" ? (
                <img
                id="attachment-value"
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.modalImg}
                />
              ) : extention === "pdf" ? (
                <div className="pdf-container" id="attachment-value">
                  <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.js">
                    <div
                      style={{
                          border: "1px solid rgba(0, 0, 0, 0.3)",
                          height: "570px",
                        }}
                    >
                      <Viewer
                        fileUrl={
                          "data:application/pdf;base64," + attachment.filename
                        }
                      />
                    </div>
                  </Worker>
                        <Stack direction="row" spacing={2} mt={2} justifyContent="center">
                          <h3 className={classes.attachmentTitle}>
                            {attachment.name}
                          </h3>
                          <DownloadButton file={attachment.filename} fileName={attachment.name}/>
                        </Stack>
                </div>
              ) : //   ) : extention === "docx" ? (
              //     <img src={Word} alt="word" />
              //   ) : extention === "xlsx" ? (
              //     <img src={Excel} alt="excel" />
              //   ) : extention === "pptx" ? (
              //     <img src={PowerPoint} alt="ppt" />
              null}
            </Grid>
          </Grid>
        </Box>
      </div>
      // </Modal>
  );
};

export default AttachmentModal;
