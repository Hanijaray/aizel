import React, { useState, useRef, useEffect } from "react";
import { FaSortDown, FaCalendarAlt } from "react-icons/fa";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { MdPrint } from "react-icons/md";
import CloseIcon from '@mui/icons-material/Close';
import { IoShareSocialOutline } from "react-icons/io5";
import { IoSearchOutline } from "react-icons/io5";
import Table from "./Tables";
import {
  Box,
  Typography,
  Button,
  TextField,
  Card,
  MenuItem,
  Paper,
  Grid,
  IconButton,
  Popover,
  styled,Dialog,DialogTitle,DialogActions,DialogContent,
} from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#950f95",
  color: "white",
  "&:hover": {
    backgroundColor: "#950f95",
  },
}));

const MonthButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fcb813",
  color: "black",
  fontWeight: "bold",
  border: "1px solid black",
  "&:hover": {
    backgroundColor: "#fcb813",
  },
}));

function Attendancereport() {
  // State declarations
  const [currentTime, setCurrentTime] = useState("");
  const [viewHistory, setViewHistory] = useState(false);
  const [monthAnchorEl, setMonthAnchorEl] = useState(null);
  const [dateAnchorEl, setDateAnchorEl] = useState(null);
  const dateInputRef = useRef(null);
  const [approvalAnchorEl, setApprovalAnchorEl] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState("Months");
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({
      employeeName: '',
      fromDate: '',
      employeeId: '',
      toDate: '',
      reason: ''
    });
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    };
  
    const handleSubmit = (action) => {
      console.log(action, formData);
      handleClose();
    }; 

  const months = ["Months", "January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"];

  const formatCurrentTime = () => {
    const now = new Date();
    const day = now.toLocaleString("default", { weekday: "long" });
    const month = now.toLocaleString("default", { month: "long" });
    const date = now.getDate();
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");

    return `${day}, ${month} ${date}, ${year} ${hours}:${minutes}:${seconds}`;
  };

  const handleDateButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };
  
  const handleDateChange = (event) => {
    const date = event.target.value;
    if (date) {
      setSelectedDate(new Date(date)); // Store as Date object
    } else {
      setSelectedDate(null);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatCurrentTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  const handleViewHistoryClick = () => {
    setViewHistory(!viewHistory);
    setSelectedDate(null); 
  };

  const handleShare = async () => {
    const shareData = {
      title: "Work Report",
      text: "Check out this work report.",
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleMonthClick = (event) => {
    setMonthAnchorEl(event.currentTarget);
  };

  const handleMonthClose = () => {
    setMonthAnchorEl(null);
  };

  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    handleMonthClose();
  };

  const handleApprovalClick = (event) => {
    setApprovalAnchorEl(event.currentTarget);
  };

  const handleApprovalClose = () => {
    setApprovalAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearDateFilter = () => {
    setSelectedDate(null);
  };

  return (
    <Grid item xs={12}>
      <Paper sx={{ backgroundColor: "white", flex: 1, ml: 1 }}>
        <Grid container spacing={0} alignItems="center" sx={{ marginTop: 0 }}>
          <Grid item xs={3}>
            <Typography variant="h5" sx={{ textAlign: "left" }}>
              Today's Attendance
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Button></Button>
          </Grid>
          <Grid item xs={6} sx={{ gap: 1, alignItems: "center" }}>
            {currentTime}
            <Button onClick={handleShare} sx={{ minWidth: 0, p: 1, ml: 2 }}>
              <IoShareSocialOutline style={{ fontSize: "32px", borderRadius: "8px", padding: "4px", color: "white", backgroundColor: "#950f95" }} />
            </Button>
            <Button onClick={handlePrint} sx={{ minWidth: 0, p: 1 }}>
              <MdPrint style={{ fontSize: "32px", color: "white", borderRadius: "8px", padding: "4px", backgroundColor: "#950f95" }} />
            </Button>
            <StyledButton onClick={handleClickOpen} sx={{ minWidth: 0, p: 1 }}>
              Approval
            </StyledButton>
          </Grid>
        </Grid>

        <Paper sx={{ p: 1, mb: 7, border: "1px solid #950f95", borderRadius: "8px" }}>
          <Grid container spacing={0.5} alignItems="center" sx={{ marginBottom: "5px" }}>
            <Grid item xs={3}>
              <TextField
                placeholder="Search by Name or ID"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ "& .MuiInputBase-root": { borderRadius: "8px" } }}
              />
            </Grid>
            <Grid item>
              <IoSearchOutline style={{ fontSize: "32px", color: "white", borderRadius: "8px", padding: "2px", backgroundColor: "#950f95" }} />
            </Grid>
            <Grid item xs={2.6}>
              <Button variant="contained" color="primary" style={{ display: "none" }} />
            </Grid>
            <Grid item xs={2}>
              <Button
                variant="contained"
                fullWidth
                style={{ borderRadius: "9px", height: "43px", backgroundColor: "purple", color: "white", fontSize: 20, fontWeight: "bold", textTransform: "capitalize", border: "1px solid black", fontFamily: "caladea" }}
                onClick={handleViewHistoryClick}
              >
                {viewHistory ? "Hide History" : "View History"}
              </Button>
            </Grid>
            
            <Grid item>
              <MonthButton
                variant="contained"
                onClick={handleMonthClick}
                endIcon={<FaSortDown style={{ marginLeft: "8px", marginBottom: "4px" }} />}
                sx={{ width: "140px" }}
              >
                {selectedMonth}
              </MonthButton>
              <Popover
                open={Boolean(monthAnchorEl)}
                anchorEl={monthAnchorEl}
                onClose={handleMonthClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              >
                <Box sx={{ width: "160px" }}>
                  {months.map((month, index) => (
                    <MenuItem
                      key={index}
                      onClick={() => handleMonthSelect(month)}
                      sx={{ "&:hover": { backgroundColor: "#f0f0f0" } }}
                    >
                      {month}
                    </MenuItem>
                  ))}
                </Box>
              </Popover>
            </Grid>
            <Grid item xs={12} sm={6} md={2}>
              <Button
                variant="outlined"
                size="small"
                style={{ borderRadius: "9px", backgroundColor: "orange", color: "black", fontSize: 20, fontWeight: "bold", textTransform: "capitalize", border: "1px solid", fontFamily: "caladea" }}
                endIcon={<CalendarMonthIcon style={{ fontSize: "30px" }} />}
                fullWidth
                onClick={handleDateButtonClick}
              >
                Date
                <input
                  type="date"
                  ref={dateInputRef}
                  style={{ display: "none" }}
                  onChange={handleDateChange}
                />
              </Button>
            </Grid>
          </Grid>
          <Table 
            searchTerm={searchTerm} 
            selectedMonth={selectedMonth} 
            selectedDate={selectedDate} 
          />
        </Paper>
      </Paper>

      <Dialog maxWidth="sm"fullWidth open={open} onClose={handleClose}>
        <DialogTitle  sx={{ textAlign: 'center' }}>Leave Permission
        <IconButton
      aria-label="close"
      onClick={handleClose}
      sx={{
        position: 'absolute',
        right: 8,
        top: 8,
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <Card sx={{p:2,border:"1px solid"}}>            
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body2" sx={{ textAlign: "left" }}>Employee Name:</Typography>
                              <Typography variant="body2" sx={{ textAlign: "right" }}>From:</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body2" sx={{ textAlign: "left" }}>Employee ID:</Typography>
                              <Typography variant="body2" sx={{ textAlign: "right" }}>To:</Typography>
                            </div>            
                            <Typography>Reason</Typography>
            </Card>

            
            
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '0 24px 20px' }}>
        <Button 
            variant="contained" 
            color="success" 
            onClick={() => handleSubmit('approved')}
            sx={{ flex: 1, marginLeft: 1 }}
          >
            APPROVE
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => handleSubmit('rejected')}
            sx={{ flex: 1, marginRight: 1 }}
          >
            REJECTED
          </Button>
          
        </DialogActions>
        <DialogTitle sx={{ textAlign: 'center',mt:-2 }}>Hour Permission</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '100%' },
            }}
            noValidate
            autoComplete="off"
          >
            <Card sx={{p:2,border:"1px solid"}}>            
              <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body2" sx={{ textAlign: "left" }}>Employee Name:</Typography>
                              <Typography variant="body2" sx={{ textAlign: "right" }}>From:</Typography>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                              <Typography variant="body2" sx={{ textAlign: "left" }}>Employee ID:</Typography>
                              <Typography variant="body2" sx={{ textAlign: "right" }}>To:</Typography>
                            </div>            
                            <Typography>Reason</Typography>
            </Card>

            
            
          </Box>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'space-between', padding: '0 24px 20px' }}>
        <Button 
            variant="contained" 
            color="success" 
            onClick={() => handleSubmit('approved')}
            sx={{ flex: 1, marginLeft: 1 }}
          >
            APPROVE
          </Button>
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => handleSubmit('rejected')}
            sx={{ flex: 1, marginRight: 1 }}
          >
            REJECTED
          </Button>
         
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default Attendancereport;