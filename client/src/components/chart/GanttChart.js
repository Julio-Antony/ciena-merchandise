import { Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import useStyles from '../../utils/drawerStyles';
import BarChartIcon from '@material-ui/icons/BarChart';
import GanttModal from './GanttModal';

const GanttChart = () => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
      
  return (
    <Fragment>
      <GanttModal open={openModal} setOpen={setOpenModal}/>
      <Button variant='contained' className={classes.showMenuButton} onClick={()=> setOpenModal(true)}>
        <BarChartIcon 
        style={{transform:"rotate(90deg)", marginRight:'10px'}} 
        fontSize='small'       
        />
        gantt chart
      </Button>
    </Fragment>
  )
}

export default GanttChart