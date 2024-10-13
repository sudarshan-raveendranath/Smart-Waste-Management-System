import React, { useState } from 'react';

// Importing your separate components
import RequestSpecialEvent from './RequestSpecialEvent';
import ManageSpecialEvents from './ManageSpecialEvents';
import SpecialEventPayment from './SpecialEventPayment';

const SegmentedButtonGroup = () => {
  // State to manage the active component
  const [activeButton, setActiveButton] = useState('manageEvent');

  // Function to render the component based on the selected button
  const renderComponent = () => {
    switch (activeButton) {
      case 'requestEvent':
        return <RequestSpecialEvent />;
      case 'manageEvent':
        return <ManageSpecialEvents />;
      case 'eventPayments':
        return <SpecialEventPayment />;
      default:
        return <ManageSpecialEvents />;
    }
  };

  return (
    <div>
      {/* Segmented Button Group */}
      <div style={styles.buttonGroup}>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'requestEvent' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('requestEvent')}
        >
          Request Event
        </button>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'manageEvent' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('manageEvent')}
        >
          Manage Event Requests
        </button>
        <button
          style={{ ...styles.button, backgroundColor: activeButton === 'eventPayments' ? '#157045' : '#4caf50',borderRight: '2px solid white', }}
          onClick={() => setActiveButton('eventPayments')}
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
