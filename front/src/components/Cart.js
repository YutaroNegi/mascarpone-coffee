import React, { useState, useEffect } from "react";

import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';

import { useNavigate } from "react-router-dom";

import CoffeeIcon from '@mui/icons-material/Coffee';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';

import { ToastError, ToastSuccess } from "./Toaster";

import { useSelector, useDispatch } from 'react-redux'
import { addCartBatch, clearCart } from  '../redux/cartSlice'
import { logout } from '../redux/loggedSlice'
import Box from '@mui/material/Box';

function Cart() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    
    const cart = useSelector((state) => state.cart)
    const user = useSelector((state) => state.user)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        let valor = 0

        if(cart.coffee > 0) valor += cart.coffee * 2
        if(cart.tea > 0) valor += cart.tea * 2
        if(cart.espresso > 0) valor += cart.espresso * 4
        if(cart.hamburger > 0) valor += cart.hamburger * 8
        if(cart.iceCream > 0) valor += cart.iceCream * 10
        if(cart.cake > 0) valor += cart.cake * 12
        
        setTotal(valor)
    }, [cart]);

    function handleChange(e){
        if(e.target.value < 1){
            e.target.value = 0
            return
        } 
        dispatch(addCartBatch({item: e.target.name, value: Number(e.target.value)}))
    }

    function handleLogOut(){
        dispatch(logout())
        navigate('/login')
    }

    async function createOrder(){
        let body = {...cart, email: user.email, value: total, token: localStorage.getItem('token')}
        const config = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        }

        try {
            let response = await fetch('/api/createOrder', config);
            let data = await response.json()

            if(response.status === 401){
                ToastError('Session expired, please log in again')
                handleLogOut()
                return
            }
            
            if(data.sucess === 1){
                dispatch(clearCart())
                ToastSuccess('Order successufully created');
                navigate('/orders')
            }else{
                ToastError('Error creating account')
            }

        } catch (error) {
            ToastError('Error creating account')
            console.log('error creating account, error: ', error);
        }
    }
    
    return(
        <div className="box">
            { cart.coffee !== '' ? (
                <Box className="cart-item-box" sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                        <CoffeeIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="coffee" margin="none" size="small" defaultValue={cart.coffee} label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.coffee * 2}</Box>
                </Box>
            ) : ''}

            { cart.tea !== '' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="cart-item-box">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }} >
                        <EmojiFoodBeverageIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="tea" margin="none" size="small" defaultValue={cart.tea}  label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.tea * 2}</Box>
                </Box>
            ) : ''}

            { cart.espresso !== '' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="cart-item-box">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <CoffeeMakerIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="espresso" margin="none" size="small" defaultValue={cart.espresso}  label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                            
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.espresso * 4}</Box>
                </Box>
            ) : ''}

            { cart.hamburger !== '' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="cart-item-box">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <FastfoodIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="hamburger" margin="none" size="small" defaultValue={cart.hamburger}  label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.hamburger * 8}</Box>
                </Box>
                
            ) : ''}

            { cart.iceCream !== '' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="cart-item-box">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <IcecreamIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="iceCream" margin="none" size="small" defaultValue={cart.iceCream}  label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.iceCream * 10}</Box>
                </Box>
            ) : ''}

            { cart.cake !== '' ? (
                <Box sx={{ display: 'flex', flexDirection: 'column' }} className="cart-item-box">
                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                        <CakeIcon color="primary"  sx={{ fontSize: 50 }}/>
                        <div>
                            <TextField onChange={handleChange} className="cart-item-input" name="cake" margin="none" size="small" defaultValue={cart.cake}  label="Qtd" variant="standard" type="number"/>
                            <DeleteIcon className="pointer" color="primary" sx={{ fontSize: 50 }}/>
                        </div>
                    </Box>
                    <Box sx={{ alignSelf: 'flex-start' }} className="roboto-txt">${cart.cake * 12}</Box>
                </Box>
            ) : ''}

            <Button onClick={createOrder} variant="contained">Confirm ${total}</Button>
        </div>
    )
}

export default Cart