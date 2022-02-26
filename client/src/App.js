import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import Login from './pages/Login'
import './App.css'
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Signup from './pages/Signup';
import Index from './pages/Index';
import CreatePost from './pages/CreatePost';
import UpdatePost from './pages/UpdatePost';
import { GlobalContext } from './contextapi/GlobalContext';
import { useContext } from 'react';
function App() {
  const { token } = useContext(GlobalContext)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />

          {!token && (
            <>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </>
          )}
          {token && (
            <>
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/update-post/:id" element={<UpdatePost />} />

            </>
          )}
          <Route path="*" element={<Navigate to={token ? '/' : '/login'} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
