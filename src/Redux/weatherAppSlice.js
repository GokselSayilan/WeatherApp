import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

const appid = '0020f916f555463595aa225c92b54b96'

export const fetchCityWeatherInfo = createAsyncThunk('weatherApp/fetchCityWeatherInfo', async (city) => {
    const location = await axios(`${process.env.REACT_APP_API_LOC_URL}q=${city}&appid=${appid}`)
    const locationJSON = location.data
    const res = await axios(`${process.env.REACT_APP_API_WEATHER_INFO_URL}lat=${locationJSON[0].lat}&lon=${locationJSON[0].lon}&appid=${appid}`)
    return res.data
})


export const weatherAppSlice = createSlice({
    name: 'weatherApp',
    initialState: {
        items: [],
        status: 'idle'
    },
    reducers: {

    },
    extraReducers: {
        [fetchCityWeatherInfo.fulfilled]: (state, action) => {
            if(state.items.length>4) {
                state.items = []
            }

            for (let i = 3; i < action.payload.list.length; i += 8) {
                state.items = [...state.items, action.payload.list[i]]
            }

            state.status = 'succeeded'
        },
        [fetchCityWeatherInfo.pending]: (state, action) => {
            state.status = 'isLoading'
        },
        [fetchCityWeatherInfo.rejected]: (state, action) => {
            state.error = action.error.message
            state.status = 'failed'
        }

    }

})


export const selectorWeatherInfo = (state) => state.weatherApp.items
export const selectorStatus = (state) => state.weatherApp.status
export default weatherAppSlice.reducer