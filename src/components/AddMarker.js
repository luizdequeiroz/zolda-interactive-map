// src/components/AddMarker.js
import React from 'react';
import { useMapEvents } from 'react-leaflet';

function AddMarker({ markers, setMarkers }) {
  useMapEvents({
    click(e) {
      const newMarker = [e.latlng.lat, e.latlng.lng];
      setMarkers([...markers, newMarker]);
    }
  });

  return null;
}

export default AddMarker;
