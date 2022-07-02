import React, { useEffect, useState } from 'react';

import { useSelector, useDispatch } from 'react-redux'
import { login } from '../redux/loggedSlice'
import { setUser } from  '../redux/userSlice'
import { updateOrder } from '../redux/orderSlice'

import { useNavigate } from "react-router-dom";

import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';

import { ToastError, ToastSuccess } from './Toaster'

function Login(){
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const [userFetch, setUserFetch] = useState({email: '', password: ''})
    const [loading, setLoading] = useState(false)

    const loggedIn = useSelector((state) => state.logged.loggedIn)


    useEffect(() => {
        let user = JSON.parse(localStorage.getItem('user'))
        if(user && !loggedIn) verifyUser(user)

        if(loggedIn){
            navigate('/myAccount')
        }
    }, []);

    function handleTextChange(e){
        setUserFetch({
            ...userFetch,
            [e.target.name]: e.target.value
        })
    }

    async function handleLogin(){
        if(userFetch.email === '' || userFetch.password === '') {
            ToastError('Please fill in all fields')
            return
        }

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(userFetch)
        }

        try {
            setLoading(true)
            let response = await fetch('/api/login', config);
            let data = await response.json()

            if(data.success === 1){
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data))
                setLoading(false)
                dispatch(updateOrder({orders: data.orders}))
                dispatch(setUser(data))
                dispatch(login())
                ToastSuccess('Logged in, Welcome Back!');
                navigate('/store')
            }else{
                setLoading(false)
                ToastError('Invalid password or email')
            }

        } catch (error) {
            ToastError('Error to log in!')
            console.log('Error to log in, error: ', error);
        }
    }

    async function verifyUser(user){
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }

        try {
            setLoading(true)
            let response = await fetch('/api/verifyUser', config);
            let data = await response.json()

            if(data.success === 1){
                localStorage.setItem('token', data.token)
                localStorage.setItem('user', JSON.stringify(data))
                setLoading(false)
                dispatch(updateOrder({orders: data.orders}))
                dispatch(setUser(data))
                dispatch(login())
                ToastSuccess('Logged in, Welcome Back!');
                navigate('/store')
            }else{
                setLoading(false)
                ToastError('Invalid password or email')
            }

        } catch (error) {
            ToastError('Error to log in!')
            console.log('Error to log in, error: ', error);
        }
    }

    return (
        <div className='box'>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="email" className="input" label="Email" variant="outlined"/>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="password" className="input" label="Password" variant="outlined"/>
            <LoadingButton loading={loading} onClick={handleLogin} variant="contained">Login</LoadingButton>
            <Button className='mt-20' onClick={()=>{navigate('/createAccount')}} variant="contained">Create Account</Button>
        </div>
    )
}

export default Login