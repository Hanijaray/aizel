import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo7 from "../assets/logo7.png";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Button,
  AppBar,
  Toolbar,
  useMediaQuery,
  useTheme,
  Grid,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Header = () => {
  const [workersAnchorEl, setWorkersAnchorEl] = useState(null);
  const [mobileMenuAnchor, setMobileMenuAnchor] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(1280));

  // Active state based on current path
  const isActive = (path) => location.pathname === path;

  // Handlers for Workers dropdown
  const handleWorkersMenuOpen = (event) => {
    setWorkersAnchorEl(event.currentTarget);
  };

  const handleWorkersMenuClose = () => {
    setWorkersAnchorEl(null);
  };

  // Handlers for mobile menu
  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchor(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchor(null);
  };

  return (
    <AppBar position="relative" sx={{ backgroundColor: "#940a91", zIndex: 1301, height: "70px" }}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          {/* Logo Section */}
          <Grid item>
            <img
              src={logo7}
              alt="Logo2"
              style={{ width: "200px", marginBottom: 18, marginTop: 10 }}
            />
          </Grid>

          {/* Desktop Menu */}
          {!isMobile ? (
            <Grid item>
              <Grid container spacing={8} alignItems="center">
                {/* LC Request */}
                <Grid item>
                  <Button
                    onClick={() => navigate("/lc-request")}
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/lc-request") ? "#fbc058" : "transparent",
                      color: isActive("/lc-request") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                  >
                    LC Request
                  </Button>
                </Grid>

                {/* Announcement */}
                <Grid item>
                  <Button
                    onClick={() => navigate("/announcement")}
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/announcement") ? "#fbc058" : "transparent",
                      color: isActive("/announcement") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                  >
                    Announcement
                  </Button>
                </Grid>

                {/* Task */}
                <Grid item>
                  <Button
                    onClick={() => navigate("/task")}
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/task") ? "#fbc058" : "transparent",
                      color: isActive("/task") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                  >
                    Task
                  </Button>
                </Grid>

                {/* Workers Dropdown */}
                <Grid item>
                  <Button
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/workers") ? "#fbc058" : "transparent",
                      color: isActive("/workers") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                    onClick={handleWorkersMenuOpen}
                    endIcon={<ArrowDropDownIcon style={{ fontSize: "40px" }} />}
                  >
                    Workers
                  </Button>
                  <Menu
                    anchorEl={workersAnchorEl}
                    open={Boolean(workersAnchorEl)}
                    onClose={handleWorkersMenuClose}
                  >
                    <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/workers'); }}>Today's Report</MenuItem>
                    <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/workers/history'); }}>Report History</MenuItem>
                    <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/Workerdetails'); }}>Worker Attendance</MenuItem>
                  </Menu>
                </Grid>

                {/* Location */}
                {/* <Grid item>
                  <Button
                    onClick={() => navigate("/location")}
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/location") ? "#fbc058" : "transparent",
                      color: isActive("/location") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                  >
                    Location
                  </Button>
                </Grid> */}

                {/* Dashboard */}
                <Grid item>
                  <Button
                    onClick={() => navigate("/dashboard")}
                    color="inherit"
                    sx={{
                      fontSize: 20,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                      backgroundColor: isActive("/dashboard") ? "#fbc058" : "transparent",
                      color: isActive("/dashboard") ? "#940a91" : "white",
                      "&:hover": { backgroundColor: "#fbc058", color: "#940a91" },
                    }}
                  >
                    Dashboard
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          ) : (
            // Mobile Menu
            <Grid item>
              <IconButton color="inherit" onClick={handleMobileMenuOpen}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={mobileMenuAnchor} open={Boolean(mobileMenuAnchor)} onClose={handleMobileMenuClose}>
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/lc-request'); }}>LC Request</MenuItem>
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/announcement'); }}>Announcement</MenuItem>
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/task'); }}>Task</MenuItem>
                <MenuItem onClick={handleWorkersMenuOpen}>Workers <ArrowDropDownIcon /></MenuItem>
                {/* <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/location'); }}>Location</MenuItem> */}
                <MenuItem onClick={() => { handleMobileMenuClose(); navigate('/dashboard'); }}>Dashboard</MenuItem>

                {/* Workers Submenu in Mobile */}
                <Menu
                  anchorEl={workersAnchorEl}
                  open={Boolean(workersAnchorEl)}
                  onClose={handleWorkersMenuClose}
                >
                  <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/workers1'); }}>Today's Report</MenuItem>
                  <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/workers/history'); }}>Report History</MenuItem>
                  <MenuItem onClick={() => { handleWorkersMenuClose(); navigate('/workers/attendance'); }}>Worker Attendance</MenuItem>
                </Menu>
              </Menu>
            </Grid>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
