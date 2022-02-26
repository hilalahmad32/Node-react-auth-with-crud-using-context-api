import React, { useState, useEffect, useContext } from 'react';
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import { Card, CardHeader, CardContent, TextField, Button } from '@mui/material';
import { GlobalContext } from '../contextapi/GlobalContext'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
const CreatePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getPosts } = useContext(GlobalContext);
    const [posts, setPosts] = useState({
        title: '',
        content: '',
        category: ''
    });

    const inputHandle = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setPosts({ ...posts, [name]: value });
    }
    const UpdatePost = async (e) => {
        e.preventDefault();
        const { title, content, category } = posts;
        if (!title || !content || !category) {
            alert("Please Fill the Field");
        } else {
            const data = {
                title: title,
                content: content,
                category: category
            };

            const res = await axios.put(`http://localhost:5000/api/posts/${id}`, data);
            if (res.data.status == 1) {
                alert(res.data.message);
                setPosts({ title: '', content: '', category: '' });
                navigate("/")
                getPosts();
            } else {
                alert(res.data.message);
            }
        }
    }

    const getPostById = async () => {
        const res = await axios.patch(`http://localhost:5000/api/posts/${id}`);
        if (res.data.status === 1) {
            setPosts({
                title: res.data.message.title,
                content: res.data.message.content,
                category: res.data.message.category,
            })
        } else {
            alert(res.data.message);
        }
    }

    useEffect(() => {
        getPostById()
    }, [])
    return (
        <>
            <Container className="mt-5" >
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xl={6} lg={6} md={8} sm={8} xs={12}  >
                        <Card>
                            <CardHeader title="Create Post" />
                            <CardContent>
                                <form action="" onSubmit={UpdatePost}>
                                    <TextField className="w-100" type="text" name="title" onChange={inputHandle} value={posts.title} label="Enter your Title" variant="standard"></TextField>
                                    <TextField className="w-100  my-3" name="content" onChange={inputHandle} value={posts.content} type="text" label="Enter your Content" variant="standard"></TextField>
                                    <TextField className="w-100" name="category" onChange={inputHandle} value={posts.category} type="text" label="Enter your Category" variant="standard"></TextField>
                                    <Button color="primary" type="submit" className="w-25 my-4" variant="contained">Update</Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </>
    );
};

export default CreatePost;
