import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../actions/auth_actions";
import AddModal from "../components/addModal";
import "./leftSidebar.css";
import UserInfo from "./auth/register/UserInfo";

class LeftSidebar extends Component {
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
          <div>
            <p
              onClick={() => this.setState({ open: true })}
              style={{ cursor: "pointer" }}
            >
              {user.username}
            </p>
          </div>

          <div className="user-info-main">{this.renderValues()}</div>
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
      <div className="left-sidebar  navbar-expand navbar-light custom-nav d-none d-lg-flex">
        <div className="container  ">
          <div className="user-info-sb">{this.renderLeftLinks()}</div>
        </div>
      </div>
    );
  }

  renderLeftLinks() {
    const { isAuthenticated } = this.props.authReducer;
    if (isAuthenticated) {
      const { username } = this.props.authReducer.user;
      const { user } = this.props.authReducer;

      return (
        <div className=" ">
          <div className="">
            <Link
              style={{
                height: "100px",
                width: "100px",
                borderRadius: "50%",
                padding: "0px",
              }}
              className="btn btn-sm "
              to="/user-info"
            >
              <img
                height={"100px"}
                width={"100px"}
                style={{ borderRadius: "50%" }}
                src={user.profile.image_path}
                className="profile-setting-img"
              />
            </Link>
            <p className="full-name">
              {user.first_name + "  " + user.last_name}
            </p>
            <p className="user-name"> {"@" + username}</p>

            <p className="mail">{user.email}</p>
            <p>{user.UserInfo}</p>
          </div>
        </div>
      );
    } else {
      return (
        <div className="navbar-nav ml-auto">
          <div className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </div>
          <div className="nav-item">
            <Link className="nav-link" to="/register">
              Register
            </Link>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};
export default connect(mapStateToProps)(LeftSidebar);
