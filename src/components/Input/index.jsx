import React from 'react';
import styles from './input.module.css';
import PropTypes from 'prop-types';

const Input = ({ input, onChange, value, errorMessage  }) => {
    return (
        <div style={{ width: '100%' }}>
            <small className={styles.error}>{errorMessage ? errorMessage : ''}</small>
            <input
                {...input}
                className={`${styles.input} ${errorMessage ? styles.errorArea : ''}`}
                onChange={onChange}
                value={value}
            />
        </div>

    );

};
Input.propTypes = {
    input: PropTypes.shape({
        placeholder: PropTypes.string,
        type: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired
    }),
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
    errorMessage: PropTypes.string
}

export default Input;