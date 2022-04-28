import { Button } from "@mui/material";
import React from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const ButtonDownload = ({ title }) => {
  const download = () => {
    const input = document.getElementById("gantt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new JsPDF();
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const widthRatio = pageWidth / canvas.width;
      const heightRatio = pageHeight / canvas.height;
      const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;

      const canvasWidth = canvas.width * ratio;
      const canvasHeight = canvas.height * ratio;

      const marginX = (pageWidth - canvasWidth) / 2;
      const marginY = (pageHeight - canvasHeight) / 2;
      pdf.addImage(
        imgData,
        "JPEG",
        0,
        0,
        canvasWidth,
        canvasHeight,
        marginX,
        marginY,
        "a",
        "FAST"
      );
      // pdf.output('dataurlnewwindow');
      pdf.save(`${title} - Gannt Chart`);
    });
  };

  return (
    <Button variant="contained" onClick={download}>
      Download
    </Button>
  );
};

export default ButtonDownload;
