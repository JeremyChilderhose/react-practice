import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Login.module.css';
import { useNavigate, useParams } from "react-router-dom";
import InputField from '../shared/InputField/InputField';
import SubmitButton from '../shared/SubmitButton/SubmitButton';
import TextButton from '../shared/TextButton/TextButton';
import TempLogo from '../shared/TempLogo/TempLogo';

const Login = () => {
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

  // Customize content based on the variant
  const variantContent = !variant ? (
    <h2>Welcome to the Default Login Page</h2>
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
              placeholder="Username"
              ariaLabel="Username Field"
          />

          <InputField 
              inputFieldType="password"
              isPasswordHidden={isPasswordHidden}
              value={password}
              onChangeFunction={setPassword}
              onClickFunction={clickHidePassword}
              placeholder="Password"
              ariaLabel="Password Field"
          />

          <TextButton
              textButtonType="forgotPassword" 
              onClickFunction={clickForgotPassword} 
              ariaLabel="Forgot Password Button" 
              textContent="Forgot Password?" 
          />

          <SubmitButton 
            isDisabled={password === '' || username === ''} 
            buttonText="Login" 
            submitFunction={clickLogin} 
          />
        </form>

        <div className={styles.signupContainer}>
          <p>Don't have an account?</p>
          <TextButton
              textButtonType="signup" 
              onClickFunction={clickSignup} 
              ariaLabel="Signup Button" 
              textContent="SIGNUP" 
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
