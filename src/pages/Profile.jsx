import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Avatar, Typography, Container, CircularProgress } from '@mui/material';
import { styled } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

const ProfileContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
    width: 150,
    height: 150,
    marginBottom: theme.spacing(3),
}));

const ProfileButton = styled(Button)(({ theme }) => ({
    marginTop: theme.spacing(4),
    paddingTop: theme.spacing(1.5),
    paddingBottom: theme.spacing(1.5),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    fontSize: '1.1rem',
}));

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
            const decodedToken = jwtDecode(token);
            const userData = JSON.parse(storedUser);
            setUser({ ...userData, ...decodedToken });
        }
        setLoading(false);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const handleManageTasks = () => {
        navigate('/task');
    };

    return (
        <ProfileContainer maxWidth="sm">
            <ProfileAvatar alt="Profile Picture" src="/default-profile-picture.png" />
            {loading ? (
                <CircularProgress />
            ) : user ? (
                <>
                    <Typography variant="h4" gutterBottom>
                        Welcome, {user.name}!
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                        {user.email}
                    </Typography>
                    <ProfileButton
                        variant="contained"
                        color="primary"
                        onClick={handleManageTasks}
                    >
                        Manage Tasks
                    </ProfileButton>
                    <Button
                        variant="text"
                        color="secondary"
                        onClick={handleLogout}
                        sx={{ mt: 2 }}
                    >
                        Logout
                    </Button>
                </>
            ) : (
                <Typography variant="body1">No user data available.</Typography>
            )}
        </ProfileContainer>
    );
};

export default Profile;


