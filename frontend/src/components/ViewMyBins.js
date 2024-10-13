import React, { useState, useEffect } from 'react';
import { Box, Divider, Typography, Snackbar, Alert } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import axios from 'axios';

const ViewBinPage = () => {
    const userId = 'user987'; // Constant userId for requests

    const [binData, setBinData] = useState({
        food: { totalCapacity: 1, filledCapacity: 0, availableCapacity: 0, binId: null },
        plastic: { totalCapacity: 1, filledCapacity: 0, availableCapacity: 0, binId: null },
        paper: { totalCapacity: 1, filledCapacity: 0, availableCapacity: 0, binId: null },
    });

    const [currentFilledFood, setCurrentFilledFood] = useState(0);
    const [currentFilledPlastic, setCurrentFilledPlastic] = useState(0);
    const [currentFilledPaper, setCurrentFilledPaper] = useState(0);

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

                animateGaugeFilling(updatedData.food.filledCapacity, setCurrentFilledFood, 2000);  // 1 second for food
                animateGaugeFilling(updatedData.plastic.filledCapacity, setCurrentFilledPlastic, 2000);  // 1.5 seconds for plastic
                animateGaugeFilling(updatedData.paper.filledCapacity, setCurrentFilledPaper, 2000);  // 1.2 seconds for paper
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

    // Function to animate the gauge filling
    const animateGaugeFilling = (targetValue, setValue, duration) => {
        const startValue = 0;  // Starting value
        const startTime = performance.now();  // Record start time

        const animate = (currentTime) => {
            const elapsedTime = currentTime - startTime;  // Time elapsed since start
            const progress = Math.min(elapsedTime / duration, 1);  // Progress between 0 and 1

            // Interpolate the value between start and target based on progress
            const currentValue = startValue + (targetValue - startValue) * progress;

            setValue(currentValue);  // Update the gauge value

            // Continue the animation until it reaches the target value
            if (progress < 1) {
                requestAnimationFrame(animate);  // Use requestAnimationFrame for smooth animation
            } else {
                setValue(targetValue);  // Ensure it ends at the target value
            }
        };

        requestAnimationFrame(animate);  // Start the animation
    };


    const gaugeColors = {
        food: '#388e3c',    // Darker green for food waste
        plastic: '#1e88e5',  // Darker blue for plastic waste
        paper: '#fbc02d',   // Darker yellow for paper waste
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
                    View Waste Weights in Your Bins In Detail
                </Typography>
            </Divider>

            <Typography variant="body1" sx={styles.description}>
                View detailed waste levels in your bins with easy-to-read charts and track your recycling progress effectively.
            </Typography>

            <Box sx={styles.boxContainer}>
                {/* Food Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #e0f7fa, #80cbc4)' }}>
                    <Typography variant="h5" sx={styles.boxTitle}>Food Waste Bin</Typography>
                    <img src="./images/foodbin.png" alt="Food Waste" style={styles.image} />
                    <Box sx={styles.gaugeContainer}>
                        <Gauge
                            value={currentFilledFood}
                            valueMax={binData.food.totalCapacity}
                            startAngle={-110}
                            endAngle={110}
                            width={250}  // Increased gauge width
                            height={200}  // Increased gauge height
                            sx={{
                                marginY: 2,  // Adds top and bottom margins
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    transform: 'translate(0px, 10px)',
                                    fill: gaugeColors.food,  // Apply matching color
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: gaugeColors.food,  // Apply matching color
                                },
                                [`& .${gaugeClasses.root}`]: {
                                    borderRadius: '15px',  // Rounded corners for gauge
                                },
                            }}
                            text={({ value, valueMax }) => `${Math.round(value)} / ${valueMax}`}
                        />
                    </Box>
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.food.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.food.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.food.availableCapacity} kg</span></Typography>
                </Box>

                {/* Plastic Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #e3f2fd, #90caf9)' }}>
                    <Typography variant="h5" sx={styles.boxTitle}>Plastic Waste Bin</Typography>
                    <img src="./images/plasticbin.png" alt="Plastic Waste" style={styles.image} />
                    <Box sx={styles.gaugeContainer}>
                        <Gauge
                            value={currentFilledPlastic}
                            valueMax={binData.plastic.totalCapacity}
                            startAngle={-110}
                            endAngle={110}
                            width={250}  // Increased gauge width
                            height={200}  // Increased gauge height
                            sx={{
                                marginY: 2,  // Adds top and bottom margins
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    transform: 'translate(0px, 10px)',
                                    fill: gaugeColors.plastic,  // Apply matching color
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: gaugeColors.plastic,  // Apply matching color
                                },
                                [`& .${gaugeClasses.root}`]: {
                                    borderRadius: '15px',  // Rounded corners for gauge
                                },
                            }}
                            text={({ value, valueMax }) => `${Math.round(value)} / ${valueMax}`}
                        />
                    </Box>
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.plastic.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.plastic.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.plastic.availableCapacity} kg</span></Typography>
                </Box>

                {/* Paper Waste Bin Box */}
                <Box sx={{ ...styles.box, background: 'linear-gradient(to right, #fffde7, #fff59d)' }}>
                    <Typography variant="h5" sx={styles.boxTitle}>Paper Waste Bin</Typography>
                    <img src="./images/paperbin.png" alt="Paper Waste" style={styles.image} />
                    <Box sx={styles.gaugeContainer}>
                        <Gauge
                            value={currentFilledPaper}
                            valueMax={binData.paper.totalCapacity}
                            startAngle={-110}
                            endAngle={110}
                            width={250}  // Increased gauge width
                            height={200}  // Increased gauge height
                            sx={{
                                marginY: 2,  // Adds top and bottom margins
                                [`& .${gaugeClasses.valueText}`]: {
                                    fontSize: 22,
                                    fontWeight: 'bold',
                                    transform: 'translate(0px, 10px)',
                                    fill: gaugeColors.paper,  // Apply matching color
                                },
                                [`& .${gaugeClasses.valueArc}`]: {
                                    fill: gaugeColors.paper,  // Apply matching color
                                },
                                [`& .${gaugeClasses.root}`]: {
                                    borderRadius: '15px',  // Rounded corners for gauge
                                },
                            }}
                            text={({ value, valueMax }) => `${Math.round(value)} / ${valueMax}`}
                        />
                    </Box>
                    <Typography sx={styles.info}><strong>Total Capacity:</strong> <span>{binData.paper.totalCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Filled:</strong> <span>{binData.paper.filledCapacity} kg</span></Typography>
                    <Typography sx={styles.info}><strong>Available:</strong> <span>{binData.paper.availableCapacity} kg</span></Typography>
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
            fontSize: '24px',
        },
    },
    description: {
        marginBottom: '20px',
        color: '#333',
        textAlign: 'center',
        '@media (max-width: 600px)': {
            fontSize: '14px',
        },
    },
    boxContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        '@media (max-width: 1000px)': {
            flexDirection: 'column',
            alignItems: 'center',
        },
    },
    box: {
        width: '320px',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        textAlign: 'center',
        margin: '20px 0',
    },
    boxTitle: {
        fontWeight: 'bold',
        color: '#157045',
        marginBottom: '15px',
    },
    image: {
        width: '150px',
        height: '150px',
    },
    gaugeContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '15px',
    },
    info: {
        color: '#333',
        marginTop: '5px',
        fontSize: '16px',
    },
};

export default ViewBinPage;
