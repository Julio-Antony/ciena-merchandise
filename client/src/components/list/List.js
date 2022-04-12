import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { getList } from "../../actions/board";
import ListTitle from "./ListTitle";
import ListMenu from "./ListMenu";
import Card from "../card/Card";
import CreateCardForm from "./CreateCardForm";
import Button from "@material-ui/core/Button";

const List = ({ boardId, listId, index, dragDisable }) => {
  const [addingCard, setAddingCard] = useState(false);
  const [member, setMember] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const list = useSelector((state) =>
    state.board.board.listObjects.find((object) => object._id === listId)
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getList(listId));
  }, [dispatch, listId]);

  const createCardFormRef = useRef(null);

  const cardId = member.length > 0 && member[0].cardId

  useEffect(() => {
    addingCard && createCardFormRef.current.scrollIntoView();
  }, [addingCard]);

  return !list || (list && list.archived) ? (
    ""
  ) : (
    <Draggable
      draggableId={listId}
      index={index}
    >
      {(provided) => (
        <div
          className="list-wrapper"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="list-top">
            <ListTitle list={list} />
            <ListMenu listId={listId} />
          </div>
          <Droppable droppableId={listId} isDropDisabled={dragDisable !== cardId}
           type="card">
            {(provided) => (
              <div
                className={`list ${
                  addingCard ? "adding-card" : "not-adding-card"
                }`}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <div className="cards">
                  {list.cards.map((cardId, index) => (
                    <Card
                      key={cardId}
                      boardId={boardId}
                      cardId={cardId}
                      list={list}
                      index={index}
                      setMember={setMember}
                      user={user}
                    />
                  ))}
                </div>
                {provided.placeholder}
                {addingCard && (
                  <div ref={createCardFormRef}>
                    <CreateCardForm listId={listId} setAdding={setAddingCard} />
                  </div>
                )}
              </div>
            )}
          </Droppable>
          {!addingCard && (
            <div className="create-card-button">
              <Button variant="contained" onClick={() => setAddingCard(true)}>
                + Add a card
              </Button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
};

List.propTypes = {
  boardId: PropTypes.string.isRequired,
  listId: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

export default List;
