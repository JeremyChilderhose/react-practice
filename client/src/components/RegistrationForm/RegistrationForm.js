import React, { useState } from 'react';
import styles from "./RegistrationForm.module.css";
import InputField from '../shared/InputField/InputField';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../shared/SubmitButton/SubmitButton';
import TextButton from '../shared/TextButton/TextButton';
import { useTranslation } from 'react-i18next'; 
import apiService from '../../services/apiService';
import SHA256 from 'crypto-js/sha256';

const RegistrationForm = () => {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [hasUsernameError, setUsernameError] = useState(false);
  const [hasUsernameTakenError, setHasUsernameTakenError] = useState(false)
  const [hasPasswordError, setPasswordError] = useState(false);
  const [hasConfirmPasswordError, setConfirmPasswordError] = useState(false);
  const [hasEmailError, setEmailError] = useState(false);
  const navigate = useNavigate();

  const clickRegister = async (e) => {
    e.preventDefault();
    try {
      const hashedPassword = SHA256(password).toString();
      const result = await apiService.registerUser(username, email, hashedPassword);
      console.log(result);
      navigate('/login')
    } catch (error) {
      if (error.response && error.response.data && error.response.data.detail) {
        const errorMessage = error.response.data.detail;
          if (errorMessage.includes("Username already exists")) {
            setHasUsernameTakenError(true);
          } else {
            setHasUsernameTakenError(false);
          }
        } else {
          setHasUsernameTakenError(false);
        }

        console.error('Registration failed:', error);
    }
  }

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError(true)
    } else {
      setConfirmPasswordError(false)
    }
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
            hasError={hasEmailError}
            placeholder={t('passwordReset.emailPlaceholder')}
            ariaLabel={t('passwordReset.emailPlaceholder')}
            validateFunction={() => setEmailError(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))}
          />
          <p className='smallErrorText'>{hasEmailError && t('registration.errorMustHaveValidEmail')}</p>

          <InputField 
              inputFieldType="username"
              value={username}
              hasError={hasUsernameError}
              onChangeFunction={setUsername}
              placeholder={t('registration.enterUsername')}
              fieldAriaLabel={t('login.usernameAriaLabel')}
              iconLabel={t('login.profileIconLabel')}
              validateFunction={() => setUsernameError(username === '')}
          />  
          { hasUsernameTakenError && <p className='smallErrorText'>{t('registration.errorUsernameTaken')}</p>}
          { hasUsernameError && <p className='smallErrorText'>{t('registration.errorUsernameTooLong')}</p>}

          <InputField 
            inputFieldType={isPasswordHidden ? "password" : "text"}
            value={password}
            hasError={hasPasswordError}
            onChangeFunction={setPassword}
            onClickFunction={clickHidePassword}
            placeholder={t('registration.enterPassword')}
            fieldAriaLabel={t('login.passwordAriaLabel')}
            buttonAriaLabel={t('login.visibilityToggleAriaLabel')}
            iconLabel={t('login.lockIconLabel')}
            validateFunction={() => setPasswordError(password === '')}
          />
          {hasPasswordError && <p className='smallErrorText'>{t('registration.errorPasswordEmpty')}</p>}

          <InputField 
            inputFieldType={isPasswordHidden ? "password" : "text"}
            value={confirmPassword}
            hasError={hasConfirmPasswordError}
            validateFunction={validateConfirmPassword}
            onChangeFunction={setConfirmPassword}
            onClickFunction={clickHidePassword}
            placeholder={t('registration.reenterPassword')}
            fieldAriaLabel={t('registration.confirmPasswordAriaLabel')}
            buttonAriaLabel={t('login.visibilityToggleAriaLabel')}
            iconLabel={t('login.lockIconLabel')}
          />
          {hasConfirmPasswordError && <p className='smallErrorText'>{t('registration.errorPasswordDoesNotMatch')}</p>}

          <SubmitButton 
            isDisabled={
              password === '' || username === '' || confirmPassword === '' || 
              email === '' || hasEmailError || hasUsernameError || hasPasswordError || 
              hasConfirmPasswordError
            } 
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
