
import MapCard from "../components/MapCard";
import NavbarMain from "../components/Navbarmain";

import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Card,
  Container,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import LocationOnIcon from "@mui/icons-material/LocationOn";


const Dashboard = () => {
  const [reports, setReports] = useState([]);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const handleDriverClick = (driverId) => {
    setSelectedDriverId(driverId); // Update state when a driver is clicked
};
  // Fetch reports from API
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/reports") // Replace with your actual API URL
      .then((response) => setReports(response.data))
      .catch((error) => console.error("Error fetching reports:", error));
  }, []);
  
  
  const handlePrint = (driverId) => {
    const printableElement = document.querySelector(`.printable-worker-${driverId}`).cloneNode(true);
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Driver Report</title>
          <style>
            body { font-family: Arial, sans-serif; background: #fff; color: #000; }
            .print-container { border: 2px solid #800080; padding: 20px; border-radius: 10px; }
            table { width: 100%; border-collapse: collapse; margin-top: 10px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #fbc058; color: #fff; font-weight: bold; }
          </style>
        </head>
        <body>
          <div class="print-container">
            ${printableElement.innerHTML}
          </div>
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
          title: "Driver Report Dashboard",
          text: "Check out this driver report dashboard!",
          url: window.location.href,
        });
      } else {
        alert("Sharing is not supported in your browser.");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const workers = [
    { driverId: 1, name: "Worker Name", number: "Worker Number", location: "Lc Ind, Tirunelveli-Pin code", login: "10:00 AM", logout: "6:00 PM", available: true, details: true },
    { id: 2, name: "john", number: "Worker Number", location: "Lc Ind, Tirunelveli-Pin code", login: "10:00 AM", logout: "6:00 PM", available: true, details: true },
    { id: 3, name: "smith", number: "Worker Number", location: "Lc Ind, Tirunelveli-Pin code", login: "10:00 AM", logout: "6:00 PM", available: true, details: true },
    { id: 4, name: "faf", number: "Worker Number", location: "Lc Ind, Tirunelveli-Pin code", login: "10:00 AM", logout: "6:00 PM", available: true, details: true },
    { id: 5, name: "du-plesis", number: "Worker Number", location: "Lc Ind, Tirunelveli-Pin code", login: "10:00 AM", logout: "6:00 PM", available: false },
   
  ];
  

  // Group reports by driverId
  const groupedReports = reports.reduce((acc, report) => {
    acc[report.driverId] = acc[report.driverId] || [];
    acc[report.driverId].push(report);
    return acc;
  }, {});

  return (
   
    <Container maxWidth="xl" sx={{ marginTop: 1, position: "relative" }}>
          <NavbarMain/>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} className="no-print">
        <MapCard driverId={selectedDriverId} />
        </Grid>
        <Grid item md={6}>
          <Card
            sx={{
              width: "95%",
              height: "80vh",
              padding: 2,
              border: "2px solid #800080",
              borderRadius: "25px",
              overflow: "auto",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingX: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold", color: "purple", fontFamily: "caladea" }}>
                Driver Reports
              </Typography>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button variant="contained" sx={{ backgroundColor: "#940a91", borderRadius: "10px" }} startIcon={<PrintIcon />} onClick={handlePrint}>
                  Print
                </Button>
                <Button variant="contained" sx={{ backgroundColor: "#940a91", borderRadius: "10px" }} startIcon={<ShareIcon />} onClick={handleShare}>
                  Share
                </Button>
              </Box>
            </Box>
            
            {workers.map((worker) => (
  worker.available && (
    
    <Accordion
    key={worker.id}
    sx={{
      m: 1,
      background: "#800080",
      color: "#fff",
      borderRadius: "10px",
      textAlign: "center",
      alignItems: "center",
      zIndex: 1303,
      position: "relative",
      overflow: "visible",
    }}
  >
       
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ /* styling */ }} />}>
        <Typography>{worker.name}</Typography>
      </AccordionSummary>
      {worker.details && (
        <AccordionDetails>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Time</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Report</TableCell>
                  <TableCell>State</TableCell>
                  <TableCell>Verified</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.filter(report => report.driverId === worker.id).length > 0 ? (
                  reports.filter(report => report.driverId === worker.id).map((report, index) => (
                    <TableRow key={index}>
                      <TableCell>{report.time}</TableCell>
                      <TableCell>{report.detail}</TableCell>
                      <TableCell>{report.regarding}</TableCell>
                      <TableCell>{report.state}</TableCell>
                      <TableCell>{report.verified ? "✅" : "❌"}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                     No Reports are 
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </AccordionDetails>
      )}
    </Accordion>
  )
))}  

        
            {Object.entries(groupedReports).map(([driverId, driverReports]) => (
              <Accordion key={driverId}
              onClick={() => handleDriverClick(driverId)}  sx={{
                m: 1,
                background: "#800080",
                color: "#fff",
                borderRadius: "10px",
                textAlign: "center",
                alignItems: "center",
                zIndex: 1303,
                position: "relative",
                overflow: "visible",
              }}
            >
                
  
  
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>{driverId}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Location</TableCell>
                          <TableCell>Report</TableCell>
                          <TableCell>State</TableCell>
                          <TableCell>Verified</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {driverReports.map((report, index) => (
                          <TableRow key={index}>
                            <TableCell>{new Date(report.createdAt).toLocaleString()}</TableCell>
                            <TableCell>{report.detail}</TableCell>
                            <TableCell>{report.regarding}</TableCell>
                            <TableCell>{report.state}</TableCell>
                            <TableCell>{report.verified ? "✅" : "❌"}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            ))}
              


              <Typography variant="h5" sx={{ fontWeight: "bold", mt: -1, color: "purple", marginTop: 1, textAlign: "left", fontFamily: "caladea" }}>
                UNAVAILABLE
              </Typography>
              {workers
                .filter((worker) => !worker.available)
                .map((worker) => (
                  <Accordion key={worker.id} sx={{ m: 3, mt: 1, background: "#fbc058", color: "black", borderRadius: "6px", boxShadow: "none" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: "#fbc058", backgroundColor: "purple", borderRadius: "10px", fontSize: "40px" }} />}>
                      <Typography sx={{ fontWeight: "bold", fontSize: 20, width: "160px", marginLeft: 3, alignItems: "center", mt: 1, fontFamily: "caladea" }}>{worker.name}</Typography>
                      <Typography sx={{ marginLeft: 1, fontSize: 12, width: "110px", mt: 1.5, fontFamily: "caladea" }}>({worker.number})</Typography>
                      <span style={{ marginLeft: "155px" }}>
                        <Typography sx={{ fontSize: 11, ml: -12, fontFamily: "caladea" }}>Login: {worker.login} | Logout: {worker.logout}</Typography>
                        <span style={{ display: "flex", marginLeft: "80px" }}>
                          <LocationOnIcon sx={{ fontSize: 11, marginTop: 0.3, ml: -20 }} />
                          <Typography sx={{ fontSize: 11, textAlign: "left", fontFamily: "caladea" }}>{worker.location}</Typography>
                        </span>
                      </span>
                    </AccordionSummary>
                  </Accordion>
                ))}
            </Card>
          </Grid>
        </Grid>
      </Container>

  );
};

export default Dashboard;