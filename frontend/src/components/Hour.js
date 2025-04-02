import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  ToggleButton,
  ToggleButtonGroup,
  Card,
  CardContent,
  Grid,
  Chip,
  Box,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageIcon from "@mui/icons-material/Message";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import logo9 from "../assets/logo9.png";
import p2 from "../assets/p2.png";
import HomeIcon from "@mui/icons-material/Home";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import EditIcon from "@mui/icons-material/Edit";
import ChatIcon from "@mui/icons-material/Chat";
import SecurityIcon from "@mui/icons-material/Security";
import DateRangeIcon from "@mui/icons-material/DateRange"; // Import DateRangeIcon for date fields
import Nav from './Nav';

const iconStyle = (isMobile) => ({
  color: "white",
  border: "1px solid white",
  borderRadius: "50%",
  margin: "0 5px",
  padding: isMobile ? "4px" : "6px",
});

const Hour = () => {
  const [permissionType, setPermissionType] = useState("hour");
  const [requests, setRequests] = useState([
    { name: "Your Name", time: "2:00 pm - 4:00 pm", status: "Pending Approval" },
    { name: "Your Name", time: "2:00 pm - 4:00 pm", status: "Approved" },
  ]);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLaptop = useMediaQuery(theme.breakpoints.between("md", "lg"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));

  const handleTypeChange = (event, newType) => {
    if (newType !== null) setPermissionType(newType);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        color: "black",
        padding: 3,
        borderRadius: 2,
        height: "100vh",
        width: "100%",
        position: isMobile ? "auto" : isTablet ? "auto" : "fixed",
        overflow: "auto",
        marginLeft: -3,
        marginTop: -3,
      }}
    >
      <div>
        {/* Header Section */}
        <Box
          sx={{
            backgroundColor: "#940b92",
            width: "99%",
            padding: 10,
            height: "9.5vh",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            p: 1,
            mt: 0,
          }}
        >
          <img
            src={logo9}
            alt="Logo2"
            style={{
              width: isMobile ? "120px" : isTablet ? "140px" : "150px",
              height: isMobile ? "45px" : isTablet ? "50px" : "55px",
              padding: isMobile ? "45px" : isTablet ? "50px" : "55px",
            }}
          />
          <Box sx={{ padding: 4 }} gap={5}>
            <IconButton
              color="inherit"
              size="large"
              sx={{
                background: "white",
                color: "#940b92",
                borderRadius: "4px",
                mx: 1,
                fontSize: isMobile ? "30px" : "40px",
              }}
            >
              <MessageIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
            <IconButton
              color="inherit"
              size="large"
              sx={{
                background: "white",
                color: "#940b92",
                borderRadius: "4px",
              }}
            >
              <NotificationsIcon fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          </Box>
        </Box>

        {/* Welcome Section */}
        <div className="bg-purple-700 text-white p-4 text-center flex items-center justify-between">
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            sx={{ p: 2, pt: 1 }}
          >
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                src={p2}
                sx={{
                  width: isMobile ? 25 : isTablet ? 30 : 40,
                  height: isMobile ? 25 : isTablet ? 30 : 40,
                  mr: 1,
                }}
              />
              <Box>
                <Typography
                  variant="body2"
                  sx={{
                    lineHeight: 1,
                    fontSize: isMobile ? "14px" : isTablet ? "16px" : "18px",
                  }}
                >
                  Welcome Back !
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    lineHeight: 1,
                    fontSize: isMobile ? "13px" : isTablet ? "15px" : "16px",
                    ml: 1,
                  }}
                >
                  Jonathan Patterson
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={6} textAlign="right">
              <Button
                variant="contained"
                color="secondary"
                size="small"
                style={{ borderRadius: "40px", backgroundColor: "#940b92" }}
                endIcon={
                  <AccountCircleIcon
                    style={{
                      fontSize: isMobile ? "28px" : isTablet ? "32px" : "34px",
                    }}
                  />
                }
              >
                <span
                  style={{
                    fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px",
                  }}
                >
                  View Profile
                </span>
              </Button>
            </Grid>
          </Grid>
          <Grid container alignItems="center" sx={{ pt: 0, mt: isMobile ? -1 : isTablet ? -1 : 0 }}>
            <Grid item xs={8}>
              <Typography
                variant="caption"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: isMobile ? "12px" : isTablet ? "14px" : "15px",
                  lineHeight: 1,
                  mt: 2,
                  ml: 6,
                }}
              >
                <LocationOnIcon
                  sx={{
                    color: "#940b92",
                    fontSize: isMobile ? "20px" : isTablet ? "24px" : "27px",
                  }}
                />
                123, Anywhere Street, Any City, live location
              </Typography>
            </Grid>
            <Grid item xs={3} textAlign="right">
              <Typography
                variant="caption"
                sx={{
                  fontSize: isMobile ? "12px" : isTablet ? "14px" : "15px",
                  lineHeight: 1,
                }}
              >
                Login: 9:30 pm
              </Typography>
            </Grid>
          </Grid>
        </div>

        {/* Permission Section */}
        <Box sx={{ p: 2, mt: isMobile ? -42 : -30 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Typography
                fullWidth
                variant="subtitle1"
                fontWeight="bold"
                sx={{
                  textAlign: "center",
                  p: 2,
                  pt: 1,
                  pb: 0,
                  mt: isMobile ? 40 : isTablet ? 30 : 27,
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "23px",
                  fontFamily: "source serif pro",
                }}
              >
                PERMISSION
                <span style={{ color: "#940b92", borderRadius: "2px solid" }}>
                  ____________________
                </span>
              </Typography>
              <Box sx={{ p: 2, pt: 0 }}>
                <ToggleButtonGroup
                  value={permissionType}
                  exclusive
                  onChange={handleTypeChange}
                  
                  sx={{ mt: 1 }}
                >
                  <ToggleButton
                    value="hour"
                    sx={{
                      color: "white",
                      backgroundColor: "#940b92",
                      fontSize: isMobile ? "0.65rem" : isTablet ? "0.7rem" : "0.75rem",
                      height: "40px",
                      borderRadius: " 20px 0 0 20px ",
                      fontWeight: "bold",
                      width:isMobile ? "175px" : isTablet ? "200px" : "300px",
                      
                      
                    }}
                  >
                    HOUR PERMISSION
                  </ToggleButton>
                  <ToggleButton
                    value="leave"
                    style={{
                      width:isMobile ? "175px" : isTablet ? "200px" : "300px",
                      ml: 10,
                      color: "white",
                      backgroundColor: "#fcc059",
                      fontSize: isMobile ? "0.65rem" : isTablet ? "0.7rem" : "0.75rem",
                      borderRadius: "0 20px 20px 0",
                      height: "40px",
                      fontWeight: "bold",
                    }}
                  >
                    LEAVE PERMISSION
                  </ToggleButton>
                  
                </ToggleButtonGroup>
              </Box>
              <Card sx={{ mt: isMobile ? -1.5 : isTablet ? 0 : 1, }}>
                <Typography
                  variant="subtitle1"
                  sx={{
                    fontWeight: "bold",
                    p: -0.5,
                    pt: 1,
                    mt: 0,
                    fontSize: isMobile ? "20px" : isTablet ? "22px" : "26px",
                    fontFamily: "source serif pro",
                  }}
                >
                  Permission Form
                </Typography>
                {permissionType === "hour" ? (
                <Typography
                  variant="caption"
                  color="black"
                  sx={{
                    fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px",
                    mt: -50,
                    lineHeight: 1,
                  }}
                >
                  Please fill out this form to request permission for leave during
                  working hours
                </Typography>):(
                  <Typography
                  variant="caption"
                  color="black"
                  sx={{
                    fontSize: isMobile ? "14px" : isTablet ? "15px" : "16px",
                    mt: -50,
                    lineHeight: 1,
                  }}
                >
                  Please fill out this form to request permission for leave
                </Typography>
                )}

                <Card component="form" sx={{ p: 2, backgroundColor: permissionType === "hour" ? "#940b92" : "#fcc059",
                   m: isMobile ? 1 : isTablet ? 0 : 4,                                                                     }}>
                  <Grid container spacing={1} sx={{ mt: isMobile ? -1 : isTablet ? 0 : 2 }}>
                    <Grid item xs={6} container direction="column" alignItems="flex-start">
                      <TextField
                        fullWidth
                        label="Your Name"
                        size="medium"
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                        InputProps={{
                          endAdornment: (
                            <ArrowDropDownIcon
                              style={{
                                fontSize: isMobile ? "24px" : isTablet ? "28px" : "30px",
                              }}
                            />
                          ),
                        }}
                        InputLabelProps={{
                          style: {
                            fontSize: isMobile ? "12px" : isTablet ? "13px" : "inherit",
                          },
                        }}
                      />
                    </Grid>
                    <Grid item>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontSize: isMobile ? "12px" : isTablet ? "13px" : "14px",
                          lineHeight: 1,
                          mb: 1.5,
                          textAlign: "left",
                        }}
                      >
                        Employee ID:
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "white",
                          fontSize: isMobile ? "12px" : isTablet ? "13px" : "14px",
                          lineHeight: 1,
                          mt: 1.5,
                          textAlign: "left",
                        }}
                      >
                        Position:
                      </Typography>
                    </Grid>

                    {/* Conditional Rendering for Time/Date Fields */}
                    {permissionType === "hour" ? (
                      <>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Time From"
                            size="medium"
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                            InputProps={{
                              endAdornment: (
                                <AccessTimeIcon
                                  fontSize={isMobile ? "small" : isTablet ? "medium" : "large"}
                                />
                              ),
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: isMobile ? "12px" : isTablet ? "13px" : "inherit",
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            label="Time To"
                            size="medium"
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                            InputProps={{
                              endAdornment: (
                                <AccessTimeIcon
                                  fontSize={isMobile ? "small" : isTablet ? "medium" : "large"}
                                />
                              ),
                            }}
                            InputLabelProps={{
                              style: {
                                fontSize: isMobile ? "12px" : isTablet ? "13px" : "inherit",
                              },
                            }}
                          />
                        </Grid>
                      </>
                    ) : (
                      <>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            // label="Date From"
                            type="date"
                            size="medium"
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                            
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            fullWidth
                            // label="Date To"
                            type="date"
                            size="medium"
                            sx={{ backgroundColor: "white", borderRadius: 1 }}
                            
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Enter Reason For Your Permission"
                        multiline
                        rows={1}
                        size="medium"
                        sx={{ backgroundColor: "white", borderRadius: 1 }}
                        InputLabelProps={{
                          style: {
                            fontSize: isMobile ? "12px" : isTablet ? "13px" : "inherit",
                          },
                        }}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Card>
            </Grid>

            {/* Permission Approval Section */}
            <Grid item xs={12} md={6}>
              <Card sx={{ mt: isMobile ? "-10px" : isTablet ? 3 : 27 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                  sx={{
                    textAlign: "left",
                    p: 2,
                    mt: isMobile ? "-15px" : isTablet ? "5px" : "5px",
                    fontFamily: "source serif pro",
                    fontSize: isMobile ? "16px" : isTablet ? "22px" : "26px",
                  }}
                >
                  PERMISSION APPROVAL
                  <span style={{ color: "#940b92" }}>__________</span>
                </Typography>
                <Box sx={{ p: 2, pt: 0, mt: isMobile ? -3 : isTablet ? 0 : 0 }}>
                  {requests.map((req, index) => (
                    <Card
                      key={index}
                      sx={{
                        mt: 1,
                        background: "#940b92",
                        color: "white",
                        p: 0.2,
                        height: isMobile ? "70px" : "90px",
                      }}
                    >
                      <CardContent sx={{ p: 1 }}>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <Grid item xs={6}>
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              style={{
                                textAlign: "left",
                                lineHeight: 1,
                                mt: isMobile ? 0 : isTablet ? 0 : 5,
                                ml: 20,
                                fontSize: isMobile ? "18px" : isTablet ? "12px" : "26px",
                                fontFamily: "caladea",
                              }}
                            >
                              <span>{req.name}</span>
                            </Typography>
                          </Grid>
                          <Grid item xs={6} textAlign="right">
                            <Typography
                              variant="caption"
                              style={{
                                lineHeight: 1,
                                fontFamily: "caladea",
                                fontSize: isMobile ? "10px" : isTablet ? "12px" : "23px",
                                mt: isMobile ? 0 : isTablet ? 0 : 5,
                              }}
                            >
                              <span>{req.time}</span>
                            </Typography>
                          </Grid>
                        </Grid>
                        <Grid
                          container
                          alignItems="center"
                          justifyContent="space-between"
                          sx={{ mt: 1 }}
                        >
                          <Grid item xs={12}>
                            <Box
                              display="flex"
                              alignItems="center"
                              justifyContent="space-between"
                            >
                              <span
                                style={{
                                  fontSize: isMobile ? "10px" : isTablet ? "12px" : "22px",
                                  color: "white",
                                  marginRight: "8px",
                                  lineHeight: 1,
                                  fontFamily: "caladea",
                                }}
                              >
                                Reason
                              </span>
                              <Chip
                                label={<span>{req.status}</span>}
                                size="medium"
                                sx={{
                                  backgroundColor:
                                    req.status === "Approved"
                                      ? "#45a834"
                                      : "#ffb200",
                                  fontSize: isMobile ? "10px" : isTablet ? "12px" : "17px",
                                  color: "white",
                                }}
                              />
                            </Box>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              </Card>

              {/* Footer Buttons */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#940b92",
                  height: "100px",
                  marginTop: isMobile ? "10px" : isTablet ? "100px" : "110px",
                }}
                fullWidth
              >
           <Nav />
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    </div>
  );
};

export default Hour;