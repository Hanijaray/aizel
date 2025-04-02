import { useState } from "react";


import { Container, Typography, Button, Box, Paper, TextField, InputAdornment, useMediaQuery, useTheme } from '@mui/material';
import logo3 from '../assets/logo3.png';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { useNavigate } from 'react-router-dom';

const Loginaccess = () => {
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://aizel-lyaq.onrender.com/api/drivers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage(data.message || "Invalid credentials");
        return;
      }

      navigate(`/category?id=${data.employeeId}`); // Redirect on successful login
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };


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
              <Box component="form" onSubmit={handleSubmit} sx={{
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

                <Box sx={{ width: "80%", maxWidth: "370px", mx: "auto" }}>
        {/* Username Input */}
        <TextField
          fullWidth
          size="small"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
          InputProps={{
            style: { fontWeight: "bold", color: "black", borderRadius: "50px", backgroundColor: "#f47c00" },
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          placeholder="Username"
          variant="outlined"
          sx={{ backgroundColor: "white", borderRadius: "10px", mb: 2, mt: 3 }}
        />

        {/* Password Input */}
        <TextField
          fullWidth
          size="small"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          InputProps={{
            style: { fontWeight: "bold", color: "black", borderRadius: "50px", backgroundColor: "#f47c00" },
            startAdornment: (
              <InputAdornment position="start">
                <HttpsOutlinedIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <VisibilityOutlinedIcon sx={{ color: "white" }} />
              </InputAdornment>
            ),
          }}
          inputProps={{ style: { color: "black" } }}
          placeholder="Password"
          variant="outlined"
          sx={{ backgroundColor: "white", borderRadius: "10px", mb: 2 }}
        />

        {/* Error Message */}
        {errorMessage && <Typography color="error" sx={{ fontSize: 14, mt: 1 }}>{errorMessage}</Typography>}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          sx={{
            width: "80%",
            maxWidth: "250px",
            backgroundColor: "#2f2f2f",
            borderRadius: "30px",
            textTransform: "capitalize",
            fontWeight: "bold",
            mt: 2,
          }}
        >
          Sign in
        </Button>
      </Box>
    </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Loginaccess;