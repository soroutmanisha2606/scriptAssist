import { Button, TextInput, Notification } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './signup.module.scss';

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    setNotification({ message: "Signup successful! Redirecting to login...", color: "green" });
    setTimeout(() => navigate("/login"), 1000);
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
        <h2>Signup</h2>
        <TextInput type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
        <TextInput type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
        <TextInput type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
        <Button className={styles.form_button} onClick={handleSignup}>Signup</Button>
        <p>If already have an account <Link to='/login'>Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;
