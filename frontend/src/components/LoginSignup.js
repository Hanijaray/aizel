import React from "react";
import { 
  Container, TextField, Button, Typography, Paper, Box, 
  InputAdornment, useTheme, useMediaQuery 
} from "@mui/material";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import logo1 from '../assets/logo1.png';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
   const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm","xs"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeTablet = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "20px",
        position:"fixed",
        overflow:"auto",
        marginTop :isMobile ? -2 : "auto",
        marginLeft:isMobile ? "auto" : isTablet ? "auto" : isLargeTablet ? "auto" : isDesktop ? 25:25,
        // marginLeft: 25
        
      }}
    >
      <Paper
        elevation={5}
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          maxWidth: "900px",
          borderRadius: "20px",
          overflow: "hidden",
          background: "linear-gradient(to right, #ffffff 50%, #940b92 50%)",
          
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            backgroundColor: "#fff",
            padding: isMobile ? "20px" : "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          
            // position: "relative",
            zIndex: 1,
            // boxShadow: "0px 0px 20px 20px white",/
           
          }}
        >
          <img 
            src={logo1} 
            alt="Logo" 
            style={{ 
              width: isMobile ? "150px" : "250px", 
              marginBottom: 18 
            }} 
          />
          <Typography 
            variant={isMobile ? "h5" : "h4"} 
            sx={{ fontWeight: "bold", color: "black", fontFamily: "caladea" }}
          >
            WELCOME BACK!
          </Typography>
          <Typography sx={{ fontSize: "14px", color: "black", mb: 3, fontWeight: "bold" }}>
            To continue, login to your account
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              width: "80%", 
              maxWidth: "200px", 
              backgroundColor: "#e24e76", 
              borderRadius: "10px", 
              textTransform: "capitalize",
            }}
            onClick={() => navigate('/login-form')}
          >
            Login
          </Button>
        </Box>
        <Box
          sx={{
            width: isMobile ? "100%" : "50%",
            backgroundColor: "#940b92",
            padding: isMobile ? "20px" : "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            borderRadius: isMobile ? "30px" : "0px",
            boxShadow: "0px 0px 0px 15px white",
            borderTopRightRadius: isMobile ? "30px" : "15px",
            borderBottomRightRadius: isMobile ? "30px" : "15px",
            position: "relative",
            zIndex: 2,
            borderTopLeftRadius:isMobile ? "15px" :"30px",
            
            borderBottomLeftRadius: isMobile ? "0px" : "30px",
          }}
        >
          <Button 
            variant="contained" 
            sx={{
              width: "80%",
              maxWidth: "200px",
              backgroundColor: "white",
              borderRadius: "10px",
              color: "black",
              mb: 2,
              fontWeight: "bold",
              fontSize: "17px",
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
              fontFamily: "Montserrat-Arabic Regular" 
            }}
          >
            Sign up to your account
          </Typography>
          <Typography sx={{ fontSize: "12px", color: "#eee", mb: 2 }}>
            Login Using
          </Typography>

          {[
            { icon: <PersonOutlineIcon />, placeholder: "Username" },
            { icon: <EmailOutlinedIcon />, placeholder: "Email", type: "email" },
            { icon: <LocalPhoneOutlinedIcon />, placeholder: "Phone Number" },
            { 
              icon: <HttpsOutlinedIcon />, 
              placeholder: "Password", 
              type: "password", 
              endIcon: <VisibilityOutlinedIcon /> 
            }
          ].map((field, index) => (
            <TextField
              key={index}
              size="small"
              type={field.type || "text"}
              InputProps={{
                style: { fontWeight: "bold", color: "black" },
                startAdornment: <InputAdornment position="start">{field.icon}</InputAdornment>,
                endAdornment: field.endIcon ? <InputAdornment position="end">{field.endIcon}</InputAdornment> : null,
              }}
              placeholder={field.placeholder}
              variant="outlined"
              sx={{
                backgroundColor: "white",
                borderRadius: "10px",
                mb: 2,
                width: "100%",
                maxWidth: "300px",
              }}
            />
          ))}

          <Button 
            variant="contained" 
            sx={{ 
              width: "80%", 
              maxWidth: "200px", 
              backgroundColor: "#2f2f2f", 
              borderRadius: "50px", 
              textTransform: "capitalize",
            }}
          >
            Sign up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginSignup;
