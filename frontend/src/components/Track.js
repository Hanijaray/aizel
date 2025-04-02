import React from "react";
import { Button, Box, Typography, Paper, useTheme, useMediaQuery } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo5 from "../assets/logo5.png";
import { useNavigate } from 'react-router-dom';
const theme = createTheme({
  typography: {
    fontFamily: "Caladea, serif",
  },
});

const Track = () => {
  const navigate = useNavigate();
  const muiTheme = useTheme();
  const isMobile = useMediaQuery(muiTheme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(muiTheme.breakpoints.between("sm", "md"));

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          textAlign: "center",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: isMobile ? "10px" : "20px",
          width: "100%",
          overflow: "hidden",
          position: "fixed",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            py: isMobile ? 3 : 5,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={logo5}
            alt="Logo5"
            style={{
              width: isMobile ? "90%" : isTablet ? "70%" : "60%",
              maxWidth: "700px",
              marginBottom: 18,
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            bgcolor: "#800080",
            py: isMobile ? 3 : 5,
            px: isMobile ? 2 : 5,
            width: "100%",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              gap: 2,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              marginLeft: -2,
            }}
          >
            {["Manager", "Admin"].map((role, index) => (
              <Paper
                key={index}
                elevation={3}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  p: 2,
                  width: isMobile ? "50%" : "280px",
                  bgcolor: "white",
                  borderRadius: "30px",
                  fontFamily: "Caladea, serif",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: "bold",
                    ml: 3,
                    fontFamily: "Caladea, serif",
                  }}
                >
                  {role}
                </Typography>
                <Button
                  variant="contained"
                  sx={{
                    bgcolor: "#e24e76",
                    color: "white",
                    borderRadius: "20px",
                    px: 3,
                    width: isMobile ? "30%" : "140px",
                    height: "40px",
                    fontFamily: "Caladea, serif",
                    textTransform: "capitalize",
                    fontSize: 18,
                  }}
                  onClick={() => navigate('/login-form')}  // Redirect to Track
                >
                  Login
                </Button>
              </Paper>
            ))}
          </Box>
          <Box
            sx={{
              marginTop: isMobile ? 2 : 3,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: -2,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                p: 2,
                width: isMobile ? "50%" : "280px",
                bgcolor: "white",
                borderRadius: "30px",
                fontFamily: "Caladea, serif",
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  ml: 3,
                  fontFamily: "Caladea, serif",
                }}
              >
                Employee
              </Typography>
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#e24e76",
                  color: "white",
                  borderRadius: "20px",
                  px: 3,
                  width: isMobile ? "30%" : "140px",
                  height: "40px",
                  fontFamily: "Caladea, serif",
                  textTransform: "capitalize",
                  fontSize: 18,
                }}
                onClick={() => navigate('/login-access')}
              >
                Login
              </Button>
            </Paper>
          </Box>
          <Typography variant="h6" color="white" mt={4} fontFamily="Caladea, serif">
            Life Changers Ind
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Track;
