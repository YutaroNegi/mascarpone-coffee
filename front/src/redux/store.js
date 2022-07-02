import { configureStore } from '@reduxjs/toolkit'
import loggedReducer from './loggedSlice'
import userReducer from './userSlice'
import cartReducer from './cartSlice'
import orderReducer from './orderSlice'

export default configureStore({
  reducer: {
    logged: loggedReducer,
    user: userReducer,
    cart: cartReducer,
    order: orderReducer
  },
})