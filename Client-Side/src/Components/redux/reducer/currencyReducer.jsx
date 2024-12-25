import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios';


const url = `http://localhost:9000/currency`;

export const fetchCurrencies = createAsyncThunk('currency/fetchCurrencies', async (data) => {
    const response = await axios.get(url, {
        params: {
            currency_name: data.currency_name,
            selling_rate: data.selling_rate,
            buying_rate: data.buying_rate
        }
    });
    return response.data;
});


export const addNewCurrency = createAsyncThunk('currency/addCurrency', async (currency) => {
    const response = await axios.post(url, currency);
    return response.data;
});

const initialState={
    currencies:[],
    loading:false,
    error:null,
}

const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {},
    extraReducers:(builder)=> {
        builder
            .addCase(fetchCurrencies.pending, (state)=>{
                state.loading = true;// Set loading to true when fetching data
            })
            .addCase(fetchCurrencies.fulfilled, (state, action)=>{
                state.loading = false; // Set loading to false when data is fetched
                state.currencies = action.payload; // Set the fetched data to the state
            })
            .addCase(fetchCurrencies.rejected, (state, action)=>{
                state.loading = false; // Set loading to false on error
                state.error = action.error.message; // Store error message
            })
            .addCase(addNewCurrency.fulfilled, (state,action)=>{
                state.currencies.push(action.payload)
            })
    }

});


export const currencyReducer = currencySlice.reducer;