import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import TweetForm from '../TweetForm/TweetForm';
import TweetsDisplay from '../TweetsDisplay/TweetsDisplay';
import styles from './Home.module.css';
import authService from '../../services/authService'; 

const Home = () => {
  const navigate = useNavigate(); 

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      if (!isAuthenticated) { 
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]); 

  return (
    <div className={styles.homeDiv}>
      <TweetForm />
      <TweetsDisplay />
    </div>
  );
};

export default Home;
