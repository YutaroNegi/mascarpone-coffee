import * as React from 'react';
import { experimentalStyled as styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import CoffeeIcon from '@mui/icons-material/Coffee';
import EmojiFoodBeverageIcon from '@mui/icons-material/EmojiFoodBeverage';
import CoffeeMakerIcon from '@mui/icons-material/CoffeeMaker';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import {ToastSuccess} from './Toaster'


import { useSelector, useDispatch } from 'react-redux'
import { addCart } from  '../redux/cartSlice'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

function Store() {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)

  function handleClick(item){
    let itemID = item === 'ice cream' ? 'iceCream' : item

    dispatch(addCart({item: itemID}))
    ToastSuccess(`One ${item} added`)
  }

  return (
    <Box className='box' sx={{ flexGrow: 1 }}>
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('coffee')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><CoffeeIcon color='primary'/>Coffee <span>$2.00</span></Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('tea')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><EmojiFoodBeverageIcon color='primary'/>Tea <span>$2.00</span></Item>
        </Grid>
        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('espresso')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><CoffeeMakerIcon color='primary'/>Espresso <span>$4.00</span></Item>
        </Grid>

        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('hamburger')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><FastfoodIcon color='primary'/>Hamburger <span>$8.00</span></Item>
        </Grid>

        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('ice cream')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><IcecreamIcon color='primary'/>Ice Cream <span>$10.00</span></Item>
        </Grid>

        <Grid item xs={2} sm={4} md={4} key={Math.random()}>
            <Item onClick={()=>{handleClick('cake')}} className='pointer' sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><CakeIcon color='primary'/>Cake<span>$12.00</span></Item>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Store;