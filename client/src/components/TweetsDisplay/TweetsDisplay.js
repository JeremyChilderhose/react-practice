import React from 'react';
import Tweet from '../Tweet/Tweet';
import styles from './TweetsDisplay.module.css';

const TweetsDisplay = () => (
  <div className={styles.tweetDisplay}>
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
    <Tweet />
  </div>
);

export default TweetsDisplay;
