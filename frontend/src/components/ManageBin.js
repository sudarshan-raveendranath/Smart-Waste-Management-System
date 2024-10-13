import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, Button, TextField, Snackbar, Alert } from '@mui/material';
import axios from 'axios';

const ManageBinPage = () => {
    const userId = 'user987'; // Constant userId for requests

    const [binData, setBinData] = useState({
        food: { totalCapacity: 0, filledCapacity: 0, availableCapacity: 0, binId: null },
        plastic: { totalCapacity: 0, filledCapacity: 0, availableCapacity: 0, binId: null },
        paper: { totalCapacity: 0, filledCapacity: 0, availableCapacity: 0, binId: null },
    });

    const [foodWasteWeight, setFoodWasteWeight] = useState('');
    const [plasticWasteWeight, setPlasticWasteWeight] = useState('');
    const [paperWasteWeight, setPaperWasteWeight] = useState('');

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('error');

    useEffect(() => {
        axios.get(`http://localhost:8080/api/bins/user/${userId}`)
            .then(response => {
                const bins = response.data;
                const updatedData = { food: {}, plastic: {}, paper: {} };

                bins.forEach(bin => {
                    const availableCapacity = bin.totalWeight - bin.filledWeight;

                    switch (bin.binType) {
                        case 'food':
                            updatedData.food = {
                                binId: bin.binId,
                                totalCapacity: bin.totalWeight,
                                filledCapacity: bin.filledWeight,
                                availableCapacity: availableCapacity,
                            };
                            break;
                        case 'plastic':
                            updatedData.plastic = {
                                binId: bin.binId,
                                totalCapacity: bin.totalWeight,
                                filledCapacity: bin.filledWeight,
                                availableCapacity: availableCapacity,
                            };
                            break;
                        case 'paper':
                            updatedData.paper = {
                                binId: bin.binId,
                                totalCapacity: bin.totalWeight,
                                filledCapacity: bin.filledWeight,
                                availableCapacity: availableCapacity,
                            };
                            break;
                        default:
                            break;
                    }
                });

                setBinData(updatedData);
            })
            .catch(error => {
                setSnackbarMessage('Error fetching bin data');
                setSnackbarSeverity('error');
                setOpenSnackbar(true);
            });
    }, []);

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleUpdate = (wasteWeight, availableCapacity, wasteType, binId, totalCapacity) => {
        if (parseFloat(wasteWeight) > totalCapacity) {
            setSnackbarMessage(`You can only enter a maximum of ${totalCapacity} kg for ${wasteType}`);
            setSnackbarSeverity('error');
            setOpenSnackbar(true);
        } else {
            // Make an API request to update the bin's weight
            axios.put(`http://localhost:8080/api/bins/${binId}`, { filledWeight: parseFloat(wasteWeight) })
                .then(response => {
                    setSnackbarMessage(`Successfully updated ${wasteType} waste weight`);
                    setSnackbarSeverity('success');
                    setOpenSnackbar(true);

                    // Optionally, you can re-fetch the bin data to ensure the UI is updated
                    axios.get(`http://localhost:8080/api/bins/user/${userId}`)
                        .then(response => {
                            const bins = response.data;
                            const updatedData = { food: {}, plastic: {}, paper: {} };

                            bins.forEach(bin => {
                                const availableCapacity = bin.totalWeight - bin.filledWeight;
                                switch (bin.binType) {
                                    case 'food':
                                        updatedData.food = {
                                            binId: bin.binId,
                                            totalCapacity: bin.totalWeight,
                                            filledCapacity: bin.filledWeight,
                                            availableCapacity: availableCapacity,
                                        };
                                        break;
                                    case 'plastic':
                                        updatedData.plastic = {
                                            binId: bin.binId,
                                            totalCapacity: bin.totalWeight,
                                            filledCapacity: bin.filledWeight,
                                            availableCapacity: availableCapacity,
                                        };
                                        break;
                                    case 'paper':
                                        updatedData.paper = {
                                            binId: bin.binId,
                                            totalCapacity: bin.totalWeight,
                                            filledCapacity: bin.filledWeight,
                                            availableCapacity: availableCapacity,
                                        };
                                        break;
                                    default:
                                        break;
                                }
                            });

                            setBinData(updatedData);
                        })
                        .catch(error => {
                            setSnackbarMessage('Error fetching updated bin data');
                            setSnackbarSeverity('error');
                            setOpenSnackbar(true);
                        });
                })
                .catch(error => {
                    setSnackbarMessage(`Error updating ${wasteType} waste weight`);
                    setSnackbarSeverity('error');
                    setOpenSnackbar(true);
                });
        }
    };


    return (
        <Box sx={styles.container}>
            <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>

            <Divider sx={styles.divider}>
                <Typography variant="h4" sx={styles.title}>
                    Update Waste Weights in Your Bins
                </Typography>
            </Divider>

            <Typography variant="body1" sx={styles.description}>
                Update the current waste weights in your bins to ensure accurate tracking of your recycling efforts.
            </Typography>

            <Box sx={styles.boxContainer}>
                {/* Food Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #e0f7fa, #80cbc4)' }}>
                    <Typography variant="h6" sx={styles.boxTitle}>Food Waste Bin</Typography>
                    <img src="./images/foodbin.png" alt="Food Waste" style={styles.image} />
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.food.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.food.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.food.availableCapacity} kg</span></Typography>
                    <TextField
                        label="Enter Weight"
                        variant="outlined"
                        type="number"
                        value={foodWasteWeight}
                        onChange={(e) => setFoodWasteWeight(e.target.value)}
                        fullWidth
                        sx={styles.textField}
                    />
                    <Button
                        variant="contained"
                        sx={styles.requestButton}
                        onClick={() => handleUpdate(foodWasteWeight, binData.food.availableCapacity, 'Food', binData.food.binId, binData.food.totalCapacity)}
                    >
                        Update
                    </Button>
                </Box>

                {/* Plastic Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #e3f2fd, #90caf9)' }}>
                    <Typography variant="h6" sx={styles.boxTitle}>Plastic Waste Bin</Typography>
                    <img src="./images/plasticbin.png" alt="Plastic Waste" style={styles.image} />
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.plastic.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.plastic.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.plastic.availableCapacity} kg</span></Typography>
                    <TextField
                        label="Enter Weight"
                        variant="outlined"
                        type="number"
                        value={plasticWasteWeight}
                        onChange={(e) => setPlasticWasteWeight(e.target.value)}
                        fullWidth
                        sx={styles.textField}
                    />
                    <Button
                        variant="contained"
                        sx={styles.requestButton}
                        onClick={() => handleUpdate(plasticWasteWeight, binData.plastic.availableCapacity, 'Plastic', binData.plastic.binId, binData.plastic.totalCapacity)}
                    >
                        Update
                    </Button>
                </Box>

                {/* Paper Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #fffde7, #fff59d)' }}>
                    <Typography variant="h6" sx={styles.boxTitle}>Paper Waste Bin</Typography>
                    <img src="./images/paperbin.png" alt="Paper Waste" style={styles.image} />
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.paper.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.paper.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.paper.availableCapacity} kg</span></Typography>
                    <TextField
                        label="Enter Weight"
                        variant="outlined"
                        type="number"
                        value={paperWasteWeight}
                        onChange={(e) => setPaperWasteWeight(e.target.value)}
                        fullWidth
                        sx={styles.textField}
                    />
                    <Button
                        variant="contained"
                        sx={styles.requestButton}
                        onClick={() => handleUpdate(paperWasteWeight, binData.paper.availableCapacity, 'Paper', binData.paper.binId, binData.paper.totalCapacity)}
                    >
                        Update
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
            padding: '10px',
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
            fontSize: '22px',
        },
    },
    description: {
        marginBottom: '50px',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            marginBottom: '20px',
            fontSize: '14px',
        },
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        gap: '20px',
        marginTop: '20px',
        '@media (max-width: 900px)': {
            flexDirection: 'column',
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
            padding: '20px',
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
    boxTitle: {
        fontWeight: 'bold',
        color: '#157045',
        marginBottom: '20px',
        fontSize: '25px',
        '@media (max-width: 600px)': {
            fontSize: '18px',
            marginBottom: '15px',
        },
    },
    info: {
        fontSize: '18px',
        marginBottom: '10px',
    },
    textField: {
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
            borderRadius: '20px', // Custom border radius
        },
    },
    formControl: {
        marginBottom: '20px',
        '@media (max-width: 600px)': {
            marginBottom: '15px',
        },
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
            width: '100px',
        },
    },
};

export default ManageBinPage;
