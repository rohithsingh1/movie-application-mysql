import { configureStore } from '@reduxjs/toolkit'

import alertsSlice from './alertsSlice'
import movieSlice from './movieSlice'
import userSlice from './userSlice'



// configureStore accepts object as parameter
const store = configureStore({
    // we can combine multiple reducers in reducers object as key-value pair
    reducer:{
        alerts : alertsSlice,
        movies: movieSlice,
        users : userSlice
    },
})


export default store