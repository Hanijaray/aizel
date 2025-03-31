import React from "react";
import { 
  Container, TextField, Button, Typography, Paper, Box, 
  InputAdornment, useTheme, useMediaQuery, 
  Link
} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import logo1 from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
   const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        minHeight: "100vh",
        padding: isMobile ? "10px" : "20px",
        width: "100%",
        height:"100%",
        maxWidth: "2000px",
        marginLeft:isMobile ? "auto" : isTablet ? "auto" : isLargeTablet ? "auto" :isDesktop ?"200px":"200px",
        position:"fixed",
        overflow:"auto"
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          width: isMobile ? "100%" : isTablet ? "700px" : "900px",
          borderRadius: "30px",
          overflow: "hidden",
          background: "linear-gradient(to right, #ffffff 50%, #940b92 50%)",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "93%" : "50%",
            backgroundColor: "#940b92",
            padding: isMobile ? "15px" : "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            zIndex: 1,
          }}
        >
          <Button 
            variant="contained" 
            sx={{
              width: isMobile ? "90%" : "180px",
              backgroundColor: "white",
              borderRadius: "10px",
              color: "black",
              mb: 2,
              fontWeight: "bold",
              fontSize: isMobile ? "14px" : "17px",
              fontFamily: "caladea"
            }}
          >
            Admin
          </Button>

          <Typography 
            variant={isMobile ? "h6" : "h5"} 
            sx={{ 
              color: "#fff", 
              mb: 1, 
              fontWeight: "bold", 
              fontFamily: "Montserrat-Arabic Regular",
              textAlign: "center"
            }}
          >
            Login to your account
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#eee", mb: 2, fontWeight: "bold", textAlign: "center" }}>
            Login Using
          </Typography>

          <TextField
            size="small"
            InputProps={{
              style: { fontFamily: "caladea", fontWeight: "bold", color: "black" },
              startAdornment: <InputAdornment position="start"><PersonOutlineIcon /></InputAdornment>
            }}
            placeholder="Username"
            variant="outlined"
            sx={{ 
              backgroundColor: "white", 
              borderRadius: "10px", 
              mb: 2, 
              width: isMobile ? "90%" : "80%", 
              maxWidth: "300px" 
            }}
          />
          
          <TextField
            size="small"
            InputProps={{
              style: { fontFamily: "caladea", fontWeight: "bold", color: "black" },
              startAdornment: <InputAdornment position="start"><HttpsOutlinedIcon /></InputAdornment>,
              endAdornment: <InputAdornment position="end"><VisibilityOutlinedIcon /></InputAdornment>,
            }}
            inputProps={{ style: { color: "black" } }}
            placeholder="Password"
            type="password"
            variant="outlined"
            sx={{ 
              backgroundColor: "white", 
              borderRadius: "10px", 
              mb: 2, 
              width: isMobile ? "90%" : "80%", 
              maxWidth: "300px" 
            }}
          />

          <Button 
            variant="contained" 
            sx={{ 
              width: isMobile ? "80%" : "180px", 
              backgroundColor: "#2f2f2f", 
              borderRadius: "5px", 
              textTransform: "capitalize",
              fontWeight: "bold" 
            }}
            onClick={() => navigate('/dashboard')}
          >
            Login
          </Button>
          <br />

          <Link href="#" sx={{ color: "white", textDecorationColor: "white", fontSize: "11px", fontWeight: "bold" }}>
            Forgot your Password?
          </Link>
        </Box>
        <Box
          sx={{
            width: isMobile ? "87%" : "50%",
            backgroundColor: "#fff",
            padding: "30px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: isMobile ? "0px" : "0px",
            boxShadow: "0px 0px 10px 10px #940b92",
            borderTopRightRadius: isMobile ? "30px" : "30px",
            borderBottomRightRadius: isMobile ? "30px" : "30px",
            position: "relative",
            zIndex: 2,
            borderTopLeftRadius:isMobile ? "15px" :"30px",
            
            borderBottomLeftRadius: isMobile ? "0px" : "30px",

            
          }}
        >
          <img 
            src={logo1} 
            alt="Logo" 
            style={{ 
              width: isMobile ? "200px" : "250px", 
              marginBottom: "20px" 
            }} 
          />

          <Typography 
            variant={isMobile ? "h6" : "h4"} 
            sx={{ 
              mb: 2, 
              fontFamily: "caladea",
              fontWeight: "bold",
              color: "black",
              textAlign: "center"
            }}
          >
            NEW HERE?
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "black", mb: 3, fontWeight: "bold", textAlign: "center" }}>
            Sign up and create your <br /> own account
          </Typography>

          <Button 
            variant="contained" 
            sx={{ 
              width: isMobile ? "80%" : "180px", 
              backgroundColor: "#e24e76", 
              borderRadius: "5px", 
              textTransform: "capitalize",
              fontWeight: "bold" 
            }}
            onClick={() => navigate('/login-signup')}
          >
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginForm;
