import React, { Fragment } from "react";
import PropTypes from 'prop-types';
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import useStyles from "../../utils/modalStyles";
import AttachmentItem from "./AttachmentItem";

const Attachment = ({ card }) => {
  const classes = useStyles();

  if (!card) {
    return <></>;
  }

  return (
    <Fragment>
      {card.attachment.length > 0 && (
      <h3 className={classes.header} style={{ marginTop: "30px" }}>
        Attachment
      </h3>
      )}
      {card.attachment.map((doc, index) => (
        <div>
          <AttachmentItem key={index} doc={doc} card={card} style={classes.modalSection}/>
        </div>
      ))}
    </Fragment>
  );
};

Attachment.propTypes = {
  card: PropTypes.object.isRequired,
};

export default Attachment;
