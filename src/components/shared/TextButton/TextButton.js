import React from 'react';
import PropTypes from 'prop-types';
import styles from './TextButton.module.css'; 

const TextButton = ({
    textButtonType = "signup",
    onClickFunction = () => {}, 
    ariaLabel = '', 
    textContent = '', 
}) => {
    return (
        <div>
            { textButtonType === "signup" && 
                <button 
                    type="button" 
                    className={styles.signupButton} 
                    onClick={onClickFunction} 
                    aria-label={ariaLabel}>
                        {textContent}
                </button>
            }

            { textButtonType === "forgotPassword" && 
                <div className={styles.actions}>
                    <button 
                        type="button" 
                        className={styles.forgotPassword} 
                        onClick={onClickFunction} 
                        aria-label={ariaLabel} 
                    >
                        {textContent}
                    </button>
                </div>
            }
        </div>
    );
}

TextButton.propTypes = {
    textButtonType: PropTypes.string,
    onClickFunction: PropTypes.func, // Prop type for the onClick function
    ariaLabel: PropTypes.string,      // Prop type for the aria-label
    textContent: PropTypes.string,   // Prop type for the button text
};

export default TextButton;