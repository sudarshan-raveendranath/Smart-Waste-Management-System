// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: '#157045' }}>
            <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
                <IconButton edge="start" color="inherit" aria-label="menu" component={Link} to="/">
                    <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold' }}>
                        SmartTrash
                    </Typography>
                </IconButton>

                <Box style={{ display: 'flex', gap: '20px' }}>
                    <Button color="inherit" component={Link} to="/"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                        TRASH BIN
                    </Button>
                    <Button color="inherit" component={Link} to="/"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                        PROFILE
                    </Button>
                    <Button color="inherit" component={Link} to="/"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                        CAREERS
                    </Button>
                </Box>

                <Box>
                    <Button
                        component={Link}
                        to="/"
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '10px',
                            color: '#157045',
                            fontWeight: 'bold', // Bold text
                            height: '35px', // Decreased button height
                            border: '2px solid #157045', // Add a green border
                            '&:hover': {
                                backgroundColor: '#157045', // Green on hover
                                color: 'white', // White text on hover
                                borderColor: 'white', // White border on hover
                            }
                        }}
                    >
                        LOGIN
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
