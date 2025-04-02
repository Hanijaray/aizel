
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = () => {
  const position = [10.7905, 78.7047];

  return (
    <div className="flex justify-center items-center ">
      <div 
        className="h-[140px] w-[500px] sm:h-[200px] sm:w-[300px] md:h-[250px] md:w-[350px] 
        lg:h-[300px] lg:w-[700px] rounded-xl shadow-lg border overflow-hidden"
        style={{ borderColor: "#950f95" }}>
        <MapContainer 
          center={position} 
          zoom={13} 
          scrollWheelZoom={false} 
          className="h-full w-full border-1 border-pink position-relative  ">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>Your Current Location</Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default Map;

