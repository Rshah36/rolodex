import React, { Component } from "react";
import Contact from "../modules/Contact.js";
import { NewStory } from "../modules/NewContactInput.js";

import { get } from "../../utilities";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
    };
  }

  // called when the "List" component "mounts", i.e.
  // when it shows up on screen
  componentDidMount() {
    document.title = "Contact List";
    get("/api/contacts").then((contactObjs) => {
      let reversedContactObjs = contactObjs.reverse();
      reversedContactObjs.map((contactObj) => {
        this.setState({ contacts: this.state.contacts.concat([contactObj]) });
      });
    });
  }

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  addNewContact = (contactObj) => {
    this.setState({
      contacts: [contactObj].concat(this.state.contacts),
    });
  };

  render() {
    let contactsList = null;
    const hasContacts = this.state.contacts.length !== 0;
    if (hasContacts) {
      contactsList = this.state.contacts.map((contactObj) => (
        <Card
          key={`Card_${contactObj._id}`}
          _id={contactObj._id}
          first_name={contactObj.first_name}
          last_name={contactObj.last_name}
          rank={contactObj.rank}
          current_unit={contactObj.current_unit}
          notes={contactObj.notes}
        />
      ));
    } else {
      contactsList = <div>No contacts!</div>;
    }
    return (
      <>
        <NewStory addNewStory={this.addNewStory} />
        {contactsList}
      </>
    );
  }
}

export default List;
