import { Button } from '@material-ui/core'
import React, { Fragment, useState } from 'react'
import useStyles from '../../utils/drawerStyles';
import BarChartIcon from '@material-ui/icons/BarChart';
import GanttChart from './GanttChart';
import Modals from '../card/Modals';

const GanttButton = ({board}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
      
  return (
    <Fragment>
      {/* <GanttChart openGantt={openModal} setOpenGantt={setOpenModal} board={board}/> */}
      <Modals open={openModal} setOpen={setOpenModal} type={"modal-gantt"}/>
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

export default GanttButton