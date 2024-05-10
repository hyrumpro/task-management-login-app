import {
    Box,
    Button,
    Container,
    Grid,
    Typography,
    useMediaQuery,
    useTheme
} from '@mui/material';
import { useTheme as useSystemTheme } from '@mui/system';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import DevicesIcon from '@mui/icons-material/Devices';
import SpeedIcon from '@mui/icons-material/Speed';
import { useNavigate } from 'react-router-dom';

function Home({ isLoggedIn }) {
    const theme = useTheme();
    const systemTheme = useSystemTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();

    const handleStartNowClick = () => {
        if (isLoggedIn) {
            navigate('/task');
        } else {
            navigate('/login');
        }
    };


    return (
        <Box sx={{
            backgroundColor: systemTheme.palette.mode === 'dark' ? 'background.default' : 'grey.100',
            minHeight: '100vh'
        }}>
            {/* Hero Section */}
            <Box sx={{
                pt: 8,
                pb: 12,
                backgroundColor: systemTheme.palette.mode === 'dark' ? 'background.paper' : 'primary.main',
                color: systemTheme.palette.mode === 'dark' ? 'text.primary' : 'primary.contrastText'
            }}>
                <Container>
                    <Grid container spacing={4} alignItems="center">
                        <Grid item xs={12} md={6}>
                            <Typography variant={isMobile ? "h4" : "h3"} fontWeight="bold" gutterBottom>
                                The Ultimate Task Manager
                            </Typography>
                            <Typography variant="h6" paragraph>
                                Organize your tasks, boost your productivity, and achieve your goals with our intuitive task manager app.
                            </Typography>
                            <Button
                                variant="contained"
                                size="large"
                                sx={{ mt: 2 }}
                                onClick={handleStartNowClick}
                            >
                                Get Started
                            </Button>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* Add your app screenshot or hero image here */}
                        </Grid>
                    </Grid>
                </Container>
            </Box>

            {/* Features Section */}
            <Container sx={{ py: 8 }}>
                <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
                    Key Features
                </Typography>
                <Grid container spacing={4} sx={{ mt: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <TaskAltIcon sx={{ fontSize: 48 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Effortless Task Management
                            </Typography>
                            <Typography>
                                Create, organize, and prioritize tasks with ease. Stay on top of your to-do list and never miss a deadline.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <DevicesIcon sx={{ fontSize: 48 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Cross-Platform Sync
                            </Typography>
                            <Typography>
                                Access your tasks from anywhere, on any device. Seamlessly sync your data across mobile, tablet, and web.
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Box sx={{ textAlign: 'center' }}>
                            <SpeedIcon sx={{ fontSize: 48 }} color="primary" />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Boost Productivity
                            </Typography>
                            <Typography>
                                Focus on what matters most with our streamlined interface and powerful features designed to maximize your productivity.
                            </Typography>
                        </Box>
                    </Grid>
                </Grid>
            </Container>

            {/* Call-to-Action Section */}
            <Box sx={{ py: 8, backgroundColor: 'primary.main', color: 'primary.contrastText', textAlign: 'center' }}>
                <Container>
                    <Typography variant="h4" fontWeight="bold" gutterBottom>
                        Ready to Get Organized?
                    </Typography>
                    <Typography variant="h6" paragraph>
                        Download our task manager app today and take control of your tasks and time.
                    </Typography>
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ mt: 2, backgroundColor: 'white', color: 'primary.main' }}
                        onClick={handleStartNowClick}
                    >
                        Start Now!
                    </Button>
                </Container>
            </Box>
        </Box>
    );
}

export default Home;

