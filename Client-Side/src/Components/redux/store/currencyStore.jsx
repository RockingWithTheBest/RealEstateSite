import {configureStore} from '@reduxjs/toolkit'
import { currencyReducer } from '../reducer/currencyReducer';

const store = configureStore({
    reducer: {
        currency: currencyReducer,
    }
})

export default store;