import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import L from "leaflet";
import io from "socket.io-client";
import "leaflet/dist/leaflet.css";


// Custom marker icon
const driverIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/684/684908.png", // Example car icon
  iconSize: [30, 30],
  iconAnchor: [15, 30],
  popupAnchor: [0, -30],
});

const socket = io("https://aizel-lyaq.onrender.com"); // Update with your backend URL

const MapCard = ({ driverId }) => {
  const [driverLocation, setDriverLocation] = useState(null);
  const [totalDistance, setTotalDistance] = useState(0);
  const [address, setAddress] = useState("Fetching address...");
  const mapRef = useRef(null);

  const position = [40.7128, -74.006]; 
  const homePosition = [40.7128, -74.010];
  const shopPosition = [40.7178, -74.002];
  const route = [homePosition, [40.7148, -74.008], [40.7158, -74.005], shopPosition];
  const [timestamp, setTimestamp] = useState(new Date());
  // Fetch address from coordinates
  const getAddress = async (lat, long) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${long}`
      );
      const data = await response.json();
      return data.display_name || "Address not found";
    } catch (error) {
      console.error("Error fetching address:", error);
      return "Address not available";
    }
  };

  useEffect(() => {
  

    // Listen for location updates
    socket.on("locationUpdate", async (drivers) => {
      if (drivers.hasOwnProperty(driverId)) {
        const { lat, long, totalDistance } = drivers[driverId];

        setDriverLocation([lat, long]);
        setTotalDistance(totalDistance || 0);

        const fetchedAddress = await getAddress(lat, long);
        setAddress(fetchedAddress);

        // Move the map to the new location
        if (mapRef.current) {
          mapRef.current.setView([lat, long], 15);
        }
      } else {
        alert(`Driver is not logged in or not sharing their location.`);
      }
    });

    return () => socket.off("locationUpdate"); // Cleanup listener
  }, [driverId]);

  
  
const homeIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/25/25694.png",
  iconSize: [40, 40],
});

const shopIcon = new L.Icon({
  iconUrl:"https://cdn-icons-png.flaticon.com/512/79/79467.png",
  iconSize: [40, 40],
});



const getFormattedTimestamp = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const day = days[timestamp.getDay()];
  const month = months[timestamp.getMonth()];
  const date = timestamp.getDate();
  const hours = timestamp.getHours();
  const minutes = timestamp.getMinutes();
  const seconds = timestamp.getSeconds();

  const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return `${day}, ${month} ${date} ${formattedTime}`;
};

useEffect(() => {
  const interval = setInterval(() => {
    setTimestamp(new Date());
  }, 1000);

  return () => clearInterval(interval);
}, []);

  return (
    <Card sx={{ width: "100%", height: "85vh", padding: 2 ,border:"2px",mt:-2}}>
      <CardContent>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="body2" sx={{ textAlign: "left", mt: -2, fontSize: 20, fontWeight: "bold" ,fontFamily:"caladea"}}>
            Today's Progress
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "right", mt: -2, fontSize: 20, fontWeight: "bold",fontFamily:"calasea" }}>
            {getFormattedTimestamp()}
          </Typography>
        </div>

        <Grid container spacing={2} sx={{ marginTop: 2 }}>
          <Grid item xs={6}>
            <Card sx={{ backgroundColor: "#940a91", color: "#fff", padding: 2, mt: -2, borderRadius: 5 ,}}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', flexDirection: "column" }}>
                  <Typography variant="h6" style={{ textAlign: "left", fontFamily: "caladea" }}>
                    Available Workers
                  </Typography>
                  <Typography variant="h5" style={{ textAlign: "left" }}>235</Typography>
                </span>
                <span style={{ display: 'flex', flexDirection: "column" }}>
                  <TrendingUpIcon style={{ fontSize: "46px" }} />
                  <Typography variant="body2">200 Active</Typography>
                </span>
              </span>
            </Card>
          </Grid>

          <Grid item md={6}>
            <Card sx={{ backgroundColor: "#fbc058", color: "#fff", padding: 2, mt: -2, borderRadius: 5 }}>
              <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'flex', flexDirection: "column" }}>
                  <Typography variant="h6" style={{ textAlign: "left", fontFamily: "caladea", color: "#940a91" }}>
                    Unavailable Workers
                  </Typography>
                  <Typography variant="h5" style={{ textAlign: "left", color: "#940a91" }}>35</Typography>
                </span>
                <span style={{ display: 'flex', flexDirection: "column" }}>
                  <TrendingDownIcon style={{ fontSize: "46px", color: "#940a91" }} />
                  <Typography variant="body2" style={{ color: "#940a91" }}>35 Stable</Typography>
                </span>
              </span>
            </Card>
          </Grid>
        </Grid>

        
    <MapContainer
      center={[12.9716, 77.5946]}
      zoom={6}
      style={{ width: "100%", height: "40vh", pointerEvents: "auto" }}

      whenCreated={(map) => (mapRef.current = map)}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {driverLocation && (
        <Marker position={driverLocation} icon={driverIcon}>
          <Popup>
            <strong>Driver ID:</strong> {driverId} <br />
            <strong>Distance Covered:</strong> {totalDistance.toFixed(2)} km <br />
            <strong>Location:</strong> {address}
          </Popup>
        </Marker>
      )}
    </MapContainer>
 



        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
          <Typography variant="h6" sx={{ textAlign: "left", mt: 2 }}>Announcement</Typography>
          <Typography variant="body2" sx={{ textAlign: "right", mt: 3 }}>Viewed By: 4 Members</Typography>
        </div>

        <Card sx={{ backgroundColor: "#800080", color: "#fff", padding: 2, marginTop: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ textAlign: "left" }}>HR Manager</Typography>
            <div>
              <span 
                style={{ 
                  backgroundColor: "#fbc058", 
                  padding: "8px", 
                  borderRadius: "8px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer", 
                  marginRight: "8px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",marginTop:"-30px",height:15,width:20
                }}
              >
                <EditOutlinedIcon style={{ color: "#800080" }} />
              </span>
              <span 
                style={{ 
                  backgroundColor: "#fbc058", 
                  padding: "8px", 
                  borderRadius: "8px", 
                  display: "inline-flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",marginTop:"-30px",height:15,width:20
                }}
              >
                <DeleteIcon style={{ color: "#940a91", }} />
              </span>
            </div>
          </div>
          <Typography variant="body2" style={{ textAlign: "left", marginTop: "8px" }}>
            Lorem ipsum dolor sit amet, consectetur? Lorem ipsum dolor sit amet, <br /> consectetur?
          </Typography>
        </Card>
      </CardContent>
    </Card>
  );
};

export default MapCard;
