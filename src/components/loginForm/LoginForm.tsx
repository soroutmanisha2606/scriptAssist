import React from 'react'
import styles from './loginform.module.scss'
import { Button, TextInput } from '@mantine/core'
import useAuthStore from '../../store/authStore'
import { Link, useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [formData,setFormData] = React.useState({email:'',password:''});
  const navigate = useNavigate()
  const login = useAuthStore((state:any)=>state.login);

  const handleSubmit = ()=>{
    const storedUser = JSON.parse(localStorage.getItem("userData"));
    if (storedUser && storedUser.email === formData.email && storedUser.password === formData.password) {
      login(storedUser);
      alert("Login Successful!");
      navigate("/resource"); 
    } else {
      alert("Invalid email or password or simple create new password");
    }
  }

  const handleChangeData = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <div className={styles.main_box} >
      <h2>Login</h2>
    <div className={styles.login_form}>
            <TextInput placeholder='Enter email' name='email' value={formData.email} onChange={handleChangeData}/>
            <TextInput placeholder='Enter password' name='password'  onChange={handleChangeData} value={formData.password}/>
            <Button className={styles.form_button} onClick={handleSubmit}>Login</Button>
            <p>Or don't have account <Link to='/signup'>Sign Up </Link></p>
            </div>
            </div>
  )
}

export default LoginForm