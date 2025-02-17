import { FC, useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.scss';
import useAuthStore from '../../store/authStore';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      const user = JSON.parse(storedUserData); 
      setIsLoggedIn(true);
      setUserName(user.name);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    useAuthStore.getState().logout();
    navigate('/login');
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <p>Script Assist</p>
      </div>
      <div className={styles.links}>
        {isLoggedIn && userName && <p>Welcome, {userName}</p>} {/* Show username only if logged in */}
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.link}>Logout</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
