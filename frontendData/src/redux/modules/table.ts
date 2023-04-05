import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../ApiClient';

export interface TableState {
    error: any;
    loading: boolean;
    clients: any[];
}

const initialState: TableState = {
    error: null,
    loading: false,
    clients: [],
}

export const getClients = createAsyncThunk(
    'get/data',
    async () => {
        const response = await api.get('userAuth/get/data');
        return response.data;
    }
);


export const TableSlice = createSlice({
    name: 'tabledata',
    initialState,
    reducers: {
        setTableError: (state, action) => {
            state.error = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(getClients.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(getClients.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error;
            })
            .addCase(getClients.fulfilled, (state, action) => {
                state.error = null;
                state.loading = false;
                state.clients = action.payload;                
            })
    }
});

export const { setTableError } = TableSlice.actions;
export default TableSlice.reducer;