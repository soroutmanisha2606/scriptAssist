import { FC } from 'react';
import React from 'react'
import { Link } from 'react-router-dom';
import Login from '../login/Login';
import styles from "./navbar.module.scss"

const Navbar: FC  = () => {
  return (
    <div className={styles.navbar}><div><p>Script Assist</p></div>
    <div><Link to='/login'>Login</Link>
    <Link to=''>Logout</Link></div></div>
  )
}

export default Navbar