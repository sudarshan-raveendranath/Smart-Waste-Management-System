import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Snackbar, Alert, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Typography, Divider, Box } from '@mui/material';

const SpecialWasteManage = () => {
    const userId = 'user008';
    const [events, setEvents] = useState([]);
    const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'ascending' });
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' });
    const [openDialog, setOpenDialog] = useState(false);
    const [deleteEventId, setDeleteEventId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/api/events/user/${userId}`)
            .then(response => {
                setEvents(response.data);
            })
            .catch(error => {
                setSnackbar({ open: true, message: 'Error fetching events', severity: 'error' });
            });
    }, []);

    const sortEvents = (key) => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });

        const sortedEvents = [...events].sort((a, b) => {
            if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
            if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
            return 0;
        });
        setEvents(sortedEvents);
    };

    const handleDeleteEvent = () => {
        if (!deleteEventId) {
            setSnackbar({ open: true, message: 'Error: No event selected for deletion', severity: 'error' });
            return;
        }
        axios.delete(`http://localhost:8080/api/events/${deleteEventId}`)
            .then(() => {
                setEvents(events.filter(event => event.eventId !== deleteEventId));
                setSnackbar({ open: true, message: 'Event deleted successfully', severity: 'success' });
                setOpenDialog(false);
            })
            .catch(() => {
                setSnackbar({ open: true, message: 'Error deleting event', severity: 'error' });
                setOpenDialog(false);
            });
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Date', 'Waste Type', 'Address', 'Message', 'Collection Status']],
            body: events.map(event => [new Date(event.date).toLocaleDateString(), event.wasteType, event.address, event.message, event.collectedStatus]),
        });
        doc.save('special-waste-events.pdf');
    };

    const handleUpdateEvent = (event) => {
        navigate('/UpdateSpecialEvent', { state: { eventId: event.eventId, wasteType: event.wasteType, date: event.date, address: event.address, message: event.message } });
    };

    return (
        <>
            {/* Title and Description outside the container */}
            <Divider sx={styles.divider}>
                <Typography variant="h4" sx={styles.title}>
                    Manage Special Waste Events
                </Typography>
            </Divider>

            <Typography variant="body1" sx={styles.description}>
                View and manage your special waste collection events below.
            </Typography>

            <Box sx={styles.tableBox}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell onClick={() => sortEvents('date')}>Date</TableCell>
                                <TableCell onClick={() => sortEvents('wasteType')}>Waste Type</TableCell>
                                <TableCell onClick={() => sortEvents('address')}>Address</TableCell>
                                <TableCell>Message</TableCell>
                                <TableCell>Collection Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {events.map((event) => (
                                <TableRow key={event.eventId} style={{ backgroundColor: event.collectedStatus === 'pending' ? '#ffcccc' : '#ccffcc' }}>
                                    <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                    <TableCell>{event.wasteType}</TableCell>
                                    <TableCell>{event.address}</TableCell>
                                    <TableCell>{event.message}</TableCell>
                                    <TableCell>{event.collectedStatus}</TableCell>
                                    <TableCell>
                                        {event.collectedStatus === 'pending' && (
                                            <>
                                                <Button variant="contained" color="success" style={{ marginRight: '8px' }} onClick={() => handleUpdateEvent(event)}>Update</Button>
                                                <Button variant="contained" color="error" onClick={() => { setOpenDialog(true); setDeleteEventId(event.eventId); }}>Delete</Button>
                                            </>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>

            {/* Download PDF Button */}
            <Box sx={{ textAlign: 'center', marginTop: '20px' }}>
                <Button variant="contained" color="primary" sx={styles.downloadButton} onClick={handleDownloadPDF}>
                    Download PDF
                </Button>
            </Box>

            {/* Snackbar for Success/Error Messages */}
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
                <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            {/* Confirmation Dialog for Delete */}
            <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this event? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">No</Button>
                    <Button onClick={handleDeleteEvent} color="error">Yes</Button>
                </DialogActions>
            </Dialog>
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
        marginBottom: '30px',
        textAlign: 'center',
    },
    tableBox: {
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6)',
        borderRadius: '8px',
        overflow: 'hidden',
    },
    downloadButton: {
        borderRadius: '20px',
        backgroundColor: '#1E90FF',
        '&:hover': {
            backgroundColor: '#1C86EE',
        },
    },
};

export default SpecialWasteManage;
