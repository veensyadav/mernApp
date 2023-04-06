import React, { useState, useEffect } from "react";
import { Box, Input, Button, FormLabel, Typography, TextField, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { login, authState, setAuthError } from "../redux/modules/auth";
import { RootState } from "../redux/store";
import { toastr } from "react-redux-toastr";
import useForm from "../utils/useForm";


export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch<any>();
    const auth: authState = useSelector((state: RootState) => state.auth);

    const LOGIN_FORM = {
        default: {
            email: '',
            password: ''
        },
        field: {
            required: true,
            inputs: ['email', 'password']
        }
    };

    const [showPassword, setShowPassword] = useState(false);
    const { values: loginValues, change: loginChange, touched: loginTouched, errors: loginErrors } = useForm(LOGIN_FORM.default, LOGIN_FORM.field);

    const loginSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        if (Object.keys(loginTouched).length <= 0) {
            toastr.warning('', 'Please first fill the form');
            return;
        }

        if (Object.keys(loginErrors).length > 0) {
            toastr.warning('', loginErrors[Object.keys(loginErrors)[0]]);
            return;
        }

        // Call login user api
        dispatch(login({ payload: loginValues }));
        navigate("/main");
    };



    return (
        <Box sx={{ maxWidth: 400, margin: 'auto', marginTop: 20 }}>
            <Typography variant="h4" sx={{ marginBottom: 3 }}>
                Login
            </Typography>
            <FormControl required>
                <TextField error={loginTouched['email'] && loginErrors['email']} helperText={loginTouched['password'] && loginErrors['password']} variant='filled' type='email' label="Email" fullWidth name='email' margin="normal" value={loginValues.email} onChange={loginChange} />
                <Box sx={{position: "relative"}}>
                    <TextField
                        error={loginTouched['password'] && loginErrors['password']}
                        helperText={loginTouched['password'] && loginErrors['password']} fullWidth type={showPassword ? "text" : "password"} variant='filled' name='password' value={loginValues.password} label="Password" margin="normal" onChange={loginChange} onKeyDown={(e) => e.key === 'Enter' && loginSubmit(e)} />
                        <IconButton
                            size='small'
                            onClick={() => setShowPassword(!showPassword)}
                            edge='end'
                            sx={{position: "absolute", top: "30px", right: "5px"}}
                        >
                            {showPassword ? <svg width="20" height="20" viewBox="0 0 352 240" fill="none" margin-left="20px" xmlns="http://www.w3.org/2000/svg">
                                <path d="M176 0C96 0 27.68 49.76 0 120C27.68 190.24 96 240 176 240C256 240 324.32 190.24 352 120C324.32 49.76 256 0 176 0ZM176 200C131.84 200 96 164.16 96 120C96 75.84 131.84 40 176 40C220.16 40 256 75.84 256 120C256 164.16 220.16 200 176 200ZM176 72C149.44 72 128 93.44 128 120C128 146.56 149.44 168 176 168C202.56 168 224 146.56 224 120C224 93.44 202.56 72 176 72Z" fill="#3C3C3C" />
                            </svg>
                                : <svg width="20" height="20" viewBox="0 0 352 304" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M176 64C220.16 64 256 99.84 256 144C256 154.4 253.92 164.16 250.24 173.28L296.96 220C321.12 199.84 340.16 173.76 351.84 144C324.16 73.76 255.84 24 175.84 24C153.44 24 132 28 112.16 35.2L146.72 69.76C155.84 66.08 165.6 64 176 64ZM16 20.32L52.48 56.8L59.84 64.16C33.28 84.8 12.48 112.32 0 144C27.68 214.24 96 264 176 264C200.8 264 224.48 259.2 246.08 250.56L252.8 257.28L299.68 304L320 283.68L36.32 0L16 20.32ZM104.48 108.8L129.28 133.6C128.48 136.96 128 140.48 128 144C128 170.56 149.44 192 176 192C179.52 192 183.04 191.52 186.4 190.72L211.2 215.52C200.48 220.8 188.64 224 176 224C131.84 224 96 188.16 96 144C96 131.36 99.2 119.52 104.48 108.8ZM173.44 96.32L223.84 146.72L224.16 144.16C224.16 117.6 202.72 96.16 176.16 96.16L173.44 96.32Z" fill="#3C3C3C" />
                                </svg>}
                        </IconButton>
                </Box>

                <Button variant='contained' onClick={loginSubmit}>Log In</Button>
            </FormControl>
        </Box>
    )
}
