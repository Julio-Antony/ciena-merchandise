import { Button, Modal } from '@material-ui/core'
import PropTypes from 'prop-types';
import React, { useEffect } from 'react'
import useStyles from '../../utils/modalStyles'
import CloseIcon from '@material-ui/icons/Close';
import { GanttComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-react-gantt';
import { projectData } from '../../data';
// import { useDispatch } from 'react-redux';

const GanttModal = ({open, setOpen}) => {
    
    const taskValues = {
        id: "TaskID",
        name: "TaskName",
        startDate: "StartDate",
        endDate: "EndDate",
        duration: "Duration",
        progress: "Progress",
        child: "subtasks",
        dependency: "Predeceesor"
    };
    
    const classes = useStyles()
    // const dispatch = useDispatch();

    useEffect(() => {
      }, []);

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
        <div className={`${classes.paper} ${classes.chartModal}`}>
            <div className={classes.modalSection}>
        <Button onClick={() => setOpen(false)}>
              <CloseIcon />
        </Button>
        <div className='gantt-chart'>
      {/* To change timeline view add timelineSettings={{timelineViewMode: "Day"} in below tag} */}
      <GanttComponent dataSource={projectData}
      taskFields={taskValues}>
        <ColumnsDirective>
          <ColumnDirective field="TaskID" headerText="ID"></ColumnDirective>
          <ColumnDirective field="TaskName" headerText="Name"></ColumnDirective>
          <ColumnDirective field="StartDate" format="dd-MMM-yy"></ColumnDirective>
          <ColumnDirective field="Duration" textAlign="Right"></ColumnDirective>
        </ColumnsDirective>
      </GanttComponent>
    </div>
            </div>
        </div>
    </Modal>
  )
}

GanttModal.propTypes = {
    open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
}

export default GanttModal