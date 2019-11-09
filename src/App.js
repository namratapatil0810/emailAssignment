import React, { Component } from "react";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

export default class App extends Component {
  state = {
    emailValue: "",
    valid: false,
    emails: [],
    error: false,
    show: ""
  };
  onChangeHandler = e => {
    let email = e.target.value;
    this.setState({ emailValue: email, valid: this.validate(email) });
  };

  validate = value => {
    return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(
      value
    );
  };

  onAdd = () => {
    if (this.state.valid == true) {
      let data = this.state.emails;
      for (let i = 0; i <= data.length; i++) {
        if (data.length != 0) {
          if (data[i].value == this.state.emailValue) {
            return this.setState({ error: "Duplicate Entry" });
          } else {
            let newEmail = { value: this.state.emailValue, enable: false };
            let updatedEmails = [...this.state.emails, newEmail];
            return this.setState({
              emails: updatedEmails,
              emailValue: "",
              valid: false,
              error: false
            });
          }
        }
        let newEmail = { value: this.state.emailValue, enable: false };
        let updatedEmails = [...this.state.emails, newEmail];
        return this.setState({
          emails: updatedEmails,
          emailValue: "",
          valid: false,
          error: false
        });
      }
    } else {
      this.setState({ error: "Please Provide valid Email" });
    }
  };

  onDelete = index => {
    let updatedEmails = this.state.emails;
    updatedEmails.splice(index, 1);
    this.setState({ emails: updatedEmails });
  };

  onEnable = (e, index) => {
    let checked = e.target.checked;
    let updatedEmails = this.state.emails;
    let newEmail = { value: e.target.value, enable: checked };
    updatedEmails.splice(index, 1, newEmail);
    this.setState({ emails: updatedEmails });
  };

  onShowEnable = e => {
    if (e.target.checked == true) {
      this.setState({ show: "enable" });
    } else {
      this.setState({ show: "" });
    }
  };

  render() {
    return (
      <div className="center">
        <input
          className={this.state.error != "" ? "error" : "emailInput"}
          type="email"
          id="email"
          value={this.state.emailValue}
          onChange={e => {
            this.onChangeHandler(e);
          }}
        ></input>
        <button className="button" onClick={this.onAdd}>
          Add
        </button>
        {this.state.error != "" ? (
          <p className="error-msg">{this.state.error}</p>
        ) : null}
        <div className="container">
          {this.state.emails != "" ? (
            <div>
              <input
                className="check-box"
                type="checkbox"
                name="enable"
                value={this.state.show}
                onClick={e => {
                  this.onShowEnable(e);
                }}
              />
              Show Enabled
            </div>
          ) : null}
          {this.state.show == "enable" ? (
            <ul>
              {this.state.emails.map((eachEmail, index) => {
                if (eachEmail.enable == true) {
                  return (
                    <li className="emailBox">
                      <input
                        className="check-box"
                        type="checkbox"
                        name=""
                        value={eachEmail.value}
                        onClick={e => {
                          this.onEnable(e, index);
                        }}
                      />
                      {eachEmail.value}
                      <FontAwesomeIcon
                        className="deleteIcon"
                        color="black"
                        icon={faTrash}
                        onClick={index => {
                          this.onDelete(index);
                        }}
                      />
                    </li>
                  );
                }
              })}
            </ul>
          ) : (
            <ul>
              {this.state.emails.map((eachEmail, index) => {
                return (
                  <li className="emailBox">
                    <input
                      className="check-box"
                      type="checkbox"
                      name=""
                      value={eachEmail.value}
                      onClick={e => {
                        this.onEnable(e, index);
                      }}
                    />
                    {eachEmail.value}
                    <FontAwesomeIcon
                      className="deleteIcon"
                      color="black"
                      icon={faTrash}
                      onClick={index => {
                        this.onDelete(index);
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    );
  }
}
