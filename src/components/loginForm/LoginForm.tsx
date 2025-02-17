import React, { useEffect } from 'react';
import { Button, TextInput, Notification } from '@mantine/core';
import useAuthStore from '../../store/authStore';
import { Link, useNavigate } from 'react-router-dom';
import styles from './loginform.module.scss';

const LoginForm = () => {
  const [formData, setFormData] = React.useState({ email: '', password: '' });
  const [notification, setNotification] = React.useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/resource');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = () => {
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      login(storedUser);
      localStorage.setItem('auth', 'true');
      setNotification({ message: 'Login Successful!', color: 'green' });
      setTimeout(() => navigate('/resource'), 1000);
    } else {
      setNotification({ message: 'Invalid email or password. Please try again.', color: 'red' });
    }
  };

  const handleChangeData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className={styles.auth_container}>
      {notification && (
        <div className={styles.notification_wrapper}>
          <Notification color={notification.color} onClose={() => setNotification(null)}>
            {notification.message}
          </Notification>
        </div>
      )}
      <div className={styles.auth_box}>
        <h2>Login</h2>
        <TextInput placeholder='Enter email' name='email' value={formData.email} onChange={handleChangeData} />
        <TextInput placeholder='Enter password' name='password' type='password' onChange={handleChangeData} value={formData.password} />
        <Button className={styles.form_button} onClick={handleSubmit}>Login</Button>
        <p>Or don't have an account? <Link to='/signup'>Sign Up</Link></p>
      </div>
    </div>
  );
};

export default LoginForm;