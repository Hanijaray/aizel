import React, { useState, useRef, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  InputAdornment,
  CardContent,
  Typography,
  TextField,
  IconButton,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useMediaQuery,
  useTheme,
  Menu,
  Avatar,
  Box,
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import Header from './Navbarmain';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import moment from "moment";
import SearchIcon from "@mui/icons-material/Search";
import BlockIcon from '@mui/icons-material/Block';
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import favicon from '../assets/favicon.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.jpg';

const reportData = [
  {
    id: 1,
    userName: "Anu",
    dateTime: "Mar 15 2025, 03:40 PM",
    deadline: "Mar 15 2025, 03:40 PM",
    subject: "Subject",
    regarding: "Work",
    announcement: "Announcement",
    viewedby: [p2, p3],
  },
  {
    id: 2,
    userName: "John",
    dateTime: "Apr 20 2025, 10:00 AM",
    deadline: "Apr 22 2025, 05:00 PM",
    subject: "subject",
    regarding: "Regarding",
    announcement: "Announcement",
    viewedby: [p2],
  },
  {
    id: 3,
    userName: "Alice",
    dateTime: "May 10 2025, 02:30 PM",
    deadline: "May 12 2025, 06:00 PM",
    subject: "subject",
    regarding: "regarding",
    announcement: "Announcement ",
    viewedby: [p3],
  },
];

const Announcement = () => {
  const [dateTime, setDateTime] = useState(null);
  const [deadline, setDeadline] = useState(null);
  const [userName, setUserName] = useState('');
  const [regarding, setRegarding] = useState('');
  const [subject, setSubject] = useState('');
  const [announcementText, setAnnouncementText] = useState('');
  const dateInputRef1 = useRef(null);
  const deadlineInputRef = useRef(null);
  const [announcements, setAnnouncements] = useState(reportData);
  const [editingId, setEditingId] = useState(null);
  const [isEditing, setIsEditing] = useState(false); 

  const [currentTime, setCurrentTime] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(null);
  const [editableRow, setEditableRow] = useState(null);
  const [editData, setEditData] = useState({});
  const dateInputRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));
  const [filteredRecords, setFilteredRecords] = useState(reportData);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(moment());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handlePrint = () => {
    const tableElement = document.getElementById("printable-table").cloneNode(true);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Table</title>
          <style>
            body { 
                margin: 0; 
                padding: 20px; 
                font-family: Arial, sans-serif; 
                background: #fff;
                color: #000;
            }
            table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 10px;
            }
            th, td {
                border: 1px solid #ddd;
                padding: 8px;
                text-align: left;
            }
            th {
                background-color: purple;
                color: white;
                font-weight: bold;
            }
          </style>
        </head>
        <body>
          <h2>Today's Report</h2>
          ${tableElement.outerHTML}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: "Worker Dashboard",
          text: "Check out this worker dashboard!",
          url: window.location.href,
        });
      } else {
        alert("Sharing is not supported in your browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleMonthClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMonthClose = (month) => {
    setSelectedMonth(month);
    setAnchorEl(null);
  };

  const handleDateButtonClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  const handleDateChange = (event) => {
    const date = event.target.value;
    if (date) {
      const formattedDate = moment(date).format("MMM DD YYYY");
      setSelectedDate(formattedDate);
    } else {
      setSelectedDate(null);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12",
  ];

  const filteredData = announcements.filter((row) => {
    const matchesUsername = searchTerm
      ? row.userName.toLowerCase().includes(searchTerm.toLowerCase())
      : true;
    const matchesMonth = selectedMonth
      ? moment(row.dateTime, "MMM DD YYYY, hh:mm A").format("MM") === selectedMonth
      : true;
    const matchesDate = selectedDate
      ? moment(row.dateTime, "MMM DD YYYY, hh:mm A").isSame(moment(selectedDate, "MMM DD YYYY"))
      : true;
    return matchesUsername && matchesMonth && matchesDate;
  });

  const handleDateTimeChange = (event) => {
    const date = event.target.value;
    if (date) {
      const formattedDate = moment(date).format("MMM DD YYYY, hh:mm A");
      setDateTime(formattedDate);
    } else {
      setDateTime(null);
    }
  };

  const handleDeadlineChange = (event) => {
    const date = event.target.value;
    if (date) {
      const formattedDate = moment(date).format("MMM DD YYYY, hh:mm A");
      setDeadline(formattedDate);
    } else {
      setDeadline(null);
    }
  };

  const handleDateTimeButtonClick = () => {
    if (dateInputRef1.current) {
      dateInputRef1.current.showPicker();
    }
  };

  const handleDeadlineButtonClick = () => {
    if (deadlineInputRef.current) {
      deadlineInputRef.current.showPicker();
    }
  };

  const handleAddAnnouncementClick = () => {
    if (editingId) {
      // Update existing announcement
      const updatedAnnouncements = announcements.map((announcement) =>
        announcement.id === editingId
          ? {
              ...announcement,
              userName,
              dateTime,
              deadline,
              regarding,
              subject,
              announcement: announcementText,
            }
          : announcement
      );
      setAnnouncements(updatedAnnouncements);
      setEditingId(null);
      setIsEditing(false);
    } else {
      
      const newAnnouncement = {
        id: Math.floor(Math.random() * 1000),
        userName,
        dateTime,
        deadline,
        regarding,
        subject,
        announcement: announcementText,
        viewedby: [p2, p3],
      };
      setAnnouncements([...announcements, newAnnouncement]);
    }
    setUserName('');
    setDateTime('');
    setDeadline('');
    setRegarding('');
    setSubject('');
    setAnnouncementText('');
  };

  const handleEdit = (announcement) => {
    setEditingId(announcement.id);
    setIsEditing(true); 
    setUserName(announcement.userName);
    setDateTime(announcement.dateTime);
    setDeadline(announcement.deadline);
    setRegarding(announcement.regarding);
    setSubject(announcement.subject);
    setAnnouncementText(announcement.announcement);
  };

  const handleCloseEdit = () => {
    setEditingId(null);
    setIsEditing(false);
    setUserName('');
    setDateTime('');
    setDeadline('');
    setRegarding('');
    setSubject('');
    setAnnouncementText('');
  };

  return (
    <div style={{ marginLeft: 5 }}>
      <Header />
      <Grid container spacing={1} style={{ marginTop: -20, padding: 10 }}>
        <Grid item xs={4}>
          <Card
            style={{
              width: '400px',
              backgroundColor: '#940a91',
              color: 'white',
              height: '88vh',
              borderRadius: '10px',
              margin: 18,
              marginTop: 12,
              marginLeft: 5,
              position: "fixed",
            }}
          >
            <Container maxWidth="sm">
              <Box sx={{ mt: 2 }}>
                <Typography variant="h4" gutterBottom sx={{ textAlign: 'center',fontFamily:"Bricolage Grotesque" }}>
                  {isEditing ? 'Edit Announcement' : 'Add Announcement'}
                </Typography>
                <FormControl fullWidth margin="normal" size="small" sx={{ mt: 0.5, border: '1px solid white', borderRadius: "5px" }}>
                  <InputLabel sx={{ color: 'white' }}>User Name</InputLabel>
                  <Select
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    IconComponent={() => (
                      <ArrowDropDownIcon sx={{ color: 'white', fontSize: '32px' }} />
                    )}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '1px solid white',
                        },
                        '&:hover fieldset': {
                          border: '1px solid white',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid white',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                    label="User Name"
                    InputLabelProps={{
                      style: { color: "white" },
                    }}
                  >
                    <MenuItem value="User 1">User 1</MenuItem>
                    <MenuItem value="User 2">User 2</MenuItem>
                    <MenuItem value="User 3">User 3</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  fullWidth
                  label="Enter Date and Time"
                  type="text"
                  value={dateTime || ''}
                  margin="normal"
                  required
                  size="small"
                  InputLabelProps={{
                    required: false,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleDateTimeButtonClick}>
                          <CalendarMonthIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <input
                          type="datetime-local"
                          ref={dateInputRef1}
                          style={{ display: "flex", width: "0px", height: "0px", border: "none" }}
                          onChange={handleDateTimeChange}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '&:hover .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '&.Mui-focused .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' }, mt: 0.5,
                  }}
                />
                <TextField
                  fullWidth
                  label="Enter Deadline"
                  type="text"
                  value={deadline || ''}
                  margin="normal"
                  required
                  size="small"
                  InputLabelProps={{
                    required: false,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={handleDeadlineButtonClick}>
                          <CalendarMonthIcon sx={{ color: 'white' }} />
                        </IconButton>
                        <input
                          type="datetime-local"
                          ref={deadlineInputRef}
                          style={{ display: "flex", width: "0px", height: "0px", border: "none" }}
                          onChange={handleDeadlineChange}
                        />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '&:hover .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '&.Mui-focused .MuiOutlinedInput-root fieldset': { border: '1px solid white' },
                    '& .MuiInputLabel-root': { color: 'white' },
                    '& .MuiInputBase-input': { color: 'white' }, mt: 0.5,
                  }}
                />
                <FormControl fullWidth margin="normal" size="small" sx={{ mt: 0.5, border: '1px solid white', borderRadius: "5px" }}>
                  <InputLabel sx={{ color: 'white' }}>Choose Regarding</InputLabel>
                  <Select
                    value={regarding}
                    onChange={(e) => setRegarding(e.target.value)}
                    IconComponent={() => (
                      <ArrowDropDownIcon sx={{ color: 'white', fontSize: '32px' }} />
                    )}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          border: '1px solid white',
                        },
                        '&:hover fieldset': {
                          border: '1px solid white',
                        },
                        '&.Mui-focused fieldset': {
                          border: '1px solid white',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'white',
                      },
                      '& .MuiInputBase-input': {
                        color: 'white',
                      },
                    }}
                    label="Choose Regarding"
                  >
                    <MenuItem value="Regarding 1">Regarding 1</MenuItem>
                    <MenuItem value="Regarding 2">Regarding 2</MenuItem>
                    <MenuItem value="Regarding 3">Regarding 3</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid white',
                      },
                      '&:hover fieldset': {
                        border: '1px solid white',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid white',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    mt: 0.5,
                  }}
                  fullWidth
                  label="Enter Subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  margin="normal"
                  required
                  size="small"
                  InputLabelProps={{
                    required: false,
                  }}
                />
                <TextField
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        border: '1px solid white',
                      },
                      '&:hover fieldset': {
                        border: '1px solid white',
                      },
                      '&.Mui-focused fieldset': {
                        border: '1px solid white',
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: 'white',
                    },
                    '& .MuiInputBase-input': {
                      color: 'white',
                    },
                    mt: 0.5,
                  }}
                  fullWidth
                  label="Enter Announcement"
                  value={announcementText}
                  onChange={(e) => setAnnouncementText(e.target.value)}
                  margin="normal"
                  multiline
                  rows={8}
                  required
                  InputLabelProps={{
                    required: false,
                  }}
                />
                <Box sx={{ mt: 2, display: "flex" }} gap={2}>
                  {isEditing ? (
                    <>
                      <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        sx={{
                          background: 'white',
                          color: 'purple',
                          fontSize: '26px',
                          height: 52,
                          marginTop: '-5px',
                          fontFamily: 'source serif pro',
                          fontWeight: 'bold',
                        }}
                        onClick={handleAddAnnouncementClick}
                      >
                        UPDATE
                      </Button>
                      <Button
                        variant="contained"
                        color="secondary"
                        fullWidth
                        sx={{
                          background: 'white',
                          color: 'purple',
                          fontSize: '26px',
                          height: 52,
                          marginTop: '-5px',
                          fontFamily: 'source serif pro',
                          fontWeight: 'bold',
                        }}
                        endIcon={<BlockIcon style={{ fontSize: "40px" }} />}
                        onClick={handleCloseEdit}
                      >
                        CLOSE
                      </Button>
                    </>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      fullWidth
                      startIcon={<AddIcon style={{ fontSize: '56px' }} />}
                      sx={{
                        background: 'white',
                        color: 'purple',
                        fontSize: '22px',
                        height: 52,
                        marginTop: '-5px',
                        fontFamily: 'caladea',
                        fontWeight: 'bold',
                      }}
                      onClick={handleAddAnnouncementClick}
                    >
                      ADD ANNOUNCEMENT
                    </Button>
                  )}
                </Box>
              </Box>
            </Container>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{ ml: -10, mt: 2 }} fullWidth>
          <Paper style={{ overflow: isDesktop ? "hidden" : "auto", height: isDesktop ? "87vh" : "auto", width: "1080px" }}>
            <Grid container spacing={1} style={{ marginTop: -1, padding: 10 }}>
              <Grid item xs={8}>
                <Grid container justifyContent="space-between" alignItems="center" sx={{ width: "1050px" }}>
                  <Typography variant="h5" style={{ marginLeft: "13px", fontFamily: "Bricolage Grotesque" }}>
                    Announcement History
                  </Typography>
                  <Grid item display="flex" alignItems="center" gap={2}>
                    {!isMobile && (
                      <Typography variant="subtitle2">
                        {currentTime.format("ddd, MMM DD YYYY HH:mm:ss")}
                      </Typography>
                    )}
                    <IconButton size="small" onClick={handleShare}>
                      <ShareIcon style={{ backgroundColor: "purple", width: 37, borderRadius: "5px", color: "white", height: 32 }} />
                    </IconButton>
                    <IconButton size="small" onClick={handlePrint}>
                      <PrintIcon style={{ backgroundColor: "purple", width: 37, borderRadius: "5px", color: "white", height: "32px", mt: -1 }} />
                    </IconButton>
                  </Grid>
                </Grid>
                <Card sx={{ height: "78vh", width: "1070px", ml: -1.2, border: "2px solid purple", borderRadius: "10px" }}>
                  <CardContent>
                    <Grid container spacing={1} alignItems="center" marginTop={0}>
                      <Grid item xs={12} sm={6} md={3}>
                        <TextField
                          fullWidth
                          variant="outlined"
                          placeholder="Search History Item"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          InputProps={{
                            sx: { borderRadius: "9px", border: "1px solid", height: "40px" }
                          }}
                        />
                      </Grid>
                      <Grid item xs={0} sm={0} md={0}>
                        <IconButton
                          sx={{ background: "black", color: "white", borderRadius: "10px", textAlign: 'left' }}
                        >
                          <SearchIcon />
                        </IconButton>
                      </Grid>
                      <Grid item xs={2.4}>
                        <Button variant="contained" color="primary" style={{ display: "none" }} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Button variant="contained" color="primary" style={{ display: "none" }} />
                      </Grid>
                      <Grid item xs={12} sm={6} md={2}>
                        <Button
                          variant="outlined"
                          size="small"
                          style={{ borderRadius: "9px", height: "43px", backgroundColor: "orange", color: "black", fontSize: 20, fontWeight: "bold", textTransform: "capitalize", border: "1px solid", fontFamily: "caladea" }}
                          endIcon={<ArrowDropDownIcon style={{ fontSize: "30px" }} />}
                          onClick={handleMonthClick}
                          fullWidth
                        >
                          Month
                        </Button>
                        <Menu
                          anchorEl={anchorEl}
                          open={Boolean(anchorEl)}
                          onClose={() => setAnchorEl(null)}
                        >
                          {months.map((month) => (
                            <MenuItem key={month} onClick={() => handleMonthClose(month)}>
                              {moment(month, "MM").format("MMMM")}
                            </MenuItem>
                          ))}
                        </Menu>
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
                            style={{ display: "flex", width: "0px", height: "0px", backgroundColor: "orange", border: "none" }}
                            onChange={handleDateChange}
                          />
                        </Button>
                      </Grid>
                    </Grid>

                    <TableContainer
                      component={Paper}
                      style={{
                        marginTop: 12,
                        overflow: "auto",
                        width: "100%",
                        maxHeight: isDesktop ? "65vh" : "none", 
                      }}
                    >
                      <Table
                        id="printable-table"
                        size="small"
                        style={{
                          width: "100%",
                          tableLayout: "auto",
                        }}
                      >
                        <TableHead >
                          <TableRow sx={{ height: "50px", backgroundColor: "purple", color: "red", position: "sticky", top: 0, zIndex: 2, }} >
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>User Name</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Date & Time</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Deadline</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Subject</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Announcement</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>View By</TableCell>
                            <TableCell sx={{ fontSize: isMobile ? "10px" : "14px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Edit</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody style={{ overflowY: "auto", maxHeight: "60vh", }}>
                          {filteredData.map((announcement, index) => (
                            <TableRow key={index} sx={{ height: "46px", overflow: "auto" }}>
                              <TableCell sx={{ padding: "4px", fontWeight: "bold", width: "12.5%" }}>
                                <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.userName}</Typography>
                              </TableCell>
                              <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                                <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "12px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.dateTime}</Typography>
                              </TableCell>
                              <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                                <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "12px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.deadline}</Typography>
                              </TableCell>
                              <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                                <>
                                  {announcement.subject}
                                  <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "11px", color: "#555", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.regarding}</Typography>
                                </>
                              </TableCell>
                              <TableCell sx={{ padding: "4px", fontSize: isMobile ? "12px" : "14px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                                {announcement.announcement}
                              </TableCell>
                              <TableCell sx={{ padding: "4px", fontSize: "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                                <Box display="flex" justifyContent="center" gap={-6}>
                                  {(announcement.viewedby || []).map((image, index) => (
                                    <Avatar key={index} src={image} alt={`Image ${index + 1}`} sx={{ width: 23, height: 30 }} />
                                  ))}
                                </Box>
                              </TableCell>
                              <TableCell sx={{ width: "12.5%", textAlign: "center" }}>
                                <IconButton onClick={() => handleEdit(announcement)}
                                  sx={{ background: "orange", width: "25px", height: "25px", borderRadius: "5px", textAlign: "center", "&:hover": { backgroundColor: "black" } }}
                                >
                                  <img src={favicon} alt="Favicon" />
                                </IconButton>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default Announcement;