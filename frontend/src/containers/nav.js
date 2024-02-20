import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth_actions";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import AddModal from "../components/addModal";

class Nav extends Component {
  render() {
    const { progress, open } = this.state;
    const { user } = this.props.authReducer;
    return (
      <div className="user-info-box">
        <AnimatePage />
        <UserPost
          open={open}
          user={user}
          close={() => this.setState({ open: false })}
        />
        <div className="container user-info-box-inner">
          <div className="user-info-header">
            <div className="user-image-wrap">
              <img src={user.profile.image_path} className="user-image" />
              <div className="change-image-box">
                <label
                  htmlFor="change-image-input"
                  className="change-image-label"
                >
                  <i
                    style={{ color: "white" }}
                    className="fa fa-camera fa-3x"
                  ></i>
                </label>
                <input
                  className="radio-input"
                  id="change-image-input"
                  type="file"
                  onChange={(e) => this.ImageChanged(e)}
                />
              </div>
            </div>
            <div className="user-username">
              <p
                onClick={() => this.setState({ open: true })}
                style={{ cursor: "pointer" }}
              >
                {user.username}
              </p>
            </div>
          </div>
          <div className="user-info-main">{this.renderValues()}</div>
        </div>
        <div className="modul hidden" ref="modul">
          <div className="module-inner">
            <ReactCrop
              src={this.state.src}
              crop={this.state.crop}
              onImageLoaded={this.onImageLoaded}
              onComplete={this.onCropComplete}
              onChange={this.onCropChange}
            />
            <div>
              <button
                className="btn btn-secondary mt-2 mr-3"
                onClick={this.closeModul.bind(this)}
              >
                cancel
              </button>
              <button
                className="btn btn-outline-primary mt-2 mr-3"
                onClick={this.updateUserImageFunc}
              >
                update
              </button>
              {progress ? <CircularProgress /> : ""}
            </div>
          </div>
        </div>
      </div>
    );
  }
  state = {
    open: false,
  };

  handleModal = () => {
    this.setState({ open: false });
  };
  onOpenModal = () => {
    this.setState({ open: true });
  };

  render() {
    return (
      <nav className="navbar navbar-expand navbar-light custom-nav">
        <AddModal open={this.state.open} onClose={this.handleModal} />
        <div className="container">
          <a className="navbar-brand" href="#">
            ChatChita
          </a>
          <div className="collapse navbar-collapse">
            {this.renderLeftLinks()}
          </div>
        </div>
      </nav>
    );
  }

  renderLeftLinks() {
    const { isAuthenticated } = this.props.authReducer;
    if (isAuthenticated) {
      const { username } = this.props.authReducer.user;
      const { user } = this.props.authReducer;

      return (
        <ul className="navbar-nav ml-auto">
          <button
            className="fab"
            color="secondary"
            size="small"
            aria-label="delete"
            style={{ marginRight: 8 }}
            onClick={this.onOpenModal}
          >
            Create a Post
          </button>

          <li className="nav-item">
            <Link
              style={{
                height: "35px",
                width: "35px",
                borderRadius: "50%",
                margin: "0px",
                padding: "0px",
              }}
              className="btn btn-sm btn-outline-info"
              to="/user-info"
            >
              {/* {username} */}
              <img
                height={"35px"}
                width={"35px"}
                style={{ borderRadius: "50%" }}
                src={user.profile.image_path}
                className="profile-setting-img"
              />
            </Link>
          </li>
          <li className="nav-item" style={{ margin: "auto 0" }}>
            <button
              onClick={this.props.logout}
              className="btn btn-sm btn-outline-danger ml-2"
              to="/"
            >
              Logout
            </button>
          </li>
        </ul>
      );
    } else {
      return (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </li>
        </ul>
      );
    }
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};
export default connect(mapStateToProps, { logout })(Nav);