import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TablePagination,
  Tooltip,
  Snackbar,
  Alert,
  Modal,
  Box,
} from '@mui/material';

const BinRequest = () => {
  const [binRequests, setBinRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const [selectedBinRequest, setSelectedBinRequest] = useState(null);

  useEffect(() => {
    // Fetch bin requests on load
    axios
      .get('http://localhost:8080/api/binrequests')
      .then((response) => setBinRequests(response.data))
      .catch((error) => console.error('Error fetching bin requests:', error));
  }, []);

  const checkExistingBin = async (binData) => {
    try {
      const response = await axios.get('http://localhost:8080/api/bins/exist', {
        params: {
          userId: binData.userId,
          binType: binData.binType,
        },
      });
      return response.data.exists; // Ensure your API responds with this structure
    } catch (error) {
      console.error('Error checking existing bin:', error);
      return false; // Default to not existing if there's an error
    }
  };

  const handleCreateBin = async () => {
    if (!selectedBinRequest) return;
  
    const binData = {
      userId: selectedBinRequest.userId,
      binType: selectedBinRequest.binType,
      totalWeight: selectedBinRequest.totalWeight,
    };
  
    // Validate bin data
    if (!binData.userId || !binData.binType || binData.totalWeight <= 0) {
      setErrorMessage('User ID, Bin Type, and Total Weight must be valid.');
      setShowSnackbar(true);
      return;
    }
  
    // Check for existing bin
    const exists = await checkExistingBin(binData);
    if (exists) {
      setErrorMessage('A bin has already been created for this User ID and Bin Type.');
      setShowSnackbar(true);
      return; // Stop further execution
    }
  
    // Create new bin
    try {
      const response = await axios.post('http://localhost:8080/api/bins', binData);
      setSuccessMessage('Bin successfully created!');
      setErrorMessage('');
      setShowSnackbar(true);
      setOpenConfirmation(false);
      setSelectedBinRequest(null);
    } catch (error) {
      console.error('Error creating bin:', error);
      setErrorMessage(error.response?.data?.message || 'Error creating the bin. Please try again.');
      setSuccessMessage('');
      setShowSnackbar(true);
    }
  };
  

  const handleOpenConfirmation = (binRequest) => {
    setSelectedBinRequest(binRequest);
    setOpenConfirmation(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Container sx={{ marginTop: '20px', paddingBottom: '20px', width: '100%', maxWidth: '100%' }}>
      <Typography variant="h4" gutterBottom textAlign="center" sx={{ fontWeight: 'bold' }}>
        Bin Requests
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(129, 199, 132, 0.5)' }}>
            <TableRow>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>User ID</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>Bin Type</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>Total Weight (kg)</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }} align="right">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {binRequests.length > 0 ? (
              binRequests
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((binRequest) => (
                  <Tooltip key={binRequest.id} placement="top" arrow>
                    <TableRow
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          background: 'linear-gradient(to right, #81c784, #aed581)',
                          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.3)',
                        },
                        transition: 'background 0.3s, box-shadow 0.3s',
                      }}
                    >
                      <TableCell>{binRequest.userId}</TableCell>
                      <TableCell>{binRequest.binType}</TableCell>
                      <TableCell>{binRequest.totalWeight}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => handleOpenConfirmation(binRequest)}
                          sx={{
                            fontWeight: 'bold',
                            fontSize: '0.9rem',
                            backgroundColor: '#388e3c',
                            color: '#fff',
                            '&:hover': {
                              backgroundColor: '#4caf50',
                            },
                            textTransform: 'none',
                          }}
                        >
                          Create Bin
                        </Button>
                      </TableCell>
                    </TableRow>
                  </Tooltip>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center" sx={{ fontWeight: 'bold' }}>
                  No bin requests found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={binRequests.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            fontWeight: 'bold',
            '& .MuiTablePagination-selectLabel': {
              fontWeight: 'bold',
            },
            '& .MuiTablePagination-input': {
              fontWeight: 'bold',
            },
          }}
        />
      </TableContainer>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={errorMessage ? 'error' : 'success'} sx={{ width: '100%', fontWeight: 'bold' }}>
          {errorMessage || successMessage}
        </Alert>
      </Snackbar>

      <Modal open={openConfirmation} onClose={() => setOpenConfirmation(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
            width: 400,
          }}
        >
          <Typography variant="h6" gutterBottom textAlign="center">
            Confirm Create Bin
          </Typography>
          <Typography textAlign="center" marginBottom={2}>
            Are you sure you want to create this bin?
          </Typography>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Button
              onClick={handleCreateBin}
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: '#388e3c',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#4caf50',
                },
              }}
            >
              Yes
            </Button>
            <Button
              onClick={() => setOpenConfirmation(false)}
              sx={{
                fontWeight: 'bold',
                textTransform: 'none',
                backgroundColor: '#e53935',
                color: '#fff',
                '&:hover': {
                  backgroundColor: '#f44336',
                },
              }}
            >
              No
            </Button>
          </Box>
        </Box>
      </Modal>
    </Container>
  );
};

export default BinRequest;
