import { FC, useState, useEffect } from 'react';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './navbar.module.scss';

const Navbar: FC = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Check if user data exists in localStorage to determine login status
    const userData = localStorage.getItem('userData');
    console.log("userData", userData);
    if (userData) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('userData');
    setIsLoggedIn(false);
    // Use setTimeout to ensure state change happens before redirect
    setTimeout(() => {
      console.log(">>>>>>>>>>")
      navigate('/login');
    }, 100);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <p>Script Assist</p>
      </div>
      <div className={styles.links}>
        {isLoggedIn ? (
          <button onClick={handleLogout} className={styles.link}>Logout</button>
        ) : (
          <Link to="/login" className={styles.link}>Login</Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
