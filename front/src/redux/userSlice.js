import { createSlice } from '@reduxjs/toolkit'

const name = 'user'

const initialState = {
    firstName: '',
    lastName: '',
    email: ''
}

const reducers = {
    setUser : (state, action) => {
        state.firstName = action.payload.firstName
        state.lastName = action.payload.lastName
        state.email = action.payload.email
    },
    clearUser : (state) => {
        state.firstName = ''
        state.lastName = ''
        state.email = ''
    }
}

export const userSlice = createSlice({name, initialState, reducers})
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer