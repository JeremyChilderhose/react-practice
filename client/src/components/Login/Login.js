import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { useNavigate, useParams } from "react-router-dom";
import InputField from '../shared/InputField/InputField';
import SubmitButton from '../shared/SubmitButton/SubmitButton';
import TextButton from '../shared/TextButton/TextButton';
import TempLogo from '../shared/TempLogo/TempLogo';
import { useTranslation } from 'react-i18next'; 

const Login = () => {
  const { t } = useTranslation(); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const navigate = useNavigate();
  const { variant } = useParams(); 

  const clickLogin = (e) => {
    e.preventDefault();
    console.log("Handling Login");
    console.log("Username: " + username);
    console.log("Password: " + password);
  };

  const clickHidePassword = () => {
    setIsPasswordHidden(!isPasswordHidden);
  };

  const clickSignup = () => {
    navigate('/register');
  };

  const clickForgotPassword = () => {
    navigate('/resetPassword');
  };

  const variantContent = !variant ? (
    <h2>{t('login.welcomeMessage')}</h2>
  ) : variant === 'a' ? (
    <h2>Welcome to Variant A</h2>
  ) : (
    <h2>Welcome to Variant B</h2>
  );

  return (
    <div>
      <div className={styles.loginBox}>
        {variantContent}
        <TempLogo />
        
        <form onSubmit={clickLogin}>
          <InputField 
              inputFieldType="username"
              value={username}
              onChangeFunction={setUsername}
              placeholder={t('login.usernamePlaceholder')}
              fieldAriaLabel={t('login.usernameAriaLabel')}
              iconLabel={t('login.profileIconLabel')}
          />

          <InputField 
              inputFieldType="password"
              isPasswordHidden={isPasswordHidden}
              value={password}
              onChangeFunction={setPassword}
              onClickFunction={clickHidePassword}
              placeholder={t('login.passwordPlaceholder')}
              fieldAriaLabel={t('login.passwordAriaLabel')}
              buttonAriaLabel={t('login.visibilityToggleAriaLabel')}
              iconLabel={t('login.lockIconLabel')}
          />

          <TextButton
              textButtonType="forgotPassword" 
              onClickFunction={clickForgotPassword} 
              ariaLabel={t('login.forgotPasswordButtonAriaLabel')}
              textContent={t('login.forgotPasswordButton')}
          />

          <SubmitButton 
            isDisabled={password === '' || username === ''} 
            buttonText={t('login.loginButton')}
            buttonAriaLabel={t('login.loginButtonAriaLabel')}
            submitFunction={clickLogin} 
          />
        </form>

        <div className={styles.signupContainer}>
          <p>{t('login.signupText')}</p>
          <TextButton
              textButtonType="signup" 
              onClickFunction={clickSignup} 
              ariaLabel={t('login.signupButtonAriaLabel')}
              textContent={t('login.signupButton')}
          />
        </div>

      </div>
    </div>
  );
};

Login.propTypes = {
  propName: PropTypes.string,
};

export default Login;
