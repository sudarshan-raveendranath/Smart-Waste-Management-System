import React from 'react';
import { Button, Typography, Box, Container, Grid } from '@mui/material';
import { useRef } from 'react';
import FeaturesAndServices from './FeaturesAndServices';

const SmartTrashFriends = () => {
    const bottomRef = useRef(null);

    const handleStartClick = () => {
        bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Box
                sx={{
                    minHeight: '90vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'left', // Reduced upper space
                }}
            >
                <Container>
                    <Grid container spacing={8} > {/* Reduced spacing */}
                        {/* Text Section */}
                        <Grid item xs={12} md={6}>
                            <Typography
                                variant="h1" // Bigger text for "Hello"
                                gutterBottom
                                sx={{
                                    fontWeight: 'bold',
                                    fontSize: '60px', // Adjusted size for "Hello"
                                }}
                            >
                                Hello,
                            </Typography>
                            <Typography
                                variant="h4"
                                color="#157045"
                                gutterBottom
                                sx={{ fontWeight: 'bold' }} // Bold for "SmartTrash Friends"
                            >
                                SmartTrash Friends..!
                            </Typography>
                            <Typography
                                variant="body1"
                                paragraph
                                sx={{ fontSize: '18px' }} // Larger paragraph text
                            >
                                Get ready to make waste management a more enjoyable and seamless experience.
                                With SmartTrash, managing your waste will no longer feel like a chore but a
                                fulfilling step towards a greener, cleaner future. This journey starts with a
                                small but impactful action – applying the sensor to your trash bin, which will
                                help us track and optimize waste disposal effectively. Together, let's
                                ensure that no small effort goes unnoticed in our shared goal of protecting the
                                environment for generations to come.
                            </Typography>
                            {/* Centered Button */}
                            <Box sx={{ display: 'flex' }}>
                                <Button
                                    variant="contained"
                                    onClick={handleStartClick}
                                    sx={{
                                        marginTop: '16px',
                                        padding: '10px 30px',
                                        borderRadius: '15px', // Rounded corners
                                        backgroundColor: '#157045', // Custom color
                                        width: '200px',
                                        fontWeight: 'bold',
                                        fontSize: 16,
                                        boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.)', // Increased width
                                        '&:hover': {
                                            backgroundColor: '#105934', // Darker shade for hover effect
                                        },
                                    }}
                                >
                                    Start
                                </Button>

                            </Box>
                        </Grid>

                        {/* Image Section */}
                        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <img
                                src={require('../images/homepic.png')} // Ensure to adjust the path as necessary
                                alt="Smart Trash"
                                style={{
                                    width: '100%', // Make the image responsive
                                    height: 'auto', // Maintain aspect ratio
                                    maxHeight: '480px', // Limit the height of the image box
                                    objectFit: 'contain', // Ensure the image scales correctly
                                }}
                            />
                        </Grid>
                    </Grid>
                </Container>
                <div ref={bottomRef}></div>
            </Box>
            <Box>
                <FeaturesAndServices />
            </Box>
        </>
    );
};

export default SmartTrashFriends;
