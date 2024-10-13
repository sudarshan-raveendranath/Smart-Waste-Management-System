import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, TextField, Button, Snackbar, Alert, Typography, Divider, Box } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const SpecialWasteRequestUpdate = () => {
    const location = useLocation();
    const { eventId, wasteType: passedWasteType, address: passedAddress, date: passedDate, message: passedMessage } = location.state || {};

    const [date, setDate] = useState(passedDate ? dayjs(passedDate) : null);  // Initial value from passed data
    const [wasteType, setWasteType] = useState(passedWasteType || '');
    const [address, setAddress] = useState(passedAddress || '');
    const [message, setMessage] = useState(passedMessage || '');
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Date is required';
        if (!wasteType) newErrors.wasteType = 'Waste type is required';
        if (!address) newErrors.address = 'Address is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const updateRequest = () => {
        const requestData = {
            userId: '12345',  // Assume a constant user ID
            date: date ? date.format('YYYY-MM-DD') : passedDate,
            wasteType: wasteType || passedWasteType,
            address: address || passedAddress,
            message: message || passedMessage,
        };

        if (validateForm()) {
            axios.put(`http://localhost:8080/api/events/${eventId}`, requestData)
                .then((response) => {
                    setSnackbar({ open: true, message: 'Request updated successfully!', severity: 'success' });
                })
                .catch((error) => {
                    setSnackbar({ open: true, message: 'Error updating request. Please try again.', severity: 'error' });
                });
        } else {
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
        }
    };

    const handleSubmit = () => {
        if (validateForm()) {
            updateRequest();
        } else {
            setSnackbar({ open: true, message: 'Please fill all required fields', severity: 'error' });
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ open: false, message: '', severity: '' });
        if (snackbar.severity === 'success') {
            navigate('/ManageSpecialEvents');
        }
    };

    return (
        <>
            <Divider sx={styles.divider}>
                <Typography variant="h4" sx={styles.title}>Update Special Waste Event</Typography>
            </Divider>

            <Typography variant="body1" sx={styles.description}>
                Please update the form below to modify your special waste collection event.
            </Typography>

            <Container maxWidth="md" sx={styles.container}>
                <img src="./images/5.png" alt="Event" style={styles.image} />

                <Box sx={styles.formContainer}>
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
                                    sx={styles.input}
                                />
                            )}
                        />
                    </LocalizationProvider>

                    <TextField
                        label="Waste Type" // Controlled value, initially empty
                        onChange={(e) => setWasteType(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder={passedWasteType}
                        InputLabelProps={{
                            shrink: true,  // Ensures label stays on top
                        }}
                        error={Boolean(errors.wasteType)}
                        helperText={errors.wasteType} // Show the passed value as a hint
                        sx={styles.input}
                    />

                    <TextField
                        label="Address"
                        onChange={(e) => setAddress(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder={passedAddress}
                        error={Boolean(errors.address)}
                        InputLabelProps={{
                            shrink: true,  // Ensures label stays on top
                        }}
                        helperText={errors.address} // Show the passed value as a hint
                        sx={styles.input}
                    />

                    <TextField
                        label="Message (Optional)"
                        onChange={(e) => setMessage(e.target.value)}
                        fullWidth
                        margin="normal"
                        placeholder={passedMessage}
                        InputLabelProps={{
                            shrink: true,  // Ensures label stays on top
                        }}
                        multiline
                        rows={4}  // Show the passed value as a hint
                        sx={styles.input}
                    />


                    <Button variant="contained" fullWidth sx={styles.button} onClick={handleSubmit}>
                        Update Event
                    </Button>
                </Box>
            </Container>

            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </>
    );
};

const styles = {
    divider: { marginBottom: '10px', marginTop: '40px' },
    title: { fontWeight: 'bold', color: '#157045', textAlign: 'center', },
    description: { marginBottom: '50px', textAlign: 'center' },
    container: {
        background: 'radial-gradient(circle, white, #92E3A9)',
        padding: 4,
        borderRadius: 20,
        marginTop: 4,
        marginBottom: 4,
        boxShadow: '0px 8px 15px rgba(0, 0, 0, 0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    image: { display: 'block', margin: '20px auto', borderRadius: '8px' },
    formContainer: {
        width: '100%',
        maxWidth: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    input: {
        width: '100%',
        '& .MuiOutlinedInput-root': {
            borderRadius: '15px',
            borderWidth: '2px',
            '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#157045',
            },
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderRadius: '15px',
            borderWidth: '2px',
        },
    },
    button: {
        mt: 3,
        borderRadius: 10,
        height: 50,
        backgroundColor: '#157045',
        fontWeight: 'bold',
        '&:hover': { backgroundColor: '#145c38' },
    },
};

export default SpecialWasteRequestUpdate;
