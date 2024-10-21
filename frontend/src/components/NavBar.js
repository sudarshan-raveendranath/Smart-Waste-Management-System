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
                    <Button color="inherit" component={Link} to="/BinRequests"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                        Bin Requests
                    </Button>
                    <Button color="inherit" component={Link} to="/Allbins"
                    sx={{
                        fontWeight: 'bold', // Bold text
                    }}>
                     All Bins
                    </Button>
                   
                </Box>

                
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
