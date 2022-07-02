import { createSlice } from '@reduxjs/toolkit'

const name = 'cart'

const initialState = {
    coffee: '',
    tea: '',
    espresso: '',
    hamburger: '',
    iceCream: '',
    cake: ''
}

const reducers = {
    addCart : (state, action) => {
        if(state[action.payload.item] === '' ) state[action.payload.item] = 0
        

        state[action.payload.item] += 1
    },
    addCartBatch : (state, action) => {
        state[action.payload.item] = action.payload.value
    },
    clearCart : (state, action) => {
        console.log(state);
        state = initialState
        console.log(state);

    }
}

export const cartSlice = createSlice({name, initialState, reducers})
export const { addCart, addCartBatch, clearCart } = cartSlice.actions
export default cartSlice.reducer