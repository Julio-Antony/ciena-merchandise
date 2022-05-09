import React from 'react'
import GanttChart from '../chart/GanttChart';
import AttachmentModal from '../attachment/AttachmentModal';
import { Modal } from '@material-ui/core';

const Modals = ({open, setOpen, type, data, chart, extention}) => {
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div>
      {
      type === "modal-gantt" ? (
        <GanttChart board={chart}/>
      ) : type === "attachment" ? (
        <AttachmentModal attachment={data} extention={extention}/>
      ) : null}
      </div>
    </Modal>
  )
}

export default Modals