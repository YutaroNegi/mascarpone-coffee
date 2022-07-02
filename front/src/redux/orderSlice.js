import { createSlice } from '@reduxjs/toolkit'

const name = 'order'

const initialState = {orders: []}

const reducers = {
    updateOrder : (state, action) => {
        state.orders = action.payload.orders
        console.log(state.orders);
    }
}

export const orderSlice = createSlice({name, initialState, reducers})
export const { updateOrder } = orderSlice.actions
export default orderSlice.reducer