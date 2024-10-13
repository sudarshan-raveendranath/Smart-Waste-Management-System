import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, TextField, Button, Snackbar, Alert, Typography, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

const SpecialWasteRequestUpdate = () => {
    // Form state management
    const [date, setDate] = useState(null);
    const [wasteType, setWasteType] = useState('');
    const [address, setAddress] = useState('');
    const [message, setMessage] = useState('');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const USER_ID = '12345'; // Constant for user ID

    // Form validation
    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Date is required';
        if (!wasteType) newErrors.wasteType = 'Waste type is required';
        if (!address) newErrors.address = 'Address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Simulate save method
    const saveRequest = () => {
        // Collect form data
        const requestData = {
            userId: USER_ID,
            date: date ? date.format('YYYY-MM-DD') : '',
            wasteType,
            address,
            message,
        };

        // Validate form
        if (validateForm()) {
            // Make POST request to the backend
            axios.post('http://localhost:8080/api/events', requestData)
                .then((response) => {
                    // Handle success response
                    console.log(response.data);
                    setSnackbar({ open: true, message: 'Request submitted successfully!', severity: 'success' });
                })
                .catch((error) => {
                    // Handle error response
                    console.error('Error submitting request:', error);
                    setSnackbar({ open: true, message: 'Error submitting request. Please try again.', severity: 'error' });
                });
        } else {
            // Show error snackbar if validation fails
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
        }
    };

    // Handle form submission
    const handleSubmit = () => {
        if (validateForm()) {
            saveRequest(); // Call the save method
        } else {
            // Show error snackbar
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
        }
    };

    // Handle closing snackbar
    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ open: false, message: '', severity: '' });
        if (snackbar.severity === 'success') {
            navigate('/ManageSpecialEvents'); // Navigate to ManageRequest after successful submission
        }
    };

    return (
        <>
            {/* Title and Description outside the container */}
            <Divider sx={styles.divider}>
                <Typography variant="h4" sx={styles.title}>
                    Request Special Waste Event
                </Typography>
            </Divider>

            <Typography variant="body1" sx={styles.description}>
                Please fill the form below to request a special waste collection event.
            </Typography>

            {/* Form Container */}
            <Container
                maxWidth="md" // Increase container width
                sx={{
                    background: 'radial-gradient(circle, white, #92E3A9)',
                    padding: 4,
                    borderRadius: 20,
                    marginTop: 4,
                    boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.6)', // Add shadow
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                {/* Image Placeholder */}
                <img
                    src="./images/seventpic.png" // Replace with actual image URL
                    alt="Event"
                    style={{ display: 'block', margin: '20px auto', borderRadius: '8px' }}
                />

                {/* Form Fields */}
                <Box
                    sx={{
                        width: '100%',
                        maxWidth: 500, // Increase max width of form fields
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            label="Choose Date"
                            value={date}
                            onChange={(newDate) => setDate(newDate)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    fullWidth
                                    margin="normal"
                                    error={Boolean(errors.date)}
                                    helperText={errors.date}
                                    sx={{
                                        width: '100%', // Ensure full width
                                        '& .MuiOutlinedInput-root': {
                                            borderRadius: '15px', // Rounded corners for the input container
                                            borderWidth: '2px', // Set border width
                                            borderColor: errors.date ? 'red' : '#ccc', // Change color on error
                                            '&:hover .MuiOutlinedInput-notchedOutline': {
                                                borderColor: '#157045', // Change color on hover
                                            },
                                        },
                                        '& .MuiOutlinedInput-notchedOutline': {
                                            borderRadius: '15px', // Rounded corners for the outline
                                            borderWidth: '2px', // Set outline border width
                                        },
                                    }}
                                />
                            )}
                        />
                    </LocalizationProvider>


                    <TextField
                        label="Waste Type"
                        value={wasteType}
                        onChange={(e) => setWasteType(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.wasteType)}
                        helperText={errors.wasteType}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px', // Rounded corners for the input
                                borderWidth: '2px', // Set border width
                                borderColor: errors.wasteType ? 'red' : '#ccc', // Change color on error
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#157045', // Change color on hover
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '15px', // Rounded corners for the outline
                                borderWidth: '2px', // Set outline border width
                            },
                        }}
                    />

                    <TextField
                        label="Address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        margin="normal"
                        error={Boolean(errors.address)}
                        helperText={errors.address}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px', // Rounded corners for the input
                                borderWidth: '2px', // Set border width
                                borderColor: errors.address ? 'red' : '#ccc', // Change color on error
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#157045', // Change color on hover
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '15px', // Rounded corners for the outline
                                borderWidth: '2px', // Set outline border width
                            },
                        }}
                    />

                    <TextField
                        label="Message (Optional)"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                        sx={{
                            width: '100%',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: '15px', // Rounded corners for the input
                                borderWidth: '2px', // Set border width
                                '&:hover .MuiOutlinedInput-notchedOutline': {
                                    borderColor: '#157045', // Change color on hover
                                },
                            },
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderRadius: '15px', // Rounded corners for the outline
                                borderWidth: '2px', // Set outline border width
                            },
                        }}
                    />

                    {/* Submit Button */}
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 3,
                            borderRadius: 10,
                            height: 50, // Increase button height
                            backgroundColor: '#157045', // Change button color
                            fontWeight: 'bold', // Make button text bold
                            '&:hover': {
                                backgroundColor: '#145c38',
                            },
                        }}
                        onClick={handleSubmit}
                    >
                        Request Event
                    </Button>
                </Box>
            </Container>

            {/* Snackbar for success or error messages */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

const styles = {
    divider: {
        marginBottom: '10px',
    },
    title: {
        fontWeight: 'bold',
        color: '#157045',
        textAlign: 'center',
    },
    description: {
        marginBottom: '50px',
        textAlign: 'center',
    },
};

export default SpecialWasteRequestUpdate;
