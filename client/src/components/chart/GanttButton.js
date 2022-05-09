import { Button } from '@material-ui/core'
import React, { Fragment, useEffect, useState } from 'react'
import useStyles from '../../utils/drawerStyles';
import BarChartIcon from '@material-ui/icons/BarChart';
import Modals from '../card/Modals';
import { useDispatch, useSelector } from 'react-redux';
import { getBoard } from '../../actions/board';

const GanttButton = ({boardId}) => {
  const classes = useStyles();
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const board = useSelector((state) => state.board.board);

  const onOpenDialog = async (e) => {
    setOpenModal(true)
    } 

  useEffect(() => {
    dispatch(getBoard(boardId));
  },[dispatch, boardId])
      
  return (
    <Fragment>
      {/* <GanttChart openGantt={openModal} setOpenGantt={setOpenModal} board={board}/> */}
      <Modals open={openModal} setOpen={setOpenModal} chart={board} type={"modal-gantt"}/>
      <Button variant='contained' className={classes.showMenuButton} onClick={onOpenDialog}>
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