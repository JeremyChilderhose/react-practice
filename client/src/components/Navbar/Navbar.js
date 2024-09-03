import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';
import { useTranslation } from 'react-i18next';
import authService from '../../services/authService';
import TempLogo from '../shared/TempLogo/TempLogo';
import ProfileButtonIcon from '../../assets/icons/ProfileButtonIcon.svg';
import ExploreIcon from '../../assets/icons/ExploreIcon.svg';
import HomeIcon from '../../assets/icons/HomeIcon.svg';
import LogoutIcon from '../../assets/icons/LogoutIcon.svg';

const Navbar = () => {
  const { t } = useTranslation();
  const [isHidden, setIsHidden] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuthenticated = await authService.isAuthenticated();
      setIsHidden(!isAuthenticated);
    };
    checkAuth();
  }, [location]);

  const clickLogout = () => {
      authService.logout(); 
  }

  return (
    <div>
      <nav className={`${styles.navbar} ${!isHidden ? styles.visible : ''}`}>
        <TempLogo isNavbar={true} />
        <div className={styles.navItem}>
          <NavLink to="/home" className={styles.active}>
            <div className={styles.navContent}>
              <img src={HomeIcon} className={styles.icon} alt="Home Icon" />
              <span>{t('navbar.home')}</span>
            </div>
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink to="/home" className={styles.active}>
            <div className={styles.navContent}>
              <img src={ProfileButtonIcon} className={styles.icon} alt="Profile Icon" />
              <span>{t('navbar.profile')}</span>
            </div>
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink to="/home" className={styles.active}>
            <div className={styles.navContent}>
              <img src={ExploreIcon} className={styles.icon} alt="Explore Icon" />
              <span>{t('navbar.explore')}</span>
            </div>
          </NavLink>
        </div>
        <div className={styles.navItem}>
          <NavLink to="/" className={styles.active} onClick={clickLogout}>
            <div className={styles.navContent}>
              <img src={LogoutIcon} className={styles.icon} alt="Logout Icon" />
              <span>{t('navbar.logout')}</span>
            </div>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
