// SocialMediaDock.js
import React from 'react';
import { IconButton, Box } from '@mui/material';
import { WhatsApp, Facebook, Instagram } from '@mui/icons-material';

const SocialMediaDock = () => {
  return (
    <Box
      sx={{
        position: 'fixed',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        padding: '10px',
        backgroundColor: 'rgba(0,0,0,0.6)',
        borderRadius: '0 10px 10px 0',
      }}
    >
      <IconButton href="https://wa.me/" target="_blank" sx={{ color: 'white', '&:hover': { color: '#25D366', boxShadow: '0 0 10px #25D366, 0 0 20px #25D366' } }}>
        <WhatsApp />
      </IconButton>
      <IconButton href="https://facebook.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#1877F2', boxShadow: '0 0 10px #1877F2, 0 0 20px #1877F2' } }}>
        <Facebook />
      </IconButton>
      <IconButton href="https://instagram.com" target="_blank" sx={{ color: 'white', '&:hover': { color: '#E1306C', boxShadow: '0 0 10px #E1306C, 0 0 20px #E1306C' } }}>
        <Instagram />
      </IconButton>
    </Box>
  );
};

export default SocialMediaDock;
