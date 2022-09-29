import PropTypes from 'prop-types';
import styles from "../ContactList/ContactList.module.css"

const ContatList = ({ contacts, deleteContact }) => {
    return (
        <ul>
            {contacts.map(({id, name, number} )=> (
                <li key={id} className={styles.item}>
                    {name}: {number}
                    <button className={styles.btn} type="button" onClick={() => deleteContact(id)}>Delete</button>
                </li>
            ))}
        </ul>    
    )
}

ContatList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired,
    })),
    deleteContact: PropTypes.func.isRequired
}
export default ContatList;

