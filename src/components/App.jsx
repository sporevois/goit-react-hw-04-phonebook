import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import FormAddContact from "./FormAddContact/FormAddContact";
import ContatList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";

export const App = () => {
  const [contacts, setContacts] = useState(() => {
    // getting stored value
    const saved = localStorage.getItem("contacts");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [filter, setFilter] = useState('');


  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts))
  }, [contacts]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'filter': return setFilter(value);
      default: return
    }
  }

  const addContact = (name, number) => {
    if (isDublicate(name)) {
      return alert(`${name} is already in contacts.`)
    }
    const newContact = {
      id: nanoid(),
      name,
      number,          
    }
    setContacts((prev)=>[...prev, newContact])
  }

  const deleteContact = (id) => {
    setContacts((prev) => {
      return prev.filter((contact) => contact.id !== id);
    })
  }
  
  const getFilteredContacts = () => {
    if (!filter) {
      return contacts;
    }
    return contacts.filter(contact => contact.name.toLowerCase().includes(filter));
  }

  const isDublicate = (name) => {
    return contacts.find((contact) => contact.name.toLocaleLowerCase() === name.toLocaleLowerCase());
  }

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
           contacts={getFilteredContacts()}
           deleteContact={deleteContact} />
      </div>
  )
}


