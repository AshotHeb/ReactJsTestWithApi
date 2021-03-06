import styles from './textarea.module.css';
import PropTypes from 'prop-types';
const TextArea = ({ textarea, onChange, value, errorMessage }) => {
    return <div style={{ width: '100%' }}>
        <small className={styles.error}>{errorMessage ? errorMessage : ''}</small>
        <textarea
            {...textarea}
            className={`${styles.textarea} ${errorMessage ? styles.errorArea : ''}`}
            onChange={onChange}
            value={value}
        ></textarea>
    </div>
}

TextArea.propTypes = {
    input: PropTypes.shape({
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
}
export default TextArea;