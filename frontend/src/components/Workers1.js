import React, { useState } from "react";
import { Container, Grid, Paper, Button, Box } from "@mui/material";
import PrintIcon from "@mui/icons-material/Print";
import ShareIcon from "@mui/icons-material/Share";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Typography } from "@mui/material";
import L from "leaflet";
import logo from '../assets/logo.png'
import 'typeface-cardo';
import "@fontsource/bricolage-grotesque";
import "@fontsource/source-serif-pro";

const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  iconSize: [40, 40],
});

const shopIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/79/79467.png",
  iconSize: [40, 40],
});

const Workers1 = ({ selectedRow }) => {
  const position = [40.7128, -74.006];
  const homePosition = [40.7128, -74.010];
  const shopPosition = [40.7178, -74.002];
  const route = [homePosition, [40.7148, -74.008], [40.7158, -74.005], shopPosition];
  const [timestamp, setTimestamp] = useState(new Date());

  const getFormattedTimestamp = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const day = days[timestamp.getDay()];
    const month = months[timestamp.getMonth()];
    const date = timestamp.getDate();
    const year = timestamp.getFullYear();
    const hours = timestamp.getHours();
    const minutes = timestamp.getMinutes();
    const seconds = timestamp.getSeconds();

    const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    return `${day}, ${month} ${date} ${year}`;
  };

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

  return (
    <Container maxWidth="sm" sx={{ mt: -0.5 }}>
      <Paper elevation={3} sx={{ p: 3, borderRadius: 3, border: "4px solid purple",height:"77vh" }}>
      <div style={{ display: 'flex', width: '100%',justifyContent:"center",marginTop:-13 }}>
      <img src={logo} alt="Logo" style={{ width: 20, marginLeft: "2px",height:25 }} />
        <Typography variant="h6" align="center"  style={{ marginTop: "-2px" ,fontFamily:"caladea", fontWeight:"bold"}}>
          Company Name
        </Typography></div>
        <Typography variant="subtitle1" align="center" style={{fontFamily:"bricolage-grotesque",fontSize:"11px"}}>
          Life Changers Ind
        </Typography>
        <Grid mt={2}>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Employee Name:{selectedRow.name}</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px",fontFamily:"bricolage-grotesque" }}>
              {getFormattedTimestamp()}
            </Typography>
          </span>
        </Grid>
        <hr />

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Employee ID:{selectedRow.id}</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px" ,fontFamily:"bricolage-grotesque"}}>Login Time:{selectedRow.login}</Typography>
          </span>
        </Grid>
        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Total Working Hour:{selectedRow.TotalHours}</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px",fontFamily:"bricolage-grotesque" }}>Logout Time:{selectedRow.logout}</Typography>
          </span>
        </Grid>
        <hr />

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Total Km:{selectedRow.totalKm}</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px" ,fontFamily:"bricolage-grotesque"}}>Starting Km:{selectedRow.Start}</Typography>
          </span>
        </Grid>

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left" ,fontFamily:"bricolage-grotesque"}}>(Km analyzed by the tracker)</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px" ,fontFamily:"bricolage-grotesque"}}>Ending Km:{selectedRow.end}</Typography>
          </span>
        </Grid>
        
        <div style={{backgroundColor:"#e8e8e8"}}>
          <hr/>
        <Typography fontWeight="bold" justifyContent="center" alignItems="centers" style={{fontFamily:"bricolage-grotesque",margin:-2}}>WORK REPORT</Typography>
        <hr/>
        </div>

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Regarding</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px" ,fontFamily:"bricolage-grotesque"}}>Subject:</Typography>
          </span>
        </Grid>

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Customer Type</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px" ,fontFamily:"bricolage-grotesque"}}>State:</Typography>
          </span>
        </Grid>

        <Grid>
          <span style={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Company Name</Typography>
            <Typography variant="body1" sx={{ textAlign: "right", fontSize: "12px",fontFamily:"bricolage-grotesque" }}>Image:</Typography>
          </span>
        </Grid>

        <Grid>
          <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left" ,fontFamily:"bricolage-grotesque"}}>Communicator Name:</Typography>
        </Grid>
        <Grid>
          <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left",fontFamily:"bricolage-grotesque" }}>Company Phone Number:</Typography>
        </Grid>
        <Grid>
          <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left" ,fontFamily:"bricolage-grotesque"}}>Pinned Location:</Typography>
        </Grid>
        <Grid>
          <Typography variant="body1" sx={{ fontSize: "12px", textAlign: "left" ,fontFamily:"bricolage-grotesque"}}>Detail Report:</Typography>
        </Grid>

        <MapContainer center={position} zoom={15} style={{ height: "150px", width: "100%", borderRadius: "10px", marginTop: "5px" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={homePosition} icon={homeIcon}>
            <Popup>
              <b>Home Location</b> <br />
              Latitude: {homePosition[0]} <br />
              Longitude: {homePosition[1]}
            </Popup>
          </Marker>
          <Marker position={shopPosition} icon={shopIcon}>
            <Popup>
              <b>Shop Location</b> <br />
              Latitude: {shopPosition[0]} <br />
              Longitude: {shopPosition[1]}
            </Popup>
          </Marker>
          <Polyline positions={route} color="red" weight={5} />
        </MapContainer>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center", 
            gap: 2, 
            mt: "15px",
          }}
        >
          <Button
            variant="contained"
            style={{ backgroundColor: "#940a91", borderRadius: "10px", textTransform: "capitalize",  }}
            startIcon={<PrintIcon />}
            onClick={handlePrint}
          >
            Print
          </Button>
          <Button
            variant="contained"
            style={{ backgroundColor: "#940a91", borderRadius: "10px", textTransform: "capitalize" }}
            startIcon={<ShareIcon />}
            onClick={handleShare}
          >
            Share
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Workers1;