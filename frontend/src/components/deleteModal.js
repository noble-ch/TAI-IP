import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

import { deletePost } from "../actions/posts_action";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50% ,-50%)",
    width: "95vmin",
    maxHeight: "50%",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      marginTop: "3px",
      backgroundColor: "var(--quaternary)",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "var(--user-bg2)",
      borderRadius: "10px",
    },
    background: "var(--bg-white)",
    borderRadius: "10px",
    padding: theme.spacing(2, 4, 3),
    color: "#ccc",
  },
  button: {
    margin: theme.spacing(1),
    background:
      "radial-gradient( rgba(255,255,255,0.8), rgba(225,235,235,0.8))",
    borderRadius: "20px",
    textTransform: "capitalize",
    color: "black",
  },

  h3: {
    fontSize: "20px",
    color: "#000",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #000",
  },
  cancel: {
    marginRight: "5px",
  },
  btnDiv: {
    textAlign: "end",
  },
  span: {
    fontWeight: "bold",
  },
  delete: {
    marginRight: "5px",
    background:
      "radial-gradient( rgba(255,255,255,0.8), rgba(255,225,225,0.8))",
  },
}));

function DeleteModal({ open, handleClose, postTitle, postId, deletePost }) {
  const classes = useStyles();

  // state to control the progress waiting component
  const [progress, setProgress] = useState(false);

  const cancelDelete = () => {
    handleClose();
  };

  const onDeleteClicked = () => {
    setProgress(true);
    deletePost(postId, () => {
      handleClose();
      setProgress(false);
    });
  };

  return (
    <Modal
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      open={open}
      onClose={handleClose}
    >
      <div className={classes.paper}>
        <h3 className={classes.h3}>
          {" "}
          Are you sure you want to delete "&nbsp;
          <i className={classes.span}>{postTitle}</i> &nbsp;" post{" "}
        </h3>
        <div className={classes.btnDiv}>
          <Button
            className={classes.button}
            onClick={cancelDelete}
            variant="contained"
          >
            {" "}
            Cancel{" "}
          </Button>
          <Button
            style={{
              background: "rgba(255,155,155,0.8)",
            }}
            className={classes.button + "   delete"}
            variant="contained"
            color="secondary"
            onClick={() => onDeleteClicked(postId)}
          >
            {" "}
            Yes{" "}
          </Button>
          <CircularProgress
            style={progress ? { display: "inline-block" } : { display: "none" }}
            color="secondary"
          />
        </div>
      </div>
    </Modal>
  );
}

export default connect(null, { deletePost })(DeleteModal);
