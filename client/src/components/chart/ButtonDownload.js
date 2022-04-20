import { Button } from '@mui/material'
import React from 'react'

const ButtonDownload = () => {
  return (
    <Button onClick={() => download()}>
        Download
    </Button>
  )
}

function download() {
    const gantt = document.getElementById('gantt');
    gantt.setAttribute("version", "1.1");
    gantt.setAttribute("xml:space", "preserve");
    gantt.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(gantt.outerHTML));
    element.setAttribute('download', 'gantt.svg');
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
  }

export default ButtonDownload