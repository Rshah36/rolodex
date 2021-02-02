import React, { Component } from "react";

import "./NewContactInput.css";

/**
 * New Contact is a component for inputting contacts
 *
 * Proptypes
 * @param {string} defaultText is the placeholder text
 */
class NewContact extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstName: "",
            lastName: "",
            rank: "",
            currentUnit: "",
            notes: "",
        };
    }

    // called whenever the user types in the new contact input box
    handleChange = (event) => {
        const id = event.target.id
        this.setState({
        [id]: event.target.value,
        });
    };

    addContact = (state) => {
        //replicate state, for the api body
        const body = JSON.parse(JSON.stringify(state));
        post("/api/contact", body).then((story) => {
          // display this story on the screen
          this.props.addContact(story);
        });
      };

    // called when the user hits "Submit" for a new contact
    handleSubmit = (event) => {
        event.preventDefault();
        this.props.addContact && this.props.addContact(this.state);
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
            id="firstName"
            placeholder="First Name"
            value={this.state.firstName}
            onChange={this.handleChange}
            className="NewContactInput-input"
        />
        <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={this.state.lastName}
            onChange={this.handleChange}
            className="NewContactInput-input"
        />
        <input
            type="text"
            id="rank"
            placeholder="Rank"
            value={this.state.rank}
            onChange={this.handleChange}
            className="NewContactInput-input"
        />
        <input
            type="text"
            id="currentUnit"
            placeholder="Current Unit"
            value={this.state.currentUnit}
            onChange={this.handleChange}
            className="NewContactInput-input"
        />
        <input
            type="text"
            id="notes"
            placeholder="Notes"
            value={this.state.notes}
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