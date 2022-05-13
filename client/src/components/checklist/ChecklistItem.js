import React, { Fragment } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { completeChecklistItem } from "../../actions/board";
import useStyles from "../../utils/modalStyles";
import { FormControlLabel } from "@mui/material";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import { Checkbox } from "@material-ui/core";
import ChecklistDetail from "./ChecklistDetail";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ChecklistItem = ({ boardId, item, card }) => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const onComplete = async (e) => {
    dispatch(
      completeChecklistItem({
        boardId,
        cardId: card._id,
        complete: e.target.checked,
        itemId: item._id,
      })
    );
  };

  return (
    <div className={classes.checklistItem}>
        <Fragment>          
          <Accordion style={{width:"100%", padding:0}}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{height:"10px"}}
            >
              <FormControlLabel
            control={
              <Checkbox
                checked={
                  card.checklist.find((cardItem) => cardItem._id === item._id)
                    .complete
                }
                onChange={onComplete}
                name={item._id}
              />
            }
            label={item.text}
            className={classes.checklistFormLabel}
          />
            </AccordionSummary>
            <AccordionDetails>
            <ChecklistDetail item={item} card={card} boardId={boardId} />
            </AccordionDetails>
          </Accordion>
        </Fragment>
    </div>
  );
};

ChecklistItem.propTypes = {
  boardId: PropTypes.string.isRequired,
  item: PropTypes.object.isRequired,
  card: PropTypes.object.isRequired,
};

export default ChecklistItem;
