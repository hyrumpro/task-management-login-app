import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function Footer({ mode }) {
    return (
        <Box
            component="footer"
            sx={{
                py: 3,
                px: 2,
                mt: 'auto',
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? 'rgba(255, 255, 255, 0.4)'
                        : 'rgba(0, 0, 0, 0.4)',
                backdropFilter: 'blur(24px)',
                border: '1px solid',
                borderColor: 'divider',
                boxShadow:
                    mode === 'light'
                        ? `0 0 1px rgba(85, 166, 246, 0.1), 1px 1.5px 2px -1px rgba(85, 166, 246, 0.15), 4px 4px 12px -2.5px rgba(85, 166, 246, 0.15)`
                        : '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}
                >
                    <Typography variant="body2" color="text.primary">
                        &copy; {new Date().getFullYear()} My App. All rights reserved.
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', md: 'row' },
                            alignItems: { xs: 'center', md: 'center' },
                            mt: { xs: 2, md: 0 },
                        }}
                    >
                        <Link href="#" variant="body2" color="text.primary" sx={{ mr: 2 }}>
                            Privacy Policy
                        </Link>
                        <Link href="#" variant="body2" color="text.primary" sx={{ mr: 2 }}>
                            Terms of Service
                        </Link>
                        <Link href="#" variant="body2" color="text.primary">
                            Contact Us
                        </Link>
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

Footer.propTypes = {
    mode: PropTypes.oneOf(['dark', 'light']).isRequired,
};

export default Footer;
