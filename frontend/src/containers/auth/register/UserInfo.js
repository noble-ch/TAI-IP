import React, { Component, Fragment } from "react";
import { Field, reduxForm } from "redux-form";
import renderField from "./renderField";
import { validate, asyncValidate } from "./validate";
import "../auth.css";

export class UserInfo extends Component {
  render() {
    const { nextPage } = this.props;
    const { handleSubmit } = this.props;
    return (
      <Fragment>
        <div className="form-box ">
          <form
            onSubmit={handleSubmit(nextPage)}
            className="animated wow fadeIn form-container "
          >
            <legend className="text-center form-legend"> Register </legend>
            <Field className="field"
              name="username"
              label="Username : "
              type="text"
              component={renderField}
            />

            <Field className="field"
              name="email"
              label="Email Address* : "
              type="email"
              component={renderField}
            />

            <Field className="field"
              name="password"
              label="Password : "
              type="password"
              component={renderField}
            />

            <Field className="field"
              name="password2"
              label="Confim Password"
              type="password"
              component={renderField}
            />

            <div className="centered-content">
              <div className="centered-content-inner">
                <button className="btn btn-general mt-3 btn-login">
                  {" "}
                  Next{" "}
                </button>
              </div>
            </div>
          </form>
        </div>
      </Fragment>
    );
  }
}

export default reduxForm({
  form: "register",
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate: validate,
  asyncValidate,
  asyncBlurFields: ["username", "email"],
})(UserInfo);
