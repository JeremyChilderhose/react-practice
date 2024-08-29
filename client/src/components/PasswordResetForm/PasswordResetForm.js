import React, { useState } from 'react';
import styles from './PasswordResetForm.module.css';
import InputField from '../shared/InputField/InputField';
import { useTranslation } from 'react-i18next'; 
import SubmitButton from '../shared/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import TextButton from '../shared/TextButton/TextButton';

const PasswordResetForm = () => {
   const [email, setEmail] = useState('')
   const { t } = useTranslation()
   const navigate = useNavigate();

   const clickReset = () => {
      //ToDo: send reset request
      navigate('/')
   }

   const clickBackToLogin = () => {
      navigate('/')
   }
 
   return (
      <div>
         <div className={styles.resetPasswordBox}>
            <h2>{t('passwordReset.forgotPassword')}</h2>
            <InputField 
              inputFieldType="email"
              value={email}
              onChangeFunction={setEmail}
              placeholder={t('passwordReset.emailPlaceholder')}
              ariaLabel={t('passwordReset.emailPlaceholder')}
            />

            <SubmitButton 
               isDisabled={email === ''} 
               buttonText={t('passwordReset.passwordResetButton')}
               buttonAriaLabel={t('passwordReset.passwordResetButtonArialLabel')}
               submitFunction={clickReset} 
            />

            <TextButton 
               textContent={t('passwordReset.backToLoginButton')}
               ariaLabel={t('passwordReset.backToLoginButtonAriaLabel')}
               onClickFunction={clickBackToLogin}
            />
         </div>
      </div>
)};

PasswordResetForm.propTypes = {};

export default PasswordResetForm;
