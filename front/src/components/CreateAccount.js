import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ToastError, ToastSuccess } from './Toaster';
import { useNavigate } from "react-router-dom";

function CreateAccount(){
    const navigate = useNavigate();
    const [user, setUser] = useState({})

    function handleTextChange(e){
        setUser({
            ...user,
            [e.target.name]: e.target.value
        })
    }

    async function handleCreateAccout(){
        if(user.password !== user.passwordCheck){
            console.log('errou');
            ToastError('Passwords do not match');
            return
        }

        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        }

        try {
            let response = await fetch('/api/createAccount', config);
            let data = await response.json()
            
            if(data.sucess === 1){
                ToastSuccess('Account created successfully');
                navigate('/myAccount')
            }else{
                ToastError('Error creating account')
            }

        } catch (error) {
            ToastError('Error creating account')
            console.log('error creating account, error: ', error);
        }

    }

    return(
        <div className='box'>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="firstName" className="input" label="First Name" variant="outlined" type="name"/>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="lastName" className="input" label="Last Name" variant="outlined" type="name"/>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="email" className="input" label="Email" variant="outlined" type="email" />
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="password" className="input" label="Password" variant="outlined" type="password"/>
            <TextField sx={{mb: 5}} onChange={handleTextChange} name="passwordCheck" className="input" label="Confirm Password" variant="outlined" type="password"/>

            <Button onClick={()=>{handleCreateAccout()}} variant="contained">Create Account</Button>
        </div>
    )
}

export default CreateAccount