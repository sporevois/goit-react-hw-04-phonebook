import { Component } from "react";
import PropTypes from 'prop-types';
import styles from "../FormAddContact/FormAddContact.module.css"

export default class FormAddContact extends Component {
    state = {
        name: '',
        number: '',
    }
    handleSubmit = (event) => {
        event.preventDefault();
        const { name, number } = this.state;
        this.props.onSubmit({ name, number });
        this.setState({
            name: '',
            number: '',
        })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    }

   
    render() {
        const { name, number } = this.state;
        const { handleSubmit, handleChange } = this;
        return (
            <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.title}>
                Name
                <input
                    className={styles.field}
                    type="text"
                    name="name"
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                    required
                    value = {name}
                    onChange={handleChange}
                />
            </label>
            <label className={styles.title}>
                Number
                <input
                    className={styles.field}
                    type="tel"
                    name="number"
                    pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                    title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                    required
                    value={number}
                    onChange={handleChange}
                />
            </label>
                <button className={styles.btn} type="submit">Add contact</button>
          </form>
        )
    }
}

FormAddContact.propTypes = {
    onSubmit: PropTypes.func.isRequired
}