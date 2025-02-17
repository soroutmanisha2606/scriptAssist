import React from 'react'
import useAuthStore from '../store/authStore'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const isUserAuthenticated = useAuthStore((state)=>state.isAuthenticated)
 return isUserAuthenticated?<Outlet/>:<Navigate to="/login" replace/>
}

export default PrivateRoute