import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { initial } from 'lodash';
import store from 'store2';
import api from '../ApiClient';

export interface authState {
    user: any;
    error: any;
    loginLoading: boolean;
    userLoaded: boolean;
}

const initialState: authState = {
    user: null,
    error: null,
    loginLoading: false,
    userLoaded: false,
}

export const login = createAsyncThunk(
    'user/login',
    async (data: { payload: any }) => {
        const { payload } = data;
        const response = await api.post('userAuth/login', { data: payload });

        store.session.set('authToken', response.data.token);
        store.session.set('authUser', response.data.user);
        return response.data.user;
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuthError: (state, action) => {
            state.error = action.payload;
        },
        loadUser: (state) => {
            const isTokenExpired = (token: string) => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000;
            const token = store.get('authToken');

            if (token && isTokenExpired(token)) {
                store.remove('authUser');
                store.remove('authToken');
                window.location.replace('/login');
            } else {
                // state.userLoaded = true;
                state.user = store.get('authUser');
            }
        },
        logout: () => {
            store.remove('authUser');
            store.remove('authToken');
            window.location.replace('/login');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.error = null;
                state.loginLoading = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.loginLoading = false;
                state.error = action.error;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.error = null;
                state.loginLoading = false;
                state.user = action.payload;
            })
    },
});

export const { setAuthError, loadUser, logout } = authSlice.actions;
export default authSlice.reducer;