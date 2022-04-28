import React from 'react'
import GanttChart from '../chart/GanttChart';
import AttachmentModal from '../attachment/AttachmentModal';
import { Modal } from '@material-ui/core';

const Modals = ({open, setOpen, type, data, chart, extention}) => {
  console.log(data)
  console.log(chart)
  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <div>
      {
      type === "modal-gantt" ? (
        <GanttChart/>
      ) : (
        <AttachmentModal attachment={data} extention={extention}/>
      )}
      </div>
    </Modal>
  )
}

export default Modals