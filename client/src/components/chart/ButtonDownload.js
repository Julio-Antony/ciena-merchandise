import { Button } from "@mui/material";
import React from "react";
import JsPDF from "jspdf";
import html2canvas from "html2canvas";

const ButtonDownload = ({ title }) => {
  const download = () => {
    const input = document.getElementById("gantt");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new JsPDF({
        orientation: 'potrait',
      });
      // const imgProps= pdf.getImageProperties(imgData);
      //   const pdfWidth = pdf.internal.pageSize.getWidth();
      //   const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(
        imgData,
        "PNG",
        10,
        10,
        // pdfWidth,
        // pdfHeight,
        190,
        278,
        "a",
        "FAST"
      );
      pdf.output('dataurlnewwindow');
      // pdf.save(`${title} - Gannt Chart`);
    });
  };

  return (
    <Button variant="contained" onClick={download}>
      Download
    </Button>
  );
};

export default ButtonDownload;
