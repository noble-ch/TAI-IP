import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import "./sideBar.css";

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
        <div className="right-sidebar navbar-expand navbar-light custom-nav d-none d-lg-flex">
          <img src="../../../media/img/Gemini_Generated_Image.jpeg"></img>
          <p
            className="footer"
            style={{ fontSize: "14px", textJustify: "inter-word" }}
          >
            {" "}
            Your all-in-one social media platform designed for seamless
            networking and interaction. Connect with friends, share updates, and
            discover new connections effortlessly. With intuitive features and a
            user-friendly interface, Nobalink makes socializing online a breeze.
            Join the community today and elevate your social media experience
            with Nobalink.
          </p>
          <img src="../../../media/img/tech-network.jpg"></img>
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
