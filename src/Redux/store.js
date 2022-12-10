import {configureStore} from '@reduxjs/toolkit'
import weatherAppSlice from './weatherAppSlice'

export const store = configureStore({
    reducer: {
        weatherApp: weatherAppSlice
    }
})