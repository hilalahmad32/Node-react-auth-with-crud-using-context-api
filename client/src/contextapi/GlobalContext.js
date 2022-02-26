import axios from "axios";
import { createContext, useState, useEffect } from 'react'

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '')
    const [users, setUsers] = useState({});
    const [posts, setPosts] = useState([]);
    const getUsers = async () => {
        const config = {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        }
        const res = await axios.get('http://localhost:5000/api/users/users', config);
        setUsers(res.data.users)
    }

    const getPosts = async () => {
        const res = await axios.get('http://localhost:5000/api/posts');
        setPosts(res.data.posts)
    }

    useEffect(() => {
        getUsers();
        getPosts();
    }, []);

    return (
        <GlobalContext.Provider value={{ token, getPosts, users, posts, setToken, setUsers, getUsers }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider;