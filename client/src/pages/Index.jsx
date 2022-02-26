import React, { useContext } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Card, CardContent, CardHeader, IconButton } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { GlobalContext } from '../contextapi/GlobalContext';
import { Link } from 'react-router-dom'
import axios from 'axios'
const Index = () => {

    const { token, users, posts, getPosts } = useContext(GlobalContext);
    const deletePost = async (id) => {
        const res = await axios.delete(`http://localhost:5000/api/posts/${id}`);
        if (res.data.status === 1) {
            alert(res.data.message);
            getPosts();
        } else {
            alert(res.data.message);
        }
    }
    return (
        <>
            <Container className="mt-5" >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xl={6} lg={6} md={8} sm={8} xs={12}  >
                        <Card>
                            <CardContent>
                                <h3>Hi {token ? users.name : 'Please Login'}</h3>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {token ? (
                    <>
                        <Grid container spacing={2} justifyContent="center" className="mt-5">
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}  >
                                <Card>
                                    <CardHeader title="Post" />
                                    <CardContent>
                                        <TableContainer component={Paper}>
                                            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>Id</TableCell>
                                                        <TableCell align="right">Title</TableCell>
                                                        <TableCell align="right">Content</TableCell>
                                                        <TableCell align="right">Category</TableCell>
                                                        <TableCell align="right">Action</TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody>
                                                    {posts && posts.map((val, i) => {
                                                        return (
                                                            <>
                                                                <TableRow key={i}>
                                                                    <TableCell>{i + 1}</TableCell>
                                                                    <TableCell align="left">{val.title}</TableCell>
                                                                    <TableCell align="left">{val.content}</TableCell>
                                                                    <TableCell align="left">{val.category}</TableCell>
                                                                    <TableCell align="left">
                                                                        <Link to={`update-post/${val._id}`}>
                                                                            <IconButton color="primary" variant="contained">
                                                                                <EditIcon />
                                                                            </IconButton>
                                                                        </Link>
                                                                        <IconButton color="error" onClick={() => deletePost(val._id)} variant="contained">
                                                                            <DeleteIcon />
                                                                        </IconButton>

                                                                    </TableCell>
                                                                </TableRow>
                                                            </>
                                                        )
                                                    })
                                                    }

                                                </TableBody>
                                            </Table>
                                        </TableContainer>

                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </>
                ) : ('')}

            </Container>
        </>
    );
};

export default Index;
