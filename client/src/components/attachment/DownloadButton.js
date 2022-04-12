import { Button } from "@mui/material";
import React from "react";
import DownloadIcon from "@mui/icons-material/Download";

const DownloadButton = ({file, fileName}) => {
    const onDownload = () => {
        const linkSource = `data:application/pdf;base64,${file}`
        const downloadLink = document.createElement('a')
        const filename = fileName

        downloadLink.href = linkSource
        downloadLink.download = filename
        downloadLink.click()
    }

  return (
    <Button variant="contained" size="small" startIcon={<DownloadIcon />} onClick={onDownload}>
        Download
    </Button>
  );
};

export default DownloadButton;
