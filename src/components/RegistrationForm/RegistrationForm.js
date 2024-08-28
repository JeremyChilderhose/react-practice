import React from 'react';
import styles from "./RegistrationForm.module.css"
import InputField from '../shared/InputField/InputField';

const RegistrationForm = () => (
 <div data-testid="RegistrationForm">
    <div className={styles.registrationBox}>
      <h2>Register</h2>

      <InputField />
    </div>
 </div>
);

RegistrationForm.propTypes = {};

export default RegistrationForm;
