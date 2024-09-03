import React from 'react';
import PropTypes from 'prop-types';
import styles from './TempLogo.module.css';

const TempLogo = ({ isNavbar }) => {
  return (
    <div className={styles.logoDiv}>
      <div className={isNavbar ? styles.navbarLogo : styles.logo}>
        <h1>TC</h1>
      </div>
    </div>
  );
};

TempLogo.propTypes = {
  isNavbar: PropTypes.bool,
};

export default TempLogo;
