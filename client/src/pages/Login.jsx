import React, { useContext, useState } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, TextField, Button } from '@mui/material';
import { GlobalContext } from '../contextapi/GlobalContext';
const Login = () => {
    let navigate = useNavigate();
    const { setToken, getUsers } = useContext(GlobalContext);
    const [users, setUsers] = useState({
        email: '',
        password: ''
    });
    const inputHandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setUsers({ ...users, [name]: value });
    }
    const login = async (e) => {
        e.preventDefault();
        const { email, password } = users;
        if (!email || !password) {
            alert('Please Fill the Field');
        } else {
            const data = {
                email: email, password: password
            };

            const res = await axios.post('http://localhost:5000/api/users/login', data);
            if (res.data.status === 1) {
                alert(res.data.message);
                localStorage.setItem('token', res.data.jwt);
                setToken(res.data.jwt);
                setUsers({ email: '', password: '' });
                navigate("/")
                getUsers();
            } else {
                alert(res.data.message);
            }
        }
    }
    return (
        <>
            <Container className="mt-5" >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xl={6} lg={6} md={8} sm={8} xs={12}  >
                        <Card>
                            <CardHeader title="Login" />
                            <CardContent>
                                <form action="" onSubmit={login}>

                                    <TextField name="email" onChange={inputHandle} value={users.email} className="w-100  mb-3" type="email" label="Enter your Email" variant="standard"></TextField>
                                    <TextField name="password" onChange={inputHandle} value={users.password} className="w-100" type="password" label="Enter your Password" variant="standard"></TextField>
                                    <Button type="submit" color="primary" className="w-25 my-4" variant="contained">Login</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Login;
