import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import TaskManagement from "./pages/TaskManagement.jsx";
import './App.css'

function App() {
    const [mode, setMode] = useState('light');
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null);

    useEffect(() => {
        const checkAuthStatus = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(token !== null);
        };

        // Check authentication status every 5 seconds
        const interval = setInterval(checkAuthStatus, 5000);

        // Clean up the interval on component unmount
        return () => {
            clearInterval(interval);
        };
    }, []);

    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar mode={mode} toggleColorMode={colorMode.toggleColorMode} isLoggedIn={isLoggedIn} />
                <Routes>
                    <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
                    <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login />} />
                    <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
                    <Route path="/profile" element={isLoggedIn ? <Profile /> : <Navigate to="/login" />} />
                    <Route path="/task" element={isLoggedIn ? <TaskManagement /> : <Navigate to="/login" />} />
                </Routes>
                <Footer mode={mode} />
            </Router>
        </ThemeProvider>
    );
}

export default App;
