import React, { useState } from 'react';
import styles from './PasswordResetForm.module.css';
import InputField from '../shared/InputField/InputField';

const PasswordResetForm = () => {
   const [email, setEmail] = useState('')
 
   return (
      <div>
         <div className={styles.resetPasswordBox}>
            <h2>Reset Password</h2>

            <InputField 
              inputFieldType="email"
              value={email}
              onChangeFunction={setEmail}
              placeholder="Email on your account"
              ariaLabel="Email Field"
            />
         </div>
      </div>
)};

PasswordResetForm.propTypes = {};

export default PasswordResetForm;
