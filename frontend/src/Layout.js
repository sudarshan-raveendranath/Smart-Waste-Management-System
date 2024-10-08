// Layout.js
import React from 'react';
import NavBar from './components/NavBar';
import TopBar from './components/TopBar';
import { Box } from '@mui/material';
import Footer from './components/Footer';
import SocialMediaDock from './components/SocialMediaDock';

const Layout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Header */}
      <SocialMediaDock />
      <TopBar />
      <NavBar />
      

      {/* Main Content */}
      <Box component="main" sx={{ flexGrow: 1 }}>
        {children}
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Layout;
