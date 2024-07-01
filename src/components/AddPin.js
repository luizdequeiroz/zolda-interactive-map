// src/components/AddPin.js
import { useMapEvents } from 'react-leaflet';

function AddPin({ pins, setPins }) {
  useMapEvents({
    contextmenu(e) {
      const newPin = [e.latlng.lat, e.latlng.lng];
      setPins([...pins, newPin]);
    }
  });

  return null;
}

export default AddPin;
