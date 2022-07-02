import { createSlice } from '@reduxjs/toolkit'

const name = 'logged'

const initialState = {
    loggedIn: false,
}

const reducers = {
    login: (state, action) => {
        state.loggedIn = true
    },
    logout: (state) => {
        state.loggedIn = false
    }
}

export const loggedSlice = createSlice({name, initialState, reducers})
export const { login, logout } = loggedSlice.actions
export default loggedSlice.reducer