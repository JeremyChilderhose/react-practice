import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';
import ProfileIcon from '../../../assets/icons/ProfileIcon.svg'; 
import LockIcon from '../../../assets/icons/LockIcon.svg'; 
import OpenEye from '../../../assets/icons/OpenEye.svg';
import ClosedEye from '../../../assets/icons/ClosedEye.svg';
import EmailIcon from '../../../assets/icons/EmailIcon.svg'

const InputField = ({
    inputFieldType = "Input",
    isPasswordHidden = true,
    value = '',
    onChangeFunction = () => {},
    onClickFunction = () => {},
    placeholder = '',
    ariaLabel = 'Input Field',
}) => {
    return (
        <div>
            { (inputFieldType === "username" || inputFieldType === "email") && (
                <div className={styles.inputContainer}>
                    <div className={styles.inputWrapper}>
                    {inputFieldType === "username" && <img src={ProfileIcon} alt="Profile Icon" className={styles.icon} /> }
                    {inputFieldType === "email" && <img src={EmailIcon} alt="Email Icon" className={styles.icon} /> }
                    <input 
                        aria-label={ariaLabel}
                        name={ariaLabel}
                        type="text"
                        value={value}
                        onChange={(e) => onChangeFunction(e.target.value)}
                        required
                        placeholder={placeholder}
                    />
                    </div>
                </div>
            )}

            { inputFieldType === "password" && (
            <div className={styles.inputWrapper}>
                <img src={LockIcon} alt="Lock Icon" className={styles.icon} />
                <input 
                    type={isPasswordHidden ? "password" : "text"}
                    name={ariaLabel}
                    value={value}
                    onChange={(e) => onChangeFunction(e.target.value)}  
                    required
                    placeholder={placeholder}  
                    aria-label={ariaLabel}  
                />
                <button
                    type="button"
                    className={styles.eyeButton}
                    onClick={onClickFunction}  
                    aria-label={isPasswordHidden ? "Show Password Button" : "Hide Password Button"}
                >
                    {isPasswordHidden 
                        ? <img src={OpenEye} alt="Show Password button" className={styles.eyeIcon} />
                        : <img src={ClosedEye} alt="Hide Password button" className={styles.eyeIcon} />
                    }
                </button>
            </div>
        )} 
    </div> 
    );
}

InputField.propTypes = {
    inputFieldType: PropTypes.oneOf(["username", "password", "email"]), // Ensure only these values are accepted
    isPasswordHidden: PropTypes.bool,    // Boolean to toggle password visibility
    value: PropTypes.string,             // Current value of the input field
    onChangeFunction: PropTypes.func.isRequired, // Function to handle input changes
    onClickFunction: PropTypes.func,   // Function to handle button click (optional)
    placeholder: PropTypes.string,       // Placeholder text for the input field
    ariaLabel: PropTypes.string,         // Aria label for accessibility
};
 
export default InputField;