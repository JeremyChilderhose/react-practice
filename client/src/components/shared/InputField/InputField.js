import React from 'react';
import PropTypes from 'prop-types';
import styles from './InputField.module.css';
import ProfileIcon from '../../../assets/icons/ProfileIcon.svg'; 
import LockIcon from '../../../assets/icons/LockIcon.svg'; 
import OpenEye from '../../../assets/icons/OpenEye.svg';
import ClosedEye from '../../../assets/icons/ClosedEye.svg';
import EmailIcon from '../../../assets/icons/EmailIcon.svg';

const InputField = ({
    inputFieldType = "Input",
    isPasswordHidden = true,
    value = '',
    hasError = false,
    validateFunction = () => {},
    onChangeFunction = () => {},
    onClickFunction = () => {},
    placeholder = '',
    fieldAriaLabel = 'Input Field',
    buttonAriaLabel = 'Input Toggle Button',
    iconLabel = 'Icon Label'
}) => {
    const handleBlur = () => {
        validateFunction(); // Call validateFunction on blur
    };

    return (
        <div className={styles.inputContainer}>
            { (inputFieldType === "username" || inputFieldType === "email") && (
                <div className={`${styles.inputWrapper} ${hasError ? styles.error : ''}`}>
                    <div className={styles.inputWrapper}>
                        {inputFieldType === "username" && <img src={ProfileIcon} alt={iconLabel} className={styles.icon} />}
                        {inputFieldType === "email" && <img src={EmailIcon} alt={iconLabel} className={styles.icon} />}
                        <input 
                            aria-label={fieldAriaLabel}
                            name={fieldAriaLabel}
                            type={inputFieldType === 'email' ? 'email' : 'text'}
                            value={value}
                            onBlur={handleBlur} // Use handleBlur here
                            onChange={(e) => onChangeFunction(e.target.value)}
                            required
                            placeholder={placeholder}
                        />
                    </div>
                </div>
            )}

            { inputFieldType === "password" && (
                <div className={`${styles.inputWrapper} ${hasError ? styles.error : ''}`}>
                    <img src={LockIcon} alt={iconLabel} className={styles.icon} />
                    <input 
                        type={isPasswordHidden ? "password" : "text"}
                        name={fieldAriaLabel}
                        value={value}
                        onBlur={handleBlur} // Use handleBlur here
                        onChange={(e) => onChangeFunction(e.target.value)}  
                        required
                        placeholder={placeholder}  
                        aria-label={fieldAriaLabel}  
                    />
                    <button
                        type="button"
                        className={styles.eyeButton}
                        onClick={onClickFunction}  
                        aria-label={buttonAriaLabel}
                    >
                        {isPasswordHidden 
                            ? <img src={OpenEye} alt={buttonAriaLabel} className={styles.eyeIcon} />
                            : <img src={ClosedEye} alt={buttonAriaLabel} className={styles.eyeIcon} />
                        }
                    </button>
                </div>
            )} 
        </div> 
    );
}

InputField.propTypes = {
    inputFieldType: PropTypes.oneOf(["username", "password", "email"]),
    isPasswordHidden: PropTypes.bool,    
    value: PropTypes.string,             
    hasError: PropTypes.bool, 
    validateFunction: PropTypes.func,  // Updated PropTypes
    onChangeFunction: PropTypes.func.isRequired, 
    onClickFunction: PropTypes.func,   
    placeholder: PropTypes.string,       
    fieldAriaLabel: PropTypes.string,  
    iconLabel: PropTypes.string       
};
 
export default InputField;
