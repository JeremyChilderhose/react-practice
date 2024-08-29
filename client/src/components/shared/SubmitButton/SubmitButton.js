import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

const SubmitButton = ({
    isDisabled = false,   
    buttonText = 'Submit', 
    buttonAriaLabel = 'Submit Button',
    submitFunction = () => {}, 
  }) => {
    return (
        <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isDisabled} 
            aria-label={buttonAriaLabel}
            onClick={submitFunction} 
        >
            {buttonText}
        </button>
    );
};

SubmitButton.propTypes = {
    isDisabled: PropTypes.bool,   
    buttonText: PropTypes.string,
    buttonAriaLabel: PropTypes.string,  
    submitFunction: PropTypes.func 
};

export default SubmitButton;