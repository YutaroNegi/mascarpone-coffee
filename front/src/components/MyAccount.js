import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../redux/loggedSlice'

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { ToastError, ToastSuccess } from './Toaster'

function MyAccount(){
    const user = useSelector((state) => state.user)
    const [userFetch, setUserFetch] = useState({email: user.email, password: '', firstName: user.firstName, lastName: user.lastName})

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const loggedIn = useSelector((state) => state.logged.loggedIn)
    

    useEffect(() => {
        if(!loggedIn) navigate('/login')
        
    }, []);

    function handleLogOut(){
        dispatch(logout())
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    function handleChange(e){
        setUserFetch({
            ...userFetch,
            [e.target.name]: e.target.value 
        })
    }

    async function saveChanges(){
        if(!userFetch.firstName || !userFetch.lastName || !userFetch.email || !userFetch.password){
            ToastError('Please fill in all fields')
            return
        }

        userFetch.token = localStorage.getItem('token')

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userFetch)
        }

        try {
            let response = await fetch('/api/updateUser', config)
            let data = await response.json()

            if(response.status === 401){
                ToastError('Session expired, please log in again')
                handleLogOut()
                return
            }

            if(data.success === 0){
                throw {status: 500, message: 'Error updating user'}
            }

            ToastSuccess('Update Successful')
        } catch (error) {
            console.log('error updating user', error);
            ToastError('Error updating user')
        }
    }

    return(
        <div className='box'>
            
            <TextField sx={{mb: 5}} onChange={handleChange} defaultValue={user.firstName} name="firstName" label="First Name" variant="outlined" type="name"/>
            <TextField sx={{mb: 5}} onChange={handleChange} defaultValue={user.lastName} name="lastName" label="Last Name" variant="outlined" type="name"/>
            <TextField sx={{mb: 5}} disabled defaultValue={user.email} name="email" label="Email" variant="outlined" type="email" />
            <TextField sx={{mb: 5}} onChange={handleChange} defaultValue="" name="password" label="Password" variant="outlined" type="password"/>

            <Button onClick={saveChanges} variant="contained">Save Changes</Button>
            <Button className='mt-20' onClick={handleLogOut} variant="contained">Log Out</Button>
        </div>
    )
}

export default MyAccount