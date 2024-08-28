import React from 'react';
import PropTypes from 'prop-types';
import styles from './SubmitButton.module.css';

const SubmitButton = ({
    isDisabled = false,   
    buttonText = 'Submit', 
    submitFunction = () => {}, 
  }) => {
    return (
        <button 
            type="submit" 
            className={styles.submitButton} 
            disabled={isDisabled} 
            aria-label={buttonText + " button"}
            onClick={submitFunction} 
        >
            {buttonText}
        </button>
    );
};

SubmitButton.propTypes = {
    isDisabled: PropTypes.bool,   
    buttonText: PropTypes.string,  
    submitFunction: PropTypes.func 
};

export default SubmitButton;