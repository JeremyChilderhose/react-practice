import React from 'react';
import styles from './TweetForm.module.css';
import userIcon from '../../assets/images/userIcon.png';
import { useTranslation } from 'react-i18next';

const TweetForm = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.profileIcon}>
        <img src={userIcon} alt="Profile" />
      </div>
      <div className={styles.formContent}>
        <div className={styles.username}>Username</div>
        <textarea name={t('tweetForm.textAreaName')}
          className={styles.inputField}
          placeholder={t('tweetForm.contentPlaceholder')}
        />
      </div>
      <button className={styles.sendButton}>{t('tweetForm.send')}</button>
    </div>
  );
};

export default TweetForm;
