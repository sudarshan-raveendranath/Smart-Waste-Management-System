// TopBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';

const TopBar = () => {
    return (
        <AppBar position="static" style={{ backgroundColor: 'black' }}>
            <Toolbar style={{ justifyContent: 'center', minHeight: '40px' }}>
                <Typography variant="body3" color="inherit">
                <b>SmartTrash | Smarter Waste, Greener Future |</b>  Your partner in sustainable waste management, turning trash into a cleaner tomorrow.
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;