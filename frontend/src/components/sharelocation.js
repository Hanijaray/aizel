import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://aizel-lyaq.onrender.com"); // Ensure the Node.js server is running

const DriverLocationTracker = () => {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const driverId = urlParams.get("id");
  const [totalDistance, setTotalDistance] = useState(
    parseFloat(localStorage.getItem(`totalDistance_${driverId}`)) || 0
  );
  const [previousPosition, setPreviousPosition] = useState(null);

  useEffect(() => {
    if (!driverId) {
      alert("Driver ID is missing in the URL.");
      navigate("/login");
      return;
    }

    const updateLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const long = position.coords.longitude;

          if (previousPosition) {
            const distance = calculateDistance(
              previousPosition.lat,
              previousPosition.long,
              lat,
              long
            );
            setTotalDistance((prevDistance) => {
              const newDistance = prevDistance + distance;
              localStorage.setItem(`totalDistance_${driverId}`, newDistance);
              return newDistance;
            });
          }

          setPreviousPosition({ lat, long });

          socket.emit("updateLocation", { driverId, lat, long, totalDistance });
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    };

    const interval = setInterval(updateLocation, 5000);
    return () => clearInterval(interval);
  }, [driverId, previousPosition, navigate]);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const stopTracking = () => {
    localStorage.removeItem(`totalDistance_${driverId}`);
    navigate("/login");
  };

  return (
    <div style={styles.container}>
      <div style={styles.messageBox}>
        <h1>Driver Location Tracker</h1>
        <p>Currently you are sharing your location... (Don't leave this page while sharing)</p>
        <button onClick={stopTracking} style={styles.backButton}>Stop</button>
        <div id="distance-info" style={styles.distanceInfo}>
          Distance Covered: {totalDistance.toFixed(2)} km ({(totalDistance * 1000).toFixed(0)} m)
        </div>
        <a id="report-link"
   href={`/report?driver_id=${encodeURIComponent(driverId)}&lat=${previousPosition?.lat}&long=${previousPosition?.long}`}
   style={styles.reportLink}>
   Submit Report
</a>


      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  messageBox: {
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "8px",
    padding: "20px",
    textAlign: "center",
    width: "90%",
    maxWidth: "400px",
    marginBottom: "20px",
  },
  backButton: {
    display: "inline-block",
    backgroundColor: "#f53333",
    color: "#fff",
    padding: "10px 20px",
    textDecoration: "none",
    borderRadius: "5px",
    fontSize: "1em",
    transition: "background-color 0.3s",
    cursor: "pointer",
    border: "none",
  },
  distanceInfo: {
    fontSize: "1.1em",
    marginTop: "10px",
    color: "#333",
  },
  reportLink: {
    marginTop: "15px",
    color: "#007bff",
    textDecoration: "none",
    fontSize: "1em",
  },
};

export default DriverLocationTracker;
