import React, { useState, useRef, useEffect } from "react";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Header from "../components/Header";
import Workers1 from "./Workers1";
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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import moment from "moment";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import favicon from '../assets/favicon.png';

const reportData = [
  { id: 101, name: "Anu", date: "Dec 2 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start :"23457Km", end: "434567Km", totalKm: 20 },
  { id: 102, name: "Zian", date: "Jan 10 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start:"23458Km", end: "63456Km", totalKm: 50 },
  { id: 103, name: "Alice", date: "Feb 22 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start:" 23457Km", end: "73456Km", totalKm: 70 },
  { id: 104, name: "Bob", date: "Mar 10 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start:" 23453Km", end: "83456Km", totalKm: 20 },
  { id: 105, name: "Charie", date: "Apr 30 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start :"23453Km", end: "23456Km", totalKm: 50 },
  { id: 106, name: "Diana", date: "May 7 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start:" 23455Km", end: "43456Km", totalKm: 70 },
  { id: 107, name: "Evit", date: "Jun 9 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start :"23450Km", end: "23456Km", totalKm: 20 },
  { id: 108, name: "Nion", date: "Jul 11 2024", login: "08:00am", logout: "06:00pm", TotalHours: 20, Start:" 23456Km", end: "63456Km", totalKm: 50 },
  { id: 109, name: "Levin", date: "Aug 17 2025", login: "08:00am", logout: "06:00pm", TotalHours: 20,  Start: "23450Km", end: "83456Km", totalKm: 70 },
];
const Workers = () => {
  const [currentTime, setCurrentTime] = useState(moment());
  const [selectedMonth, setSelectedMonth] = useState(""); 
  const [selectedDate, setSelectedDate] = useState(null); 
  const [searchTerm, setSearchTerm] = useState(""); 
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRow, setSelectedRow] = useState(2);
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

  const handleViewButtonClick = (row) => {
    setSelectedRow(row); 
  };

  const months = [
    "01", "02", "03", "04", "05", "06", 
    "07", "08", "09", "10", "11", "12"
  ];
  const filteredData = filteredRecords.filter((row) => {
    const rowMonth = moment(row.date, "MMM DD YYYY").format("MM");
    const matchesMonth = selectedMonth ? rowMonth === selectedMonth : true;
    const matchesName = searchTerm ? row.name.toLowerCase().includes(searchTerm.toLowerCase()) : true;
    const matchesId = searchTerm ? row.id.toString().includes(searchTerm) : true;
    const matchesDate = selectedDate ? moment(row.date, "MMM DD YYYY").isSame(moment(selectedDate, "MMM DD YYYY")) : true;
    return matchesMonth && (matchesName || matchesId) && matchesDate;
  });

  return (
    <div style={{ overflow: isDesktop ? "hidden" : "auto", height: isDesktop ? "100vh" : "auto" }}>
      <Header />
      <Grid container spacing={1} style={{ marginTop: -1, padding: 10 }}>
        <Grid item xs={12} md={9}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" style={{ marginLeft: "20px", fontFamily: "Bricolage Grotesque" }}>
              Today's Report
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
          <Card sx={{height:"78vh"}}>
            <CardContent>
              <Grid container spacing={1} alignItems="center" marginTop={-1}>
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
                   <Button
                     variant="contained"
                     color="primary"
                     size="small"
                     style={{ borderRadius: "9px", height: "43px", backgroundColor: "purple", color: "white", fontSize: 20, fontWeight: "bold", textTransform: "capitalize", border: "1px solid black", fontFamily: "caladea" }}
                     fullWidth
                     onClick={handleViewHistoryClick}
                   >
                     View History
                   </Button>
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
                      style={{ display:"flex",width: "0px",height:"0px",backgroundColor:"orange",border:"none" }}
                      onChange={handleDateChange}
                    />
                  </Button>
                </Grid>
              </Grid>

              <TableContainer 
                component={Paper} 
                style={{ 
                  marginTop: 12, 
                  overflow: "hidden", 
                  width: "100%", 
                  maxHeight: isDesktop ? "auto" : "none", 
                }}
              >
                <Table 
                  id="printable-table" 
                  size="small" 
                  style={{ 
                    width: "100%", 
                    tableLayout: "fixed", 
                  }}
                >
                  <TableHead>
                    <TableRow sx={{ height: "50px", backgroundColor: "purple", color: "red" }}>
                      <TableCell sx={{fontSize: isMobile ? "8px" : "13px", padding: "4px", color: "white", width: "12.5%",textAlign:"center" }}>Name & ID</TableCell>
                      <TableCell sx={{fontSize: isMobile ? "8px" : "13px", padding: "4px", color: "white", width: "12.5%" ,textAlign:"center"}}>Date & Time</TableCell>
                      <TableCell sx={{fontSize: isMobile ? "8px" : "13px", padding: "4px", color: "white", width: "12.5%",textAlign:"center" }}>Login Time</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "8px" : "13px",padding: "4px", color: "white", width: "12.5%" ,textAlign:"center"}}>TotalHours</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "8px" : "13px",padding: "4px", color: "white", width: "12.5%",textAlign:"center" }}>Working Km</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "8px" : "13px",padding: "4px", color: "white", width: "12.5%",textAlign:"center" }}>Total Km</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "8px" : "13px",padding: "4px", color: "white", width: "12.5%" ,textAlign:"center"}}>Work Report</TableCell>
                      <TableCell sx={{ fontSize: isMobile ? "8px" : "13px",padding: "4px", color: "white", width: "12.5%" ,textAlign:"center"}}>View</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredData.map((row) => (
                      <TableRow key={row.id} sx={{ height: "46px", overflow: "auto" }}>
                        <TableCell sx={{ padding: "4px", fontWeight: "bold", width: "12.5%" }}>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold" ,textAlign:"center"}}>{row.name}</Typography>
                          <Typography variant="body2" sx={{fontSize: isMobile ? "8px" : "13px", color: "#555", fontWeight: "bold",textAlign:"center" }}>ID: {row.id}</Typography>
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%",textAlign:"center" }}>{row.date}</TableCell>
                        <TableCell sx={{ padding: "4px",fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%" ,textAlign:"center"}}>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold" ,textAlign:"center"}}>Login: {row.login}</Typography>
                          <Typography variant="body2" sx={{fontSize: isMobile ? "8px" : "11px", color: "#555", fontWeight: "bold" ,textAlign:"center"}}>Logout: {row.logout}</Typography>
                        </TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%" ,textAlign:"center"}}>{row.TotalHours}</TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "11px", fontWeight: "bold", width: "12.5%" ,textAlign:"center"}}>start:{row.Start} <div style={{ fontSize: '11px', color: '#555' }}>end:{row.end}</div></TableCell>
                        <TableCell sx={{ padding: "4px", fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%",textAlign:"center" }}>{row.totalKm}</TableCell>

                        <TableCell sx={{ padding: "4px",fontSize: isMobile ? "8px" : "13px", fontWeight: "bold", width: "12.5%",textAlign:"center" }}>
                          <Typography variant="body2" sx={{ fontSize: isMobile ? "8px" : "13px", fontWeight: "bold" ,textAlign:"center"}}>Report Subject</Typography>
                          
                          <Typography variant="body2" sx={{fontSize: isMobile ? "8px" : "13px", color: "#555", fontWeight: "bold" ,textAlign:"center"}}>Report State</Typography>
                        </TableCell>
                        <TableCell sx={{ width: "12.5%" ,textAlign:"center"}}>
                          <IconButton 
                            sx={{ background: "orange", width: "25px", height: "25px", borderRadius: "5px",textAlign:"center" ,"&:hover": { backgroundColor: "black" } }}
                            onClick={() => handleViewButtonClick(row)} 
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
        <Grid item xs={12} md={3}>
          <Workers1 selectedRow={selectedRow} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Workers;