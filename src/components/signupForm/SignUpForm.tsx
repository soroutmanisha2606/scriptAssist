import { Button, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './signup.module.scss'

const Signup = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = () => {
    localStorage.setItem("userData", JSON.stringify(formData));
    // alert("Signup successful! Please login.");
    navigate("/login");
  };

  return (
    <div className={styles.signup_form}>
      <h2>Signup</h2>
      <TextInput type="text" name="name" placeholder="Enter Name" onChange={handleChange} />
      <TextInput type="email" name="email" placeholder="Enter Email" onChange={handleChange} />
      <TextInput type="password" name="password" placeholder="Enter Password" onChange={handleChange} />
      <Button onClick={handleSignup}>Signup</Button>
      <p>If already have account <Link to='/login'> Login</Link></p>
    </div>
  );
};

export default Signup;
