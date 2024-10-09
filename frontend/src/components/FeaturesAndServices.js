import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography, Grid, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded'; // Paper Icon
import LocalDrinkRoundedIcon from '@mui/icons-material/LocalDrinkRounded';  // Plastic Icon
import RestaurantRoundedIcon from '@mui/icons-material/RestaurantRounded';  // Food Icon
import FireTruckRoundedIcon from '@mui/icons-material/FireTruckRounded';

// WasteBox styled component with hover effect
const WasteBox = styled(Paper)({
  width: '250px', // Fixed width
  height: '250px', // Fixed height to make it square
  padding: '10px',
  textAlign: 'center',
  color: '#555555', // Default secondary text color
  borderRadius: '30px',
  transition: 'background-color 0.3s, color 0.3s',
  position: 'relative',
  margin: '8px', // Reduced spacing between boxes
  overflow: 'hidden', // Hide overflow to keep the hover effect clean
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center the content vertically
  alignItems: 'center',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // Center the content horizontally
  '&:hover': {
    backgroundColor: '#4caf50', // Green hover background
    color: '#ffffff', // White text on hover
    '& img, .default-text': {
      display: 'none', // Hide image and title on hover
    },
    '& .hover-text': {
      display: 'block', // Show hover text on hover
    },
  },
});

const InfoBox = styled(Paper)({
  width: '250px', // Fixed width
  height: '250px', // Adjust height automatically
  padding: '20px',
  textAlign: 'center',
  color: '#555555', // Default secondary text color
  borderRadius: '30px',
  margin: '8px', // Reduced spacing between boxes
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center', // Center the content vertically
  alignItems: 'center', // Center the content horizontally
  backgroundColor: '#ffffff',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.4)', // White background
});

const BoxWithDetails = ({ title, subtitle, details }) => (
  <InfoBox>
    <Typography variant="h5" fontWeight="bold" gutterBottom>
      {title}
    </Typography>
    <Typography variant="body3" fontWeight='bold' color="textSecondary" gutterBottom>
      {subtitle}
    </Typography>
    <Box mt={2}>
      {details.map((detail, index) => (
        <Box display="flex" alignItems="center" justifyContent="center" key={index} mb={1}>
          {detail.icon} {/* Render icon based on the detail */}
          <Typography variant="body1" sx={{ ml: 1 }}>
            <strong>{detail.text.split(' - ')[0]}</strong> {/* Bold the title part */}
            {" - "}{detail.text.split(' - ')[1]} {/* Normal weight for the remaining part */}
          </Typography>
        </Box>
      ))}
    </Box>
  </InfoBox>
);

// HoverText styled component
const HoverText = styled(Typography)({
  display: 'none',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  fontWeight: 'bold',
  fontSize: '18px',
  color: '#white', // White text on hover
});

// WasteTypeBox component
const WasteTypeBox = ({ imageSrc, label, hoverText }) => (
  <WasteBox>
    <img src={imageSrc} alt={label} style={{ width: '150px', marginBottom: '15px' }} /> {/* Centered image */}
    <Typography className="default-text" variant="h5" fontWeight="bold" sx={{ marginTop: '10px' }}> {/* Move title down */}
      {label}
    </Typography>
    <HoverText className="hover-text">{hoverText}</HoverText>
  </WasteBox>
);

// Main FeaturesComponent
const FeaturesComponent = () => (
  <Box sx={{ padding: '15px' }}>
    {/* Horizontal line with text in the center */}
    <Box display="flex" alignItems="center" mb={1}>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
      <Typography variant="h4" sx={{ margin: '0 16px', fontWeight: 'bold', color: '#157045' }}>
        FEATURES
      </Typography>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
    </Box>

    {/* Description */}
    <Typography variant="body1" align="center" mb={5}>
      SmartTrash recycling innovation for all Sri Lankan people.
    </Typography>

    {/* Features Grid */}
    <Grid container spacing={2} justifyContent="center" mb={10}> {/* Reduced spacing between features */}
      <Grid item xs={12} sm={4} textAlign="center">
        <img src="/images/lap.png" alt="Sensor Applying" style={{ width: '150px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sensor Applying</Typography>
        <Typography variant="body2">You can easily apply a sensor to your bin.</Typography>
      </Grid>
      <Grid item xs={12} sm={4} textAlign="center">
        <img src="/images/trashcan.png" alt="Sensor Tracking" style={{ width: '150px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Sensor Tracking</Typography>
        <Typography variant="body2">
          SmartTrash tracks complete information on the trash bin.
        </Typography>
      </Grid>
      <Grid item xs={12} sm={4} textAlign="center">
        <img src="/images/dump.png" alt="Pick Up" style={{ width: '150px' }} />
        <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Pick Up</Typography>
        <Typography variant="body2">Collect trash super fast.</Typography>
      </Grid>
    </Grid>

    {/* Horizontal line with text in the center */}
    <Box display="flex" alignItems="center" mb={1}>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
      <Typography variant="h4" sx={{ margin: '0 16px', fontWeight: 'bold', color: '#157045' }}>
        TYPES OF WASTE
      </Typography>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
    </Box>

    {/* Waste description */}
    <Typography variant="body1" align="center" mb={4}>
      Various types of waste can be recycled and detected by SmartTrash.
    </Typography>

    {/* Waste type boxes */}
    <Grid container spacing={2} justifyContent="center" textAlign="center" alignItems="center" mb={10}> {/* Reduced spacing between waste type boxes */}
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <WasteTypeBox imageSrc="/images/papers.png" label="Paper" hoverText="Paper waste includes items such as newspapers, magazines, cardboard boxes, and office paper." />
      </Grid>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <WasteTypeBox imageSrc="/images/plastic.png" label="Plastic" hoverText="Plastic waste encompasses a wide range of items, including plastic bags, bottles, containers, and packaging materials." />
      </Grid>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <WasteTypeBox imageSrc="/images/food.png" label="Food" hoverText="Food waste refers to any edible food that is discarded, such as leftovers and spoiled groceries." />
      </Grid>
    </Grid>

    <Box display="flex" alignItems="center" mb={1}>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
      <Typography variant="h4" sx={{ margin: '0 16px', fontWeight: 'bold', color: '#157045' }}>
        CHARGES AND PAYMENTS
      </Typography>
      <Divider sx={{ flex: 1, height: '1px', backgroundColor: '#157045' }} />
    </Box>

    {/* price description */}
    <Typography variant="body1" align="center" mb={4}>
      Charges for various types of waste, Payments for recyclable waste types and Charges for special waste collections.
    </Typography>

    {/* Pricing Grid */}
    <Grid container spacing={2} justifyContent="center" mb={10}>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <BoxWithDetails
          title="Waste Collection Charges"
          subtitle="(Per 1kg)"
          details={[
            { icon: <DescriptionRoundedIcon sx={{ color: 'green' }} />, text: 'Papers - Rs50.00' },
            { icon: <RestaurantRoundedIcon sx={{ color: 'green' }} />, text: 'Food - Rs60.00' },
            { icon: <LocalDrinkRoundedIcon sx={{ color: 'green' }} />, text: 'Plastics - Rs40.00' },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <BoxWithDetails
          title="Recycling Waste Payments"
          subtitle="(Per 1kg)"
          details={[
            { icon: <DescriptionRoundedIcon sx={{ color: 'green' }} />, text: 'Papers - Rs30.00' },
            { icon: <RestaurantRoundedIcon sx={{ color: 'green' }} />, text: 'Food - Not Recycling' },
            { icon: <LocalDrinkRoundedIcon sx={{ color: 'green' }} />, text: 'Plastics - Rs20.00' },
          ]}
        />
      </Grid>
      <Grid item xs={12} sm={4} display="flex" justifyContent="center">
        <BoxWithDetails
          title="Special Collection Charges"
          subtitle="(Per Distance)"
          details={[
            { icon: <FireTruckRoundedIcon sx={{ color: 'green' }} />, text: '1km - Rs100.00' },
          ]}
        />
      </Grid>
    </Grid>
  </Box>
);

export default FeaturesComponent;
