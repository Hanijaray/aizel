import React, { useState, useRef, useEffect } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.jpg';
import p10 from '../assets/p10.jpg';
import p11 from '../assets/p11.jpg';
import p12 from '../assets/p12.jfif';
import p13 from '../assets/p13.jpg';
import p14 from '../assets/p14.jfif';
import {
  Grid,
  Card,
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
  MenuItem,
  Avatar,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import favicon from '../assets/favicon.png';

const reportData = [
  // Your report data here
];

const Announcement1 = ({ announcements = [] }) => {
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

  const handleViewHistoryClick = () => {
    setSearchTerm("");
    setSelectedDate(null);
    setSelectedMonth("");
    setFilteredRecords(reportData);
  };

  const handleEditClick = (row) => {
    setEditableRow(row);
    setEditData(row);
  };

  const handleUpdateClick = () => {
    const updatedAnnouncements = announcements.map(announcement =>
      announcement === editableRow ? editData : announcement
    );
    setEditableRow(null);
    setEditData({});
    // Update the announcements state or call a function to update the parent state
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const months = [
    "01", "02", "03", "04", "05", "06",
    "07", "08", "09", "10", "11", "12"
  ];

  const filteredData = [...announcements, ...filteredRecords].filter((row) => {
    const rowMonth = moment(row.date, "MMM DD YYYY").format("MM");
    const matchesMonth = selectedMonth ? rowMonth === selectedMonth : true;
    const matchesName = searchTerm ? row.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesId = searchTerm ? row.id.toString().includes(searchTerm) : true;
    const matchesDate = selectedDate ? moment(row.date, "MMM DD YYYY").isSame(moment(selectedDate, "MMM DD YYYY")) : true;
    return matchesMonth && (matchesName || matchesId) && matchesDate;
  });

  return (
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
                  maxHeight: isDesktop ? "65vh" : "none", // Adjust height for scrollable rows
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
                    <TableRow sx={{ height: "50px", backgroundColor: "purple", color: "red",position:"sticky",top: 0,
        zIndex: 2, }} >
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>User Name</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Date & Time</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Deadline</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Subject</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Announcement</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>View By</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "10px" : "13px", padding: "4px", color: "white", width: "12.5%", textAlign: "center", fontWeight: "bold", fontFamily: "Bricolage Grotesque" }}>Edit</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody style={{ overflowY: "auto", maxHeight: "60vh", }}>
                    {announcements.map((announcement, index) => (
                      <TableRow key={index} sx={{ height: "46px", overflow: "auto" }}>
                        <TableCell sx={{ padding: "4px", fontWeight: "bold", width: "12.5%" }}>
                          {editableRow === announcement ? (
                            <TextField
                              name="userName"
                              value={editData.userName}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.userName}</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                          {editableRow === announcement ? (
                            <TextField
                              name="dateTime"
                              value={editData.dateTime}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.dateTime}</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                          {editableRow === announcement ? (
                            <TextField
                              name="deadline"
                              value={editData.deadline}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.deadline}</Typography>
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                          {editableRow === announcement ? (
                            <TextField
                              name="subject"
                              value={editData.subject}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            <>
                              {announcement.subject}
                              <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "11px", color: "#555", fontWeight: "bold", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>{announcement.regarding}</Typography>
                            </>
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "12px" : "14px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                          {editableRow === announcement ? (
                            <TextField
                              name="announcement"
                              value={editData.announcement}
                              onChange={handleChange}
                              fullWidth
                            />
                          ) : (
                            announcement.announcement
                          )}
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: "13px", fontWeight: "bold", width: "12.5%", textAlign: "center", fontFamily: "Bricolage Grotesque" }}>
                          <Box display="flex" justifyContent="center" gap={-6}>
                            {(announcement.viewedby || []).map((image, index) => (
                              <Avatar key={index} src={image} alt={`Image ${index + 1}`} sx={{ width: 23, height: 30 }} />
                            ))}
                          </Box>
                        </TableCell>
                       
                        <TableCell sx={{ width: "12.5%", textAlign: "center" }}>
                          <IconButton
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
  );
};

export default Announcement1;