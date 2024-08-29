import React, { useState } from 'react';
import styles from "./RegistrationForm.module.css";
import InputField from '../shared/InputField/InputField';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../shared/SubmitButton/SubmitButton';
import TextButton from '../shared/TextButton/TextButton';
import { useTranslation } from 'react-i18next'; 

const RegistrationForm = () => {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const navigate = useNavigate();

  const clickRegister = (e) => {
    e.preventDefault();
    console.log("Register");
  }

  const clickHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const clickBackToLogin = () => {
    navigate('/')
  }

  return (
    <div data-testid="RegistrationForm">
      <div className={styles.registrationBox}>
        <h2>{t('registration.registrationTitle')}</h2>

        <form onSubmit={clickRegister}>

          <InputField 
            inputFieldType="email"
            value={email}
            onChangeFunction={setEmail}
            placeholder={t('passwordReset.emailPlaceholder')}
            ariaLabel={t('passwordReset.emailPlaceholder')}
          />

          <InputField 
              inputFieldType="username"
              value={username}
              onChangeFunction={setUsername}
              placeholder={t('registration.enterUsername')}
              fieldAriaLabel={t('login.usernameAriaLabel')}
              iconLabel={t('login.profileIconLabel')}
          />  

          <InputField 
            inputFieldType={isPasswordHidden ? "password" : "text"}
            value={password}
            onChangeFunction={setPassword}
            onClickFunction={clickHidePassword}
            placeholder={t('registration.enterPassword')}
            fieldAriaLabel={t('login.passwordAriaLabel')}
            buttonAriaLabel={t('login.visibilityToggleAriaLabel')}
            iconLabel={t('login.lockIconLabel')}
          />

          <InputField 
            inputFieldType={isPasswordHidden ? "password" : "text"}
            value={confirmPassword}
            onChangeFunction={setConfirmPassword}
            onClickFunction={clickHidePassword}
            placeholder={t('registration.reenterPassword')}
            fieldAriaLabel={t('registration.confirmPasswordAriaLabel')}
            buttonAriaLabel={t('login.visibilityToggleAriaLabel')}
            iconLabel={t('login.lockIconLabel')}
          />

          <SubmitButton 
            isDisabled={password === '' || username === '' || confirmPassword === '' || email === ''} 
            buttonText={t('registration.registerButton')}
            buttonAriaLabel={t('registration.registerButtonAriaLabel')}
            submitFunction={clickRegister} 
          />
        </form>

        <TextButton 
            textContent={t('passwordReset.backToLoginButton')}
            ariaLabel={t('passwordReset.backToLoginButtonAriaLabel')}
            onClickFunction={clickBackToLogin}
        />
      </div>
    </div>
  );
};

export default RegistrationForm;
