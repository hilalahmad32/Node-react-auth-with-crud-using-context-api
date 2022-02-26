import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { GlobalContext } from '../contextapi/GlobalContext';
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate();
    const { token, setToken, setUsers } = useContext(GlobalContext);

    const logout = async () => {
        localStorage.removeItem('token');
        setUsers('')
        setToken('');
        navigate('/');

    }
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static" className="bg-dark">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            <Link to="/"> Simple Blog</Link>
                            <Link to="/create-post" className="ml-3" >
                                <Button color="inherit">Create Product</Button>
                            </Link>
                        </Typography>
                        {token && token ? (
                            <Button color="inherit" onClick={logout}>Logout</Button>
                        ) : (
                            <>
                                <Link to="/login" >
                                    <Button color="inherit">Login</Button>
                                </Link>
                                <Link to="/signup" >
                                    <Button color="inherit">Signup</Button>
                                </Link>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default Navbar;
