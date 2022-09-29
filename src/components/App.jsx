import { Component } from "react";
import { nanoid } from "nanoid";
import FormAddContact from "./FormAddContact/FormAddContact";
import ContatList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export class App extends Component {

  state = {
    contacts: [],
    filter: '',
  }

  componentDidMount() {
    const savedData = localStorage.getItem("contacts");
    if (savedData) {
      const savedContacts = JSON.parse(savedData);
      if (savedContacts.length !== 0) {
        this.setState({contacts: savedContacts})
      }
    }
  }

  componentDidUpdate(prevProp, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem("contacts", JSON.stringify(contacts))
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  addContact = (contact) => {
    if (this.isDublicate(contact.name)) {
      return alert(`${contact.name} is already in contacts.`)
    }
    this.setState((prevState) => {
      const newContact = {
          id: nanoid(),
          ...contact
      }
      return {
        contacts: [...prevState.contacts, newContact]
        
      }
    })
  }

  deleteContact = (id) => {
    this.setState((prevState) => {
      const refreshedContacts = prevState.contacts.filter((contact) => contact.id !== id);
      return {
        contacts: refreshedContacts
      }
    })
  }
  
  getFilteredContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizedFilter = filter.toLocaleLowerCase();
    const filteredContacts = contacts.filter(({ name }) => {
      const normalizedName = name.toLocaleLowerCase();
      const result = normalizedName.includes(normalizedFilter);
      return result;
    })
    return filteredContacts;
  }

  isDublicate(name) {
    const { contacts } = this.state;
    const result = contacts.find((contact) => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase());
    return result
  }

  render() {
    const { filter } = this.state;
    const { addContact, handleChange, deleteContact } = this;
    const contacts = this.getFilteredContacts();

     return (
       <div style={{
        padding: "15px",
        fontSize: "20px",
        color: "#010101"
      }}>
         <h1>Phonebook</h1>        
         <FormAddContact onSubmit={addContact} />
         <h2>Contacts</h2>
         <Filter
           handleChange={handleChange}
           filter={filter} />
         <ContatList
           contacts={contacts}
           deleteContact={deleteContact} />
      </div>
    )
  }
};
