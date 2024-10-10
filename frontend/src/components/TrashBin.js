import React, { useState } from 'react';

// Importing your separate components
import RequestBin from './RequestBin';
import ManageBin from './ManageBin';
import ViewMyBins from './ViewMyBins';
import Payments from './BinPayments';

const SegmentedButtonGroup = () => {
  // State to manage the active component
  const [activeButton, setActiveButton] = useState('requestBin');

  // Function to render the component based on the selected button
  const renderComponent = () => {
    switch (activeButton) {
      case 'requestBin':
        return <RequestBin />;
      case 'manageBins':
        return <ManageBin />;
      case 'viewMyBins':
        return <ViewMyBins />;
      case 'payments':
        return <Payments />;
      default:
        return <RequestBin />;
    }
  };

  return (
    <div>
      {/* Segmented Button Group */}
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'requestBin' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('requestBin')}
        >
          Request Bin
        </button>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'manageBins' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('manageBins')}
        >
          Manage Bins
        </button>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'viewMyBins' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('viewMyBins')}
        >
          View My Bins
        </button>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'payments' ? '#157045' : '#4caf50' }}
          onClick={() => setActiveButton('payments')}
        >
          Payments
        </button>
      </div>

      {/* Render the component based on the selected button */}
      <div style={styles.contentContainer}>{renderComponent()}</div>
    </div>
  );
};

// Inline styles for the segmented button group and components
const styles = {
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    margin: '40px 30px', // Added margin on left, right, and top
    borderRadius: '25px',
    overflow: 'hidden',
  },
  button: {
    flex: 1,
    padding: '16px 30px', // Increased button height and padding
    border: 'none',
    cursor: 'pointer',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '15px', // Bold text
    transition: 'background-color 0.3s',
  },
  contentContainer: {
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    marginTop: '10px',
  },
};

export default SegmentedButtonGroup;
