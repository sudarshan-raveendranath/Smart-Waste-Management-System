import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, IconButton, Container, TablePagination, Tooltip, styled, Button,
  Modal, TextField, Snackbar, Alert, Box, InputBase, Select, MenuItem, FormControl, InputLabel
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import axios from 'axios';
import jsPDF from 'jspdf';

// Styled components for hover effects and colors
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.6)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  '&:hover': {
    backgroundColor: 'rgba(76, 175, 80, 0.3)',
  },
  color: 'green',
}));

const BinColorIndicator = styled(TableCell)(({ binType }) => ({
  color: binType === 'food' ? 'green' :
         binType === 'plastic' ? 'blue' :
         binType === 'paper' ? 'yellow' : 'gray',
  fontWeight: 'bold',
}));

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const getBinIcon = (binType) => {
  switch (binType) {
    case 'food':
      return <DeleteOutlineIcon style={{ color: 'green' }} />;
    case 'plastic':
      return <DeleteOutlineIcon style={{ color: 'blue' }} />;
    case 'paper':
      return <DeleteOutlineIcon style={{ color: 'yellow' }} />;
    default:
      return <DeleteOutlineIcon style={{ color: 'gray' }} />;
  }
};

const AllBins = () => {
  const [bins, setBins] = useState([]);
  const [filteredBins, setFilteredBins] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedBin, setSelectedBin] = useState(null);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [formData, setFormData] = useState({ totalWeight: 0, binType: 'food' });
  const [binCounts, setBinCounts] = useState({ food: 0, plastic: 0, paper: 0 });

  useEffect(() => {
    fetchBins();
  }, []);

  useEffect(() => {
    const counts = { food: 0, plastic: 0, paper: 0 };
    bins.forEach((bin) => {
      counts[bin.binType] = (counts[bin.binType] || 0) + 1;
    });
    setBinCounts(counts);
  }, [bins]);

  const fetchBins = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/bins');
      setBins(response.data);
      setFilteredBins(response.data);
    } catch (error) {
      console.error('Error fetching bins:', error);
    }
  };

  const deleteBin = async (binId) => {
    try {
      await axios.delete(`http://localhost:8080/api/bins/${binId}`);
      const updatedBins = bins.filter(bin => bin.binId !== binId);
      setBins(updatedBins);
      setFilteredBins(updatedBins);
      setDeleteSuccess(true);
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Error deleting bin:', error);
    }
  };

  const handleOpenDeleteModal = (bin) => {
    setSelectedBin(bin);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedBin(null);
  };

  const [formError, setFormError] = useState({ totalWeight: '' });

  const updateBin = async (binId) => {
    // Validate totalWeight field
    if (!formData.totalWeight || formData.totalWeight <= 0) {
      // Set error message if validation fails
      setFormError((prevError) => ({
        ...prevError,
        totalWeight: 'Total weight is required and must be greater than 0',
      }));
      return;  // Prevent form submission if there's an error
    }
  
    // Proceed with the update if validation passes
    try {
      const updatedBin = {
        ...selectedBin,
        binType: formData.binType,
        totalWeight: formData.totalWeight,
      };
  
      await axios.put(`http://localhost:8080/api/bins/${binId}`, updatedBin);
      fetchBins();
      setUpdateSuccess(true);
      setOpenUpdateModal(false);
    } catch (error) {
      console.error('Error updating bin:', error);
    }
  };
  const handleOpenUpdateModal = (bin) => {
    setSelectedBin(bin);
    setFormData({ binType: bin.binType, totalWeight: bin.totalWeight });
    setOpenUpdateModal(true);
  };

  const handleCloseUpdateModal = () => {
    setOpenUpdateModal(false);
    setSelectedBin(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  
    // Reset the error message when user starts typing
    if (name === 'totalWeight' && value > 0) {
      setFormError((prevError) => ({ ...prevError, totalWeight: '' }));
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    const filtered = bins.filter(bin =>
      bin.userId.toString().includes(event.target.value) ||
      bin.binType.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setFilteredBins(filtered);
  };

  const generateReport = () => {
    const reportData = bins.filter(bin => ['food', 'plastic', 'paper'].includes(bin.binType));
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Bin Collection Report', 14, 22);
    doc.setFontSize(14);
    
    let y = 42;
    const binTypes = ['food', 'plastic', 'paper'];
    const tableData = binTypes.map(binType => {
      const filteredData = reportData.filter(item => item.binType === binType);
      return { 
        binType: binType.charAt(0).toUpperCase() + binType.slice(1), 
        totalBins: filteredData.length 
      };
    });

    const tableHeader = ['Bin Type', 'Total Bins'];
    const headerY = y;
    tableHeader.forEach((header, index) => {
      doc.text(header, 14 + index * 70, headerY);
    });

    y += 10;

    tableData.forEach(data => {
      doc.text(data.binType, 14, y);
      doc.text(data.totalBins.toString(), 114, y);
      y += 10;
    });

    doc.setFontSize(12);
    doc.text('Generated on: ' + new Date().toLocaleDateString(), 14, y + 10);
    doc.save('BinReport.pdf');
  };

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" marginBottom="20px">
        <h2 style={{ margin: 30 }}>All Bins</h2>
        <Box display="flex" alignItems="center" sx={{ backgroundColor: '#f1f1f1', borderRadius: '8px', padding: '0 10px', maxWidth: '300px' }}>
          <InputBase
            placeholder="Search by User ID or Bin Type"
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ width: '100%' }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
      </Box>

      <Box marginBottom="20px">
        <h3>Total Bins:</h3>
        <Box display="flex" justifyContent="space-around" flexWrap="wrap">
          {['food', 'plastic', 'paper'].map((type) => (
            <Box key={type} display="flex" alignItems="center" margin="5px">
              {getBinIcon(type)}
              <span style={{ color: type === 'food' ? 'green' : type === 'plastic' ? 'blue' : 'yellow', fontWeight: 'bold', marginLeft: '8px' }}>
                {type.charAt(0).toUpperCase() + type.slice(1)} Bins: {binCounts[type]}
              </span>
            </Box>
          ))}
        </Box>
      </Box>

      <Button
        variant="contained"
        sx={{
          marginBottom: '20px',
          border: '2px solid green',
          backgroundColor: 'white',
          color: 'green',
          '&:hover': {
            backgroundColor: '#e0f2f1',
            borderColor: '#388e3c',
          },
        }}
        onClick={generateReport}
      >
        Generate Report
      </Button>

      <TableContainer component={Paper}
        sx={{
          boxShadow: 3,
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
        }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'rgba(129, 199, 132,0.5)' }}>
            <TableRow>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>User ID</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>Bin Type</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>Total Weight (Kg)</TableCell>
              <TableCell sx={{ color: '#333', fontWeight: 'bold', fontSize: '1rem' }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? filteredBins.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : filteredBins).map((bin) => (
              <StyledTableRow key={bin.binId}>
                <TableCell>{bin.userId}</TableCell>
                <BinColorIndicator binType={bin.binType}>
                  <span style={{ display: 'flex', alignItems: 'center' }}>
                    {getBinIcon(bin.binType)}
                    <span style={{ marginLeft: '8px' }}>{bin.binType.charAt(0).toUpperCase() + bin.binType.slice(1)}</span>
                  </span>
                </BinColorIndicator>
                <TableCell>{bin.totalWeight}</TableCell>
                <TableCell>
                  <StyledIconButton onClick={() => handleOpenUpdateModal(bin)}>
                    <EditIcon />
                  </StyledIconButton>
                  <StyledIconButton onClick={() => handleOpenDeleteModal(bin)}>
                    <DeleteIcon />
                  </StyledIconButton>
                </TableCell>
              </StyledTableRow>
            ))} 
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredBins.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      {/* Update Modal */}
      <Modal open={openUpdateModal} onClose={handleCloseUpdateModal}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2>Update Bin</h2>
          
          <TextField
            label="Total Weight (Kg)"
            type="number"
            name="totalWeight"
            value={formData.totalWeight}
            onChange={handleFormChange}
            fullWidth
            error={!!formError.totalWeight} // Show error when formError is not empty
            helperText={formError.totalWeight} // Display error message if present
          />
          <Button onClick={() => updateBin(selectedBin.binId)} variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Update
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ ...modalStyle, width: 400 }}>
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this bin?</p>
          <Box display="flex" justifyContent="space-between">
            <Button onClick={() => deleteBin(selectedBin.binId)} variant="contained" color="error">
              OK
            </Button>
            <Button onClick={handleCloseDeleteModal} variant="outlined">
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Success and error messages */}
      <Snackbar open={updateSuccess} autoHideDuration={6000} onClose={() => setUpdateSuccess(false)}>
        <Alert onClose={() => setUpdateSuccess(false)} severity="success">
          Bin updated successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={deleteSuccess} autoHideDuration={6000} onClose={() => setDeleteSuccess(false)}>
        <Alert onClose={() => setDeleteSuccess(false)} severity="success">
          Bin deleted successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AllBins;
