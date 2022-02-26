import React, { useState } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardContent, TextField, Button } from '@mui/material';
const Signup = () => {
    let navigate = useNavigate();
    const [users, setUsers] = useState({
        name: '',
        email: '',
        password: ''
    });
    const inputHandle = (e) => {
        e.preventDefault();
        let name = e.target.name;
        let value = e.target.value;

        setUsers({ ...users, [name]: value });
    }
    const signup = async (e) => {
        e.preventDefault();
        const { name, email, password } = users;
        if (!name || !email || !password) {
            alert('Please fill the Field');
        } else {
            const data = {
                name: name,
                email: email,
                password: password,
            }
            const res = await axios.post('http://localhost:5000/api/users/create', data);
            if (res.data.status === 1) {
                alert(res.data.message);
                setUsers({ name: '', email: '', password: '' })
                navigate('/login')
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
                            <CardHeader title="Signup" />
                            <CardContent>
                                <form action="" onSubmit={signup}>
                                    <TextField name="name" onChange={inputHandle} value={users.name} className="w-100" type="text" label="Enter your Name" variant="standard"></TextField>
                                    <TextField name="email" onChange={inputHandle} value={users.email} className="w-100  my-3" type="email" label="Enter your Email" variant="standard"></TextField>
                                    <TextField name="password" onChange={inputHandle} value={users.password} className="w-100" type="password" label="Enter your Password" variant="standard"></TextField>
                                    <Button type="submit" color="primary" className="w-25 my-4" variant="contained">Signup</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default Signup;
