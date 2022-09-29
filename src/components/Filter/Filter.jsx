import PropTypes from 'prop-types';
import styles from "../Filter/Filter.module.css";

const Filter = ({ filter, handleChange }) => {
    return (
        <label className={styles.title}>
            Find conacts by name
            <input
                className={styles.field}
                type="text"
                name="filter"
                value = {filter}
                onChange={handleChange}
            />
        </label>
    )
}

Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
}
export default Filter;