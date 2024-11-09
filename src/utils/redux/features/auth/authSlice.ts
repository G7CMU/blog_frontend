import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
    token: string | null;
    user: {
        id: number;
        username: string;
        email: string;
        fullname: string;
        dateOfBirth: string;
    } | null;
}

const initialState: AuthState = {
    token: null,
    user: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ token: string; user: AuthState['user'] }>) => {
            state.token = action.payload.token;
            state.user = action.payload.user;
        },
        clearAuth: (state) => {
            state.token = null;
            state.user = null;
        },
    },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
