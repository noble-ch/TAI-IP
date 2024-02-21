import React, { useState } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

import { addPost } from "../actions/posts_action";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "relative",
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
  h2: {
    color: "#102016",
    padding: "1rem 0",
    marginBottom: "1.5rem",
    borderBottom: "white solid",
    textAlign: "center",
  },
  button: {
    margin: theme.spacing(1),
    background:
      "radial-gradient( rgba(255,255,255,0.8), rgba(225,235,235,0.8))",
    borderRadius: "20px",
    textTransform: "capitalize",
    color: "black",
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}));

function AddModal({ open, onClose, addPost }) {
  const classes = useStyles();

  const [values, setValues] = useState({
    title: "",
    content: "",
  });

  // state to control the progress waiting component
  const [progress, setProgress] = useState(false);

  const onInputChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onClose2 = (e) => {
    setValues({ title: "", content: "" });
  };

  const onBtnClicked = (e) => {
    e.preventDefault();
    setProgress(true);
    addPost(values, () => {
      onClose();
      onClose2();
      setProgress(false);
    });
  };
  return (
    <div>
      <Modal
        aria-labelledby="title"
        aria-describedby="description"
        open={open}
        onClose={() => {
          onClose();
          onClose2();
        }}
      >
        <div className={classes.paper}>
          <h2 className={classes.h2} id="title">
            Add A New Post
          </h2>
          <form id="description" onSubmit={onBtnClicked}>
            <TextField
              required
              label="Title"
              type="text"
              value={values.title}
              onChange={onInputChange}
              name="title"
              fullWidth={true}
            />
            <TextField
              required
              name="content"
              label="Content"
              multiline={true}
              rowsMax="4"
              value={values.content}
              onChange={onInputChange}
              margin="normal"
              fullWidth={true}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
            >
              <i class="far fa-paper-plane"></i>&nbsp;Create
            </Button>
            <CircularProgress
              style={
                progress ? { display: "inline-block" } : { display: "none" }
              }
            />
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default connect(null, { addPost })(AddModal);
