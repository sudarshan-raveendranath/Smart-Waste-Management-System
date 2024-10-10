import React, { useState } from 'react';
import { Box, Divider, Typography, Button, Select, MenuItem, FormControl, InputLabel, FormHelperText, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const RequestBinPage = () => {
    const userId = 'user124'; // Constant userId for requests
    const [foodWasteWeight, setFoodWasteWeight] = useState('');
    const [plasticWasteWeight, setPlasticWasteWeight] = useState('');
    const [paperWasteWeight, setPaperWasteWeight] = useState('');

    const [foodWasteError, setFoodWasteError] = useState(false);
    const [plasticWasteError, setPlasticWasteError] = useState(false);
    const [paperWasteError, setPaperWasteError] = useState(false);

    // Snackbar state
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error'); // Can be 'error' or 'success'

    // Close the snackbar
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    // Check for existing bin request and make a new request if none exists
    const handleRequest = (type) => {
        let selectedWeight;
        let setError;

        if (type === 'food') {
            selectedWeight = foodWasteWeight;
            setError = setFoodWasteError;
        } else if (type === 'plastic') {
            selectedWeight = plasticWasteWeight;
            setError = setPlasticWasteError;
        } else if (type === 'paper') {
            selectedWeight = paperWasteWeight;
            setError = setPaperWasteError;
        }

        if (!selectedWeight) {
            setError(true);
            return;
        }

        // Check if there's an existing request for this bin type
        axios.get(`http://localhost:8080/api/binrequests/user/${userId}/${type}`)
            .then(response => {
                const existingRequests = response.data;

                if (existingRequests.length > 0) {
                    // Show error Snackbar if there are pending requests
                    setSnackbarMessage(`You have a pending request for the ${type} bin.`);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                } else {
                    // Create a new bin request
                    const newRequest = {
                        userId,
                        binType: type,
                        totalWeight: selectedWeight,
                    };

                    axios.post('http://localhost:8080/api/binrequests', newRequest)
                        .then(() => {
                            setSnackbarMessage(`Request for ${type} bin submitted successfully!`);
                            setSnackbarSeverity('success');
                            setOpenSnackbar(true);
                        })
                        .catch(() => {
                            setSnackbarMessage('Failed to submit request.');
                            setSnackbarSeverity('error');
                            setOpenSnackbar(true);
                        });
                }
            })
            .catch(() => {
                setSnackbarMessage('Failed to check for existing requests.');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    };

    return (
        <Box sx={styles.container}>
            {/* Snackbar for showing errors/success */}
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            {/* Divider with title */}
            <Divider sx={styles.divider}>
                <Typography variant="h4" sx={styles.title}>
                    Request or Update your bin on waste types
                </Typography>
            </Divider>

            {/* Description */}
            <Typography variant="body1" sx={styles.description}>
                Select the type of bin you want and choose the weight capacity suitable for your needs.
                After selecting, click "Request" to place your order.
            </Typography>

            {/* Row with 3 boxes */}
            <Box sx={styles.boxContainer}>
                {/* Food Waste Bin Box */}
                <Box sx={styles.box}>
                    <Typography variant="h6" sx={styles.boxTitle}>
                        Food Waste Bin
                    </Typography>
                    <img src="./images/foodbin.png" alt="Food Waste" style={styles.image} />
                    <FormControl fullWidth sx={styles.formControl} error={foodWasteError}>
                        <InputLabel>Weight</InputLabel>
                        <Select
                            value={foodWasteWeight}
                            onChange={(e) => {
                                setFoodWasteWeight(e.target.value);
                                setFoodWasteError(false); // Reset error when weight is selected
                            }}
                            label="Weight"
                            sx={styles.dropdown}
                        >
                            <MenuItem value={20}>20 kg</MenuItem>
                            <MenuItem value={40}>40 kg</MenuItem>
                            <MenuItem value={60}>60 kg</MenuItem>
                        </Select>
                        {foodWasteError && <FormHelperText>Please select a weight</FormHelperText>}
                    </FormControl>
                    <Button variant="contained" sx={styles.requestButton} onClick={() => handleRequest('food')}>
                        Request
                    </Button>
                </Box>

                {/* Plastic Waste Bin Box */}
                <Box sx={styles.box}>
                    <Typography variant="h6" sx={styles.boxTitle}>
                        Plastic Waste Bin
                    </Typography>
                    <img src="./images/plasticbin.png" alt="Plastic Waste" style={styles.image} />
                    <FormControl fullWidth sx={styles.formControl} error={plasticWasteError}>
                        <InputLabel>Weight</InputLabel>
                        <Select
                            value={plasticWasteWeight}
                            onChange={(e) => {
                                setPlasticWasteWeight(e.target.value);
                                setPlasticWasteError(false); // Reset error when weight is selected
                            }}
                            label="Weight"
                            sx={styles.dropdown}
                        >
                            <MenuItem value={20}>20 kg</MenuItem>
                            <MenuItem value={40}>40 kg</MenuItem>
                            <MenuItem value={60}>60 kg</MenuItem>
                        </Select>
                        {plasticWasteError && <FormHelperText>Please select a weight</FormHelperText>}
                    </FormControl>
                    <Button variant="contained" sx={styles.requestButton} onClick={() => handleRequest('plastic')}>
                        Request
                    </Button>
                </Box>

                {/* Paper Waste Bin Box */}
                <Box sx={styles.box}>
                    <Typography variant="h6" sx={styles.boxTitle}>
                        Paper Waste Bin
                    </Typography>
                    <img src="./images/paperbin.png" alt="Paper Waste" style={styles.image} />
                    <FormControl fullWidth sx={styles.formControl} error={paperWasteError}>
                        <InputLabel>Weight</InputLabel>
                        <Select
                            value={paperWasteWeight}
                            onChange={(e) => {
                                setPaperWasteWeight(e.target.value);
                                setPaperWasteError(false); // Reset error when weight is selected
                            }}
                            label="Weight"
                            sx={styles.dropdown}
                        >
                            <MenuItem value={20}>20 kg</MenuItem>
                            <MenuItem value={40}>40 kg</MenuItem>
                            <MenuItem value={60}>60 kg</MenuItem>
                        </Select>
                        {paperWasteError && <FormHelperText>Please select a weight</FormHelperText>}
                    </FormControl>
                    <Button variant="contained" sx={styles.requestButton} onClick={() => handleRequest('paper')}>
                        Request
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

// Styles using Material-UI's sx prop
const styles = {
    container: {
        padding: '20px',
        '@media (max-width: 600px)': {
            padding: '10px', // Reduce padding on smaller screens
        },
    },
    divider: {
        marginBottom: '10px',
    },
    title: {
        fontWeight: 'bold',
        color: '#157045',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            fontSize: '22px', // Adjust font size on smaller screens
        },
    },
    description: {
        marginBottom: '50px',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            marginBottom: '20px', // Reduce margin on smaller screens
            fontSize: '14px', // Adjust font size for readability
        },
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '20px',
        '@media (max-width: 900px)': {
            flexDirection: 'column', // Stack boxes vertically on smaller screens
            gap: '10px',
        },
    },
    box: {
        flex: 1,
        padding: '30px',
        backgroundColor: '#fff',
        borderRadius: '25px',
        boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.6)',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            padding: '20px', // Reduce padding on smaller screens
        },
    },
    boxTitle: {
        fontWeight: 'bold',
        color: '#157045',
        marginBottom: '20px',
        fontSize: '25px',
        '@media (max-width: 600px)': {
            fontSize: '18px', // Adjust font size for smaller screens
            marginBottom: '15px',
        },
    },
    image: {
        width: '40%',
        height: 'auto',
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            width: '60%', // Adjust image size on smaller screens
        },
    },
    formControl: {
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            marginBottom: '15px',
        },
    },
    dropdown: {
        borderRadius: '15px',
    },
    requestButton: {
        backgroundColor: '#157045',
        color: '#fff',
        borderRadius: '20px',
        width: '150px',
        '&:hover': {
            backgroundColor: '#145c38',
        },
        '@media (max-width: 600px)': {
            width: '100px', // Adjust button size on smaller screens
        },
    },
};


export default RequestBinPage;
