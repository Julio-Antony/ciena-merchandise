import { Box, Grid, Modal, Stack } from "@mui/material";
import React from "react";
import { Viewer } from "@react-pdf-viewer/core";
import { Worker } from "@react-pdf-viewer/core";

import useStyles from "../../utils/modalStyles";
import DownloadButton from "./DownloadButton";

const AttachmentModal = ({ open, setOpen, attachment }) => {
  const classes = useStyles();
  const extention = attachment.name.split(".").pop();


  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div className={`${classes.paper} ${classes.cardModal}`}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item lg={10}>
              {extention === "png" ? (
                <img
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.thumbImg}
                />
              ) : extention === "jpg" ? (
                <img
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.thumbImg}
                />
              ) : extention === "jpeg" ? (
                <img
                  src={"data:image/png;base64," + attachment.filename}
                  alt="thumb"
                  className={classes.thumbImg}
                />
              ) : extention === "pdf" ? (
                <div className="pdf-container">
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
    </Modal>
  );
};

export default AttachmentModal;
