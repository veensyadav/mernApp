import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { authState } from "../redux/modules/auth";
import { RootState } from "../redux/store";


const Nav = () => {
    const auth: authState = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();
    const [data, setData] = useState(null);
    const [getLogout, setLogout] = useState(null);

    const logout = () => {
        sessionStorage.clear();
        navigate("/");
    }

    useEffect(() => {
        setData(sessionStorage.getItem('authToken'));
    }, [auth.user])
    console.log(data,"data");
    
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Dashboard
                    </Typography>
                    <div>
                        {data ? (
                            <>
                                <Button component={Link} to="/main" color="inherit">
                                    Main Page
                                </Button>
                                <Button component={Link} to="/analytics" color="inherit">
                                    Analytic Page
                                </Button>
                                <Button onClick={logout} color="inherit">
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button disabled component={Link} to="/main" color="inherit">
                                    Main Page
                                </Button>
                                <Button disabled component={Link} to="/analytics" color="inherit">
                                    Analytic Page
                                </Button>
                                <Button disabled>
                                    Logout
                                </Button>
                            </>
                        )}
                    </div>


                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Nav;