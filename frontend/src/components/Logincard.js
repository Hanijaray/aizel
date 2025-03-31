import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const socket = io("https://aizel-lyaq.onrender.com");

 function Logincard() {
  const [showFifthPopup, setShowFifthPopup] = useState(false);
  const [showSixPopup, setShowSixPopup] = useState(false);
  const [showSevenPopup, setShowSevenPopup] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
 
  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch("https://aizel-lyaq.onrender.com/api/drivers/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ employeeId, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setErrorMessage(errorData.message);
        return;
      }

      const data = await response.json();

      // Close the popup and show profile card on successful login
      setShowSixPopup(false);
      setShowProfileCard(true);

      // Redirect to share location page with employeeId in URL
      navigate(`/sharelocation?id=${data.employeeId}`);
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };
  
  const urlParams = new URLSearchParams(window.location.search);
  const driverId = urlParams.get("id");
  const [totalDistance, setTotalDistance] = useState(
    parseFloat(localStorage.getItem(`totalDistance_${driverId}`)) || 0
  );
  const [previousPosition, setPreviousPosition] = useState(null);

  useEffect(() => {
    if (!driverId) {
      alert("Driver ID is missing in the URL.");
      navigate("/category");
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
    <div>
     
      {!showProfileCard ? (
        <div
          className="hidden sm:flex w-full p-3 rounded-lg shadow-lg flex-row justify-between
           items-center h-auto sm:h-64 md:h-80 lg:h-55 bg-[#950f95]" id="card7">
          <div className="w-full sm:w-2/3 text-left ms-5">
            <span className="text-lg font-bold sm:text-xl md:text-2xl lg:text-4xl text-white font-caladea">
              Login here,To start your<br /> Marketing journey
            </span>
            <p className="text-sm sm:text-md text-white mt-1">
              Turn on your location to log in and get<br /> started with your daily work Buddy!!!
            </p>
            <button
              className="bg-yellow-400 text-sm rounded-2xl px-3 py-2 text-black mt-5"
              onClick={() => setShowSixPopup(true)}>Get Started
            </button>
          </div>
          <div className="w-full sm:w-1/3 flex justify-end sm:justify-center mt-20">
            <img src="./Images/bike3.png" alt="bike3"className="h-20 w-20 sm:h-40 sm:w-40 sm:mb-20" />
          </div>
        </div>
      ) : (
        // Profile Card (After Login)
        <div
          id="profilecard"
          className="hidden sm:flex w-full p-3 rounded-lg shadow-lg flex-row justify-between 
          items-center h-auto sm:h-64 md:h-80 lg:h-55 bg-[#950f95]">
          <div className="w-full sm:w-2/3 text-left ms-5">
            <span className="text-lg font-bold sm:text-xl md:text-2xl lg:text-4xl text-white font-caladea">
              Your Marketing<br /> Journey Starts Here
            </span>
            <p className="text-sm sm:text-md text-white mt-1">
              Keep your location on untill you log out <br></br>of your Daily Work Buddy!!! 
            </p>
            <button className="bg-yellow-400 text-sm rounded-2xl px-3 py-2 text-black mt-5 
            font-bricolage font-bold"  onClick={() => setShowSevenPopup(true)}>
              Let's Leave
            </button>
          </div>
          <div className="w-full sm:w-1/3 flex justify-end sm:justify-center mt-20">
            <img src="./Images/bike4.png" className="h-20 w-20 sm:h-40 sm:w-40 sm:mb-20" />
          </div>
        </div>
      )}

      {/* Popup 1 */}
      {showFifthPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg w-85 max-w-full mx-4 text-center">
            <img src="./Images/bike11.jpeg" className="lg:h-50 lg:w-50 h-30 w-30 lg:ms-10 ms-20" />
            <span className="font-bold text-center text-md lg:text-xl font-caladea">TURN ON YOUR</span>
            <br />
            <span className="font-bold lg:text-5xl text-4xl font-caladea">LOCATION</span>
            <br />
            <span className="text-sm font-caladea">To Login to your daily Aziel Tracking Account</span>
            <button
              className="mt-4 bg-[#ffb200] text-black px-3 py-2 rounded-lg w-full font-bold font-caladea"
              onClick={() => {
                setShowFifthPopup(false);
                setShowSixPopup(true);
              }}>
              TURN ON LOCATION
            </button>
            <button
              className="mt-4 bg-gray-300 text-black px-3 py-2 rounded-lg w-full font-bold font-caladea"
              onClick={() => setShowFifthPopup(false)}
            >
              CANCEL
            </button>
          </div>
        </div>
      )}

      {/* Popup 2 */}
      {showSixPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg w-85 max-w-full mx-4">
            <div className="flex">
              <div className="ms-6">
                <h2 className="mt-7 lg:text-md text-sm font-bold">To Get Started</h2>
                <span className="font-bold font-caladea lg:text-5xl text-4xl">LOGIN</span>
              </div>
              <div>
                <img src="./Images/bike2.png" className="h-30 w-35" />
              </div>
            </div>
            <div className="text-center">
      <span className="lg:text-sm text-xs font-caladea text-center">
        Complete this form to log in to your account!
      </span>
      <form onSubmit={handleSubmit}>
        <div className="lg:mt-4 mt-2 text-bricolage">
          <select className="w-full border border-gray-200 rounded-md p-2 mt-1 font-bold font-bricolage">
            <option>Available</option>
          </select>
        </div>
        <div className="lg:mt-3 mt-2">
          <input
            type="text"
            placeholder="Enter Driver ID"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 placeholder-black font-bold font-bricolage"
          />
        </div>
        <div className="lg:mt-3 mt-2">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-md p-2 mt-1 placeholder-black font-bold font-bricolage"
          />
        </div>
        <div className="lg:mt-3 mt-2 flex items-center border border-gray-300 rounded-md">
          <input
            type="text"
            placeholder="Fix your Login Time"
            className="w-full p-2 placeholder-black font-bold font-bricolage outline-none"
          />
          <button
            type="button"
            className="bg-black text-white px-4 py-1 w-50 mr-1 rounded-md font-caladea"
          >
            FIX TIME
          </button>
        </div>
        <div className="lg:mt-4 mt-2 flex gap-3 font-caladea">
          <button
            type="submit"
            className="bg-yellow-500 text-black px-4 py-2 w-50 rounded-md font-bold"
          >
            LOGIN
          </button>
          <button
            type="button"
            className="bg-black text-white px-4 py-2 w-40 rounded-md font-bold"
            onClick={() => setShowSixPopup(false)}
          >
            CANCEL
          </button>
        </div>
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </form>
    
  

            </div>
          </div>
        </div>
      )}
      
      {/* Popup 3 */}
{showSevenPopup && (
        <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-50">
          <div className="bg-white p-3 rounded-lg shadow-lg w-85 max-w-full mx-4">
            <div className="flex">
              <div className="ms-6">
                <h2 className="mt-7 lg:text-md text-sm font-bold">To Get Off</h2>
                <span className="font-bold font-caladea lg:text-5xl text-4xl">LOGOUT</span>
              </div>
              <div>
                <img src="./Images/aizel.png" className="h-30 w-35" />
              </div>
            </div>
            <div className="text-center">
              <span className="lg:text-sm text-xs font-caladea text-center">
                Complete this form to logout from your account!
              </span>
             
              <div className="lg:mt-3 mt-2">
                <input
                  type="text"
                  placeholder="Enter Logout Km"
                  className="w-full border border-gray-300 rounded-md p-2 mt-1 placeholder-black font-bold font-bricolage"
                />
              </div>
              <div className="lg:mt-3 mt-2 flex items-center border border-gray-300 rounded-md">
                <input
                  type="text"
                  placeholder="Fix your Logout Time"
                  className="w-full p-2 placeholder-black font-bold font-bricolage outline-none"/>
                <button className="bg-black text-white px-4 py-1 w-40 mr-1 rounded-md font-caladea">FIX TIME</button>
              </div>
            </div>
            <div className="lg:mt-4 mt-2 flex gap-3 font-caladea">
           
              <button
  className="bg-yellow-500 text-black px-4 py-2 w-40 rounded-md font-bold"  
  onClick={() => {
    setShowSevenPopup(false);
    setShowProfileCard(false); 
  }}>
  LOGOUT
</button>

              <button
                className="bg-black text-white px-4 py-2 w-40 rounded-md font-bold"
                onClick={() => setShowSevenPopup(false)}>CANCEL
              </button>
            </div>
          </div>
        </div>
      )}

     <div className="sm:hidden w-full p-4 rounded-lg shadow-lg flex justify-between bg-[#950f95]">
  {!showProfileCard ? (
    <div>
      <span className="text-xl font-bold font-source-serif text-white">
        Login here,To Start your<br /> Marketing journey
      </span>
      <p className="text-xs text-white">
        Turn on your location to log in and get<br/> started with your Daily Work Buddy!!!
      </p>
      <button
        className="bg-yellow-400 font-sans text-xs rounded-2xl px-3 py-2 mt-2 text-black"
        onClick={() => setShowFifthPopup(true)}>
        Get Started
      </button>
    </div>
  ) : (
    <div>
      <span className="text-xl font-bold font-source-serif text-white">
        Your Marketing <br /> Journey Starts Here
      </span>
      <p className="text-xs text-white">
        Keep your location on until you log out <br /> of your Daily Work Buddy!!!
      </p>
      <button className="bg-yellow-400 font-sans text-xs rounded-2xl px-3 py-2 mt-2 text-black" 
      onClick={() => setShowSevenPopup(true)}>
        Let's Leave
      </button>
    </div>
  )}
  <img src="./Images/bike3.png" className="h-20 w-20 ml-5" />
</div>
</div>

  );
}
export default Logincard;