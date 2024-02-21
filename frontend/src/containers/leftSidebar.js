import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./leftSidebar.css";
import UserInfo from "./auth/register/UserInfo";
import { getUserPosts } from "../actions/posts_action";

class LeftSidebar extends Component {
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
    const { isAuthenticated, user } = this.props.authReducer;

    if (isAuthenticated) {
      return (
        <div className="left-sidebar navbar-expand navbar-light custom-nav d-none d-lg-flex">
          <div className="container">
            <div className="user-info-sb">
              <div className="">
                <Link
                  style={{
                    height: "120px",
                    width: "120px",
                    borderRadius: "50%",
                    padding: "0px",
                  }}
                  className="btn btn-sm "
                  to="/user-info"
                >
                  <img
                    height={"120px"}
                    width={"120px"}
                    style={{ borderRadius: "50%" }}
                    src={user.profile.image_path}
                    className="profile-setting-img"
                  />
                </Link>
                <p className="full-name">
                  {user.first_name + "  " + user.last_name}
                </p>
                <p className="user-name">{"@" + user.username}</p>

                <p className="mail">{user.email}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="navbar-nav ml-auto"></div>;
    }
  }
}

const mapStateToProps = ({ authReducer }) => {
  return { authReducer };
};

export default connect(mapStateToProps)(LeftSidebar);
