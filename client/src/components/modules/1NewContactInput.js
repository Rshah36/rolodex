import React, { Component } from "react";

import "./NewContactInput.css";

/**
 * New Contact is a parent component for all input components
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 * @param {({contactId, value}) => void} onSubmit: (function) triggered when this contact is submitted, takes {storyId, value} as parameters
 */
class NewContactInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
    };
  }

  // called whenever the user types in the new contact input box
  handleChange = (event) => {
    this.setState({
      value: event.target.value,
    });
  };

  // called when the user hits "Submit" for a new contact
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit(this.state.value);
    this.setState({
      firstName: "",
      lastName: "",
      rank: "",
      currentUnit: "",
      notes: "",
    });
  };

  render() {
    return (
      <div className="u-flex">
        <input
          type="text"
          placeholder={this.props.defaultText}
          value={this.state.value}
          onChange={this.handleChange}
          className="NewContactInput-input"
        />
        <button
          type="submit"
          className="NewContactInput-button u-pointer"
          value="Submit"
          onClick={this.handleSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

/**
 * New Contact is a NewContactinput component for creating contacts
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewContact extends Component {
  addContact = (value) => {
    const body = { content: value };
    post("/api/contact", body).then((story) => {
      // display this story on the screen
      this.props.addContact(story);
    });
  };

  render() {
    return <NewContactInput defaultText="New Contact" onSubmit={this.addContact} />;
  }
}

export { NewContact };
