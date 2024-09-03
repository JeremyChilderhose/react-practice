import React from 'react';
import styles from './Tweet.module.css';
import userIcon from '../../assets/images/userIcon.png';
import emptyHeartIcon from '../../assets/icons/EmptyHeartIcon.svg';

const Tweet = () => (
  <div className={styles.container}>
    <div className={styles.profileIcon}>
      <img src={userIcon} alt="Profile" />
    </div>
    <div className={styles.formContent}>
      <div className={styles.username}>Username</div>
      <div className={styles.tweetText}>
         Excited to announce our new product launch today! It's been a long journey, but we're finally here. Thanks to everyone who made this possible! 🎉🚀 #NewBeginnings
      </div>
      <div className={styles.likeButtonContainer}>
        <img src={emptyHeartIcon} alt="Like" className={styles.likeButton} />
        <span className={styles.likeCounter}>0</span>
      </div>
    </div>
  </div>
);

export default Tweet;
