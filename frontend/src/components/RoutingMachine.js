import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-routing-machine";

const RoutingMachine = () => {
  const map = useMap();
  const [routingControl, setRoutingControl] = useState(null);

  useEffect(() => {
    if (!map) return;

    // Remove existing routing control before adding a new one
    if (routingControl) {
      map.removeControl(routingControl);
    }

    // Create new routing control
    const newRoutingControl = L.Routing.control({
      waypoints: [
        L.latLng(...positionChennai),
        L.latLng(...positionBangalore)
      ],
      lineOptions: {
        styles: [{ color: "#800080", weight: 5 }]
      },
      routeWhileDragging: true
    }).addTo(map);

    setRoutingControl(newRoutingControl);

    return () => {
      // Safely remove routing control to prevent errors
      if (map && newRoutingControl) {
        try {
          map.removeControl(newRoutingControl);
        } catch (error) {
          console.error("Error removing routing control:", error);
        }
      }
    };
  }, [map]);

  return null;
};

