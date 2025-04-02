import React from 'react';
import { Container, Typography, Button, Box, Paper, useMediaQuery, useTheme } from '@mui/material';
import logo2 from '../assets/logo2.png';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg')); 
   const isDesktop = useMediaQuery(theme.breakpoints.up('lg')); 

  return (
    <div style={{ 
      backgroundColor: '#940b92', 
      minHeight: '100vh',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      padding: isMobile ? '20px' : '0',
      overflow:"auto",
      position:"fixed",
      width:"100%",
      height:"100%"

    }}>
      <Container maxWidth="md" sx={{ textAlign: 'center',alignItems:"center",ml: isMobile ? -2.5: isTablet ? 1 : isLargeTablet? 8:36}}>
        <Paper 
          elevation={10} 
          sx={{ 
            padding: isMobile ? 2 : 4, 
            borderRadius: 10, 
            backgroundColor: 'white' 
          }}
        >
          <Box 
            sx={{ 
              backgroundColor: 'white', 
              padding: isMobile ? 2 : 3, 
              borderRadius: 3, 
              height: isMobile ? 'auto' : 350,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <img 
              src={logo2} 
              alt="Logo2" 
              style={{ 
                width: isMobile ? '250px' : isTablet ? '400px' : '600px', 
                marginBottom: 18, 
                textAlign: "center",
                marginTop: isMobile ? 0 : -40 
              }} 
            />

            <Typography 
              variant="body1" 
              color="black" 
              sx={{ 
                marginTop: -1, 
                marginBottom: 3, 
                fontWeight: "bold", 
                fontSize: isMobile ? 11 : 13, 
                textAlign: "center"
              }}
            >
              Streamline your billing and management with<br/> ease and accuracy
            </Typography>

            <Button 
              variant="contained" 
              color="primary" 
              sx={{ 
                backgroundColor: '#000', 
                color: '#fff', 
                width: isMobile ? "90%" : isTablet ? "400px" : "500px", 
                borderRadius: "50px", 
                textTransform: "capitalize", 
                marginTop: 5, 
                fontWeight: "bold", 
                fontSize: isMobile ? 14 : 18
              }}
              onClick={() => navigate('/dashboard')} // Redirect to Track
            >
              Let's Go!!!
            </Button>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Welcome;
