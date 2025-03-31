import React from 'react';
import { Container, Typography, Button, Box, Paper, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import logo3 from '../assets/logo3.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';

const Loginaccess = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box
      sx={{
        backgroundColor: '#940b92',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: "fixed",
        overflow: "auto",
        width: "100%"
      }}
    >
      <Container maxWidth="md" sx={{
        textAlign: 'center',
        justifyContent: "center",
        ml: isMobile ? -2 : isTablet ? -2 : isLargeTablet ? 5 : 36,
      }}>
        <Paper elevation={10} sx={{ padding: 4, borderRadius: 10, backgroundColor: 'white' }}>
          <Box sx={{ backgroundColor: 'white', padding: 3, borderRadius: 3 }}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' }, 
                alignItems: 'center',
                justifyContent: 'center',
                width: '100%',
              }}
            >
              <Box sx={{ textAlign: 'center', mb: { xs: 2, md: 0 } }}>
                <img
                  src={logo3}
                  alt="Logo3"
                  style={{
                    width: '100%',
                    maxWidth: '350px',
                    height: 'auto'
                  }}
                />
              </Box>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                width: '100%'
              }}>
                <Typography
                  sx={{
                    color: 'black',
                    mb: 1,
                    fontWeight: 'bold',
                    fontFamily: 'Montserrat-Arabic Regular',
                    fontSize: { xs: 30, md: 40 }, 
                    textAlign: 'center'
                  }}
                >
                  Login to Your Account
                </Typography>
                <Typography
                  sx={{
                    fontSize: { xs: 12, md: 14 },
                    color: 'black',
                    mb: 2,
                    fontWeight: 'bold',
                    mt: -1
                  }}
                >
                  Login Using
                </Typography>

                <Box sx={{ width: '80%', maxWidth: '370px' }}>
                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: { fontWeight: 'bold', color: 'white', borderRadius: '50px', backgroundColor: '#f47c00' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <PersonOutlineIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                    }}
                    placeholder="Username"
                    variant="outlined"
                    sx={{ backgroundColor: 'white', borderRadius: '10px', mb: 2, mt: 3 }}
                  />

                  <TextField
                    fullWidth
                    size="small"
                    InputProps={{
                      style: { fontWeight: 'bold', color: 'white', borderRadius: '50px', backgroundColor: '#f47c00' },
                      startAdornment: (
                        <InputAdornment position="start">
                          <HttpsOutlinedIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <VisibilityOutlinedIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                      ),
                    }}
                    inputProps={{ style: { color: 'white' } }}
                    placeholder="Password"
                    type="password"
                    variant="outlined"
                    sx={{ backgroundColor: 'white', borderRadius: '10px', mb: 2 }}
                  />
                </Box>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    width: '80%',
                    maxWidth: '250px',
                    backgroundColor: '#2f2f2f',
                    borderRadius: '30px',
                    textTransform: 'capitalize',
                    fontWeight: 'bold',
                    mt: 2
                  }}
                  onClick={() => navigate('/dashboard')}
                >
                  Sign in
                </Button>
              </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Loginaccess;