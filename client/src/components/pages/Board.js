import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { getBoard, moveCard, moveList } from '../../actions/board';
import { CircularProgress, Box } from '@material-ui/core';
import BoardTitle from '../board/BoardTitle';
import BoardDrawer from '../board/BoardDrawer';
import List from '../list/List';
import CreateList from '../board/CreateList';
import Members from '../board/Members';
import Navbar from '../other/Navbar';
import GanttButton from '../chart/GanttButton';
import { getSomeUser } from '../../actions/auth';

const Board = ({ match }) => {
  const board = useSelector((state) => state.board.board);
  const {user, isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [onStart, setOnStart] = useState("")
  const users = useSelector((state) => state.user.users.payload);

  const navbar = useMemo(() => {
    return <Navbar user={user}/>
  },[])

  useEffect(() => {
    dispatch(getBoard(match.params.id));
  }, [dispatch, match.params.id]);

  useEffect(() => {
    if (board?.title) document.title = board.title + ' | DSAJ Workplace';
  }, [board?.title]);

  useEffect(() => {
    board && dispatch(getSomeUser(board.members.map((member) => member.user)))
  },[dispatch, board ])

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  const onDragStart = (start) => {
    setOnStart(start.source.droppableId)
  }

  const onDragEnd = (result) => {
    const { source, destination, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (type === 'card') {
      dispatch(
        moveCard(draggableId, {
          fromId: source.droppableId,
          toId: destination.droppableId,
          toIndex: destination.index,
        })
      );
    } else {
      dispatch(moveList(draggableId, { toIndex: destination.index }));
    }
  };

  return !board ? (
    <Fragment>
      {navbar}
      <Box className='board-loading'>
        <CircularProgress />
      </Box>
    </Fragment>
  ) : (
    <div
      className='board-and-navbar'
      style={{
        backgroundImage:
          'url(' +
          (board.backgroundURL
            ? board.backgroundURL
            : 'https://images.unsplash.com/photo-1598197748967-b4674cb3c266?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2689&q=80') +
          ')',
      }}
    >
      {navbar}
      <section className='board'>
        <div className='board-top'>
          <div className='board-top-left'>
            <BoardTitle board={board} />
            <Members />
          </div>
          <div className='board-top-right' style={{display:'flex', justifyContent:'space-between', width:'25%' }}>
            <GanttButton board={board} boardId={match.params.id}/>
            <BoardDrawer />
          </div>
        </div>
        <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart}>
          <Droppable droppableId='all-lists' direction='horizontal' type='list'>
            {(provided) => (
              <div className='lists' ref={provided.innerRef} {...provided.droppableProps}>
                {board.lists.map((listId, index) => (
                  <List key={listId} listId={listId} boardId={match.params.id} index={index} dragDisbale={onStart}/>
                ))}
                {provided.placeholder}
                <CreateList />
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </div>
  );
};

export default Board;
