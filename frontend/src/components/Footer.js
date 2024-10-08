import React from 'react';
import { Box, Container, Grid, Typography, Link, TextField, Button, IconButton } from '@mui/material';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';

const Footer = () => {
    return (
        <Box component="footer" sx={{ backgroundColor: '#157045', py: 5, color: 'white' }}>
            <Container>
                <Grid container spacing={4} alignItems="flex-start">
                    {/* Information Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#white' }}>
                            INFORMATION
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><Link href="#" sx={{ color: 'white' }}>Home</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>About Us</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>Awards</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>Contact Us</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>Terms & Conditions</Link></li>
                        </ul>
                    </Grid>

                    {/* Quick Links */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#white' }}>
                            QUICK LINKS
                        </Typography>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li><Link href="#" sx={{ color: 'white' }}>Profile</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>Home</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>Our Authorities</Link></li>
                            <li><Link href="#" sx={{ color: 'white' }}>My Trash Bin</Link></li>
                        </ul>
                    </Grid>
                    {/* Contact Information */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#white' }}>
                            OFFICE OPENING HOURS
                        </Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>Mon-Fri: 9.00 AM - 5.30 PM</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>Saturday: 9.00 AM - 2.30 PM</Typography>
                        <Typography variant="body2" sx={{ color: 'white' }}>Sunday: Closed</Typography>
                        <Box mt={2}>
                            <Typography variant="h6" gutterBottom sx={{ color: '#white' }}>
                                CONTACT US
                            </Typography>
                            <Box display="flex" alignItems="center">
                                <PhoneIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" sx={{ color: 'white' }}>077 333 3333</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={1}>
                                <EmailIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" sx={{ color: 'white' }}>online@SmartTrash.com</Typography>
                            </Box>
                            <Box display="flex" alignItems="center" mt={1}>
                                <WhatsAppIcon sx={{ mr: 1, color: 'white' }} />
                                <Typography variant="body2" sx={{ color: 'white' }}>077 333 3333</Typography>
                            </Box>
                        </Box>
                        <Box display="flex" mt={2}>
                            <IconButton href="https://www.facebook.com" target="_blank" color="primary">
                                <FacebookIcon sx={{ color: 'white' }} />
                            </IconButton>
                            <IconButton href="https://www.instagram.com" target="_blank" color="primary">
                                <InstagramIcon sx={{ color: 'white' }} />
                            </IconButton>
                        </Box>
                    </Grid>

                    {/* Contact Form */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="h6" gutterBottom sx={{ color: '#white' }}>
                            GET IN TOUCH WITH US
                        </Typography>
                        <Box
                            sx={{
                                backgroundColor: 'rgba(255, 255, 255, 0.2)', // Transparent white background
                                padding: '16px',
                                borderRadius: '8px', // Optional: add rounded corners
                            }}
                        >
                            <form>
                                <TextField
                                    label="Name"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                                <TextField
                                    label="Email"
                                    variant="outlined"
                                    fullWidth
                                    margin="normal"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                                <TextField
                                    label="Message"
                                    variant="outlined"
                                    fullWidth
                                    multiline
                                    rows={3}
                                    margin="normal"
                                    InputLabelProps={{ style: { color: 'white' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    fullWidth
                                    sx={{ mt: 2 }}
                                >
                                    Submit
                                </Button>
                            </form>
                        </Box>
                    </Grid>

                </Grid>
                {/* Footer Bottom */}
                <Box sx={{ backgroundColor: '#2f2f2f', py: 2, mt: 5, mb: -5, width: '100vw', position: 'relative', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw', textAlign: 'center', color: 'white' }}>
                    <Typography variant="body2">
                        Copyright © 2024 - SmartTrash - All Rights Reserved.
                    </Typography>
                    <Typography variant="body2">
                        Concept, Design & Development by Y1-S1-SE-WE-09
                    </Typography>
                </Box>
            </Container>
        </Box>
    );
};

export default Footer;
