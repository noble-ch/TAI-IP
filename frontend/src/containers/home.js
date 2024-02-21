import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import { Container } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import { Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/styles";
import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import CircularProgress from "@material-ui/core/CircularProgress";

import AnimatePage from "../components/AnimatePage";
import EditIcon from "@material-ui/icons/Edit";
import DeleteModal from "../components/deleteModal";
import EditModal from "../components/editModal";
import CommentModal from "../components/comments/commentModal";
import Likes from "./post_likes";
import { loadPage } from "../actions/posts_action";
import UserInfo from "./anyUserInfo";
import LeftSidebar from "./leftSidebar";
import "./home.css";

const useStyles = (theme) => ({
  avatar: {
    margin: 10,
    width: 80,
    height: 80,
  },
  card: {
    marginTop: 10,
  },
  cardHeader: {
    cursor: "pointer",
    width: "max-content",
  },
  cardContent: {
    margin: "0 10px",
    padding: "0 16px !important",
  },
  cardActionLeft: {
    marginLeft: "auto",
  },
  load: {
    margin: "10px auto",
    width: "max-content",
  },
});

class Home extends Component {
  state = {
    modalOpen: false,
    editModalOpen: false,
    commentModalOpen: false,
    modalPostTitle: "",
    modalPostId: "",
    modalPostContent: "",
    progress: false,
    userInfoOpen: false,
    selectedUser: null,
  };

  render() {
    const { classes, loadPosts } = this.props;
    const { nextPage } = this.props.posts;
    const {
      modalOpen,
      editModalOpen,
      modalPostTitle,
      progress,
      selectedUser,
      modalPostId,
      modalPostContent,
      commentModalOpen,
      userInfoOpen,
    } = this.state;

    if (loadPosts) {
      return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          {" "}
          <CircularProgress />
        </div>
      );
    }
    return (
      <div className={classes.pc}>
        <LeftSidebar />

        <div className="main-post-page align-md-center">
          {" "}
          <UserInfo
            open={userInfoOpen}
            close={this.closeUserInfo}
            user={selectedUser}
          />
          <DeleteModal
            open={modalOpen}
            handleClose={this.handleModalClose}
            postTitle={modalPostTitle}
            postId={modalPostId}
          />
          <EditModal
            open={editModalOpen}
            handleClose={this.handleModalClose}
            postTitle={modalPostTitle}
            postContent={modalPostContent}
            postId={modalPostId}
          />
          <CommentModal
            open={commentModalOpen}
            handleClose={this.handleModalClose}
            postId={modalPostId}
          />
          {this.props.posts.posts && <AnimatePage />}
          <Container maxWidth="lg">
            {this.renderPosts()}
            <div className={classes.load}>
              {nextPage && (
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={this.loadPageClicked}
                  style={{ marginRight: "5px" }}
                >
                  Load More
                </Button>
              )}
              {progress && <CircularProgress />}
            </div>
          </Container>
        </div>
      </div>
    );
  }

  renderPosts() {
    const { classes } = this.props;

    // that's because postsReducer has an object
    // and userpostsReducer has an array
    const posts = this.props.posts.posts
      ? this.props.posts.posts
      : this.props.posts;
    return posts.map((post) => {
      const p_date = moment(post.p_date).format("MM/DD/YYYY ,HH:mm");
      const u_date = moment(post.u_date).format("DD/MM/YYYY ,HH:mm");
      return (
        <Card key={post.id} className={classes.card + " post-card"}>
          <CardHeader
            className={classes.cardHeader}
            onClick={() => this.getUserInfo(post)}
            avatar={
              <Avatar
                alt=""
                src={post.owner.profile.image_path}
                className={classes.avatar}
              />
            }
            title={<h4>{post.owner.username}</h4>}
            subheader={p_date}
          />

          <CardContent className={classes.cardContent}>
            <Typography
              style={{
                borderTop: "0.5px solid var(--quaternary)",
                paddingTop: "10px",
              }}
              variant="h6"
              color="textPrimary"
              component="h6"
            >
              {post.title}
            </Typography>
            <Typography className="post-detail" variant="body2" component="i">
              {post.content}
            </Typography>
            <Typography variant="overline" color="textPrimary" component="p">
              Latest update : {u_date}
            </Typography>
          </CardContent>
          <CardActions>
            <Likes post={post} userId={this.props.authReducer.user.id} />

            <button
              variant="contained"
              className="post-btns "
              onClick={() => this.onOpenComments(post.id)}
            >
              | &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-comment-dots">&nbsp;</i>
              Comment({post.comments_count})
            </button>
            {this.renderOwnerBtn(post)}
          </CardActions>
        </Card>
      );
    });
  }

  renderOwnerBtn(post) {
    if (this.props.authReducer.user.id == post.owner.id) {
      return (
        <div>
          <button
            className="post-btns"
            style={{ marginRight: 5 }}
            color="primary"
            size="small"
            aria-label="edit"
            onClick={(e) => this.onEditePost(post.content, post.title, post.id)}
          >
            | &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-pen"></i> edit
          </button>
          <button
            className="post-btns dlt-btn"
            onClick={(e) => this.onDeletePost(post.title, post.id)}
            color="secondary"
            size="small"
            aria-label="delete"
          >
            | &nbsp;&nbsp;&nbsp;<i class="fa-solid fa-trash"></i> delete
          </button>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  handleModalClose = () => {
    this.setState({
      modalOpen: false,
      editModalOpen: false,
      commentModalOpen: false,
    });
  };

  onDeletePost = (postTitle, postId) => {
    this.setState({
      modalOpen: true,
      modalPostTitle: postTitle,
      modalPostId: postId,
    });
  };

  onEditePost = (postContent, postTitle, postId) => {
    this.setState({
      editModalOpen: true,
      modalPostTitle: postTitle,
      modalPostId: postId,
      modalPostContent: postContent,
    });
  };

  onOpenComments = (postId) => {
    this.setState({
      commentModalOpen: true,
      modalPostId: postId,
    });
  };

  loadPageClicked = () => {
    const { loadPage } = this.props;

    this.setState({ progress: true });
    loadPage(() => {
      this.setState({ progress: false });
    });
  };

  closeUserInfo = () => {
    this.setState({ userInfoOpen: false });
  };

  getUserInfo = (post) => {
    this.setState({ selectedUser: post.owner }, () => {
      // after the slectedUser state Chaged then
      // Mount the user info component
      this.setState({ userInfoOpen: true });
    });
  };
}

const mapStateToProps = (state) => {
  return { authReducer: state.authReducer };
};

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, { loadPage })(
  withStyles(useStyles)(Home)
);
