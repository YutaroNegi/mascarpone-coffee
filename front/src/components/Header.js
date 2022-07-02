import React from 'react';
import { Link } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { useSelector } from 'react-redux'

function Header(){
    const loggedIn = useSelector((state) => state.logged.loggedIn)

    return(
        <header className='header'>
            <Link to='/login'><AccountCircleIcon color="primary" className='icon' sx={{ fontSize: 40 }}/></Link>
            {loggedIn ?  <Link to='/store'><HomeIcon color="primary" className='icon' sx={{ fontSize: 40 }}/></Link> : null}
            {loggedIn ? <Link to='/cart'><ShoppingCartIcon color="primary" className='icon' sx={{ fontSize: 40 }}/></Link> : null}
            {loggedIn ? <Link to='/orders'><DehazeIcon color="primary" className='icon' sx={{ fontSize: 40 }}/></Link> : null}
            
        </header>
    )
}

export default Header