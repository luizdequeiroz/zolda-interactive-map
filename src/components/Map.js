import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CRS, LatLngBounds, latLng } from 'leaflet';
import Search from './Search';
import AddMarker from './AddMarker';
import DistanceInfo from './DistanceInfo';
import InfoPanel from './InfoPanel';
import LayerControl from './LayerControl';
import { firstMarkerIcon, subsequentMarkerIcon } from './MarkerIcon';
import MarkerPanel from './MarkerPanel';
import AddPin from './AddPin';
import { pinIcon } from './PinIcon';

const center = [12.77, -36.37];
const bounds = new LatLngBounds(
  [-5.134475371454281, -79.50845859491564],
  [30.67883861843332, 6.762828376789505]
);

function calculateDistance(markerA, markerB) {
  if (!markerA || !markerB) return 0;
  const distanceInCoordinates = markerA.distanceTo(markerB);
  const kmPerCoordinateUnit = 0.0009942;
  return distanceInCoordinates * kmPerCoordinateUnit;
}

function calculateTime(distance, speed) {
  const time = distance / speed;
  const totalTime = time + 0.02;
  const days = Math.floor(totalTime / 24);
  const hours = Math.floor(totalTime % 24);
  const minutes = Math.floor((totalTime % 1) * 60);
  return { days, hours, minutes };
}

function Map() {
  const [markers, setMarkers] = useState([]);
  const [pins, setPins] = useState([]);
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(4.17);
  const [travelTime, setTravelTime] = useState({ days: 0, hours: 0, minutes: 0 });
  const [popupInfo, setPopupInfo] = useState(null);
  const [activeMarker, setActiveMarker] = useState(null);
  const [activePin, setActivePin] = useState(null);
  const [markerData, setMarkerData] = useState({});
  const [pinData, setPinData] = useState({});
  const mapRef = useRef();

  useEffect(() => {
    if (markers.length > 1) {
      const totalDistance = markers.reduce((acc, marker, idx, arr) => {
        if (idx === 0) return acc;
        const prevMarker = latLng(arr[idx - 1].lat, arr[idx - 1].lng);
        const currentMarker = latLng(marker.lat, marker.lng);
        return acc + calculateDistance(prevMarker, currentMarker);
      }, 0);
      setDistance(totalDistance);
      setTravelTime(calculateTime(totalDistance, speed));
    } else {
      setDistance(0);
      setTravelTime({ days: 0, hours: 0, minutes: 0 });
    }
  }, [markers, speed]);

  const setCenter = (center) => {
    if (mapRef.current) {
      const map = mapRef.current;
      map.setView(center, 6);
    }
  };

  const handleRightClick = (id) => {
    setMarkers((prevMarkers) => prevMarkers.filter(marker => marker.id !== id));
    setMarkerData((prevData) => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
    if (activeMarker === id) setActiveMarker(null);
  };

  const handlePinRightClick = (id) => {
    setPins((prevPins) => prevPins.filter(pin => pin.id !== id));
    setPinData((prevData) => {
      const newData = { ...prevData };
      delete newData[id];
      return newData;
    });
    if (activePin === id) setActivePin(null);
  };

  const handleDragEnd = (event, id) => {
    const newPosition = event.target.getLatLng();
    setMarkers((prevMarkers) => {
      const newMarkers = prevMarkers.map(marker =>
        marker.id === id ? { ...marker, lat: newPosition.lat, lng: newPosition.lng } : marker
      );
      return newMarkers;
    });
  };

  const handlePinDragEnd = (event, id) => {
    const newPosition = event.target.getLatLng();
    setPins((prevPins) => {
      const newPins = prevPins.map(pin =>
        pin.id === id ? { ...pin, lat: newPosition.lat, lng: newPosition.lng } : pin
      );
      return newPins;
    });
  };

  const handleMarkerClick = (id) => {
    setActiveMarker(id);
  };

  const handlePinClick = (id) => {
    setActivePin(id);
  };

  const handleMarkerDataChange = (id, title, description) => {
    setMarkerData((prevData) => ({
      ...prevData,
      [id]: { title, description }
    }));
  };

  const handlePinDataChange = (id, title, description) => {
    setPinData((prevData) => ({
      ...prevData,
      [id]: { title, description }
    }));
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <MapContainer
        center={center}
        zoom={4}
        style={{ width: '100%', height: '100%' }}
        crs={CRS.Simple}
        minZoom={2}
        maxBounds={bounds}
        bounds={bounds}
        ref={mapRef}
      >
        <ImageOverlay
          url={`${process.env.PUBLIC_URL}/img/OMundoConhecido.png`}
          bounds={bounds}
        />
        <AddMarker markers={markers} setMarkers={(newMarkers) => setMarkers(newMarkers)} />
        <AddPin pins={pins} setPins={(newPins) => setPins(newPins)} />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={{ lat: marker.lat, lng: marker.lng }}
            icon={marker === markers[0] ? firstMarkerIcon : subsequentMarkerIcon}
            draggable={true}
            eventHandlers={{
              contextmenu: () => handleRightClick(marker.id),
              dragend: (event) => handleDragEnd(event, marker.id),
              click: () => handleMarkerClick(marker.id)
            }}
          />
        ))}
        {pins.map((pin) => (
          <Marker
            key={pin.id}
            position={{ lat: pin.lat, lng: pin.lng }}
            icon={pinIcon}
            draggable={true}
            eventHandlers={{
              contextmenu: () => handlePinRightClick(pin.id),
              dragend: (event) => handlePinDragEnd(event, pin.id),
              click: () => handlePinClick(pin.id)
            }}
          />
        ))}
        {markers.length > 1 && (
          <Polyline
            positions={markers.map(marker => [marker.lat, marker.lng])}
            color="blue"
            dashArray="5, 10"
          />
        )}
        <LayerControl />
      </MapContainer>
      <Search setCenter={setCenter} setPopupInfo={setPopupInfo} />
      <DistanceInfo
        distance={distance}
        travelTime={travelTime}
        speed={speed}
        setSpeed={setSpeed}
      />
      <InfoPanel popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
      {activeMarker !== null && (
        <MarkerPanel
          markerData={markerData[activeMarker] || { title: '', description: '' }}
          onChange={(title, description) => handleMarkerDataChange(activeMarker, title, description)}
          onClose={() => setActiveMarker(null)}
        />
      )}
      {activePin !== null && (
        <MarkerPanel
          markerData={pinData[activePin] || { title: '', description: '' }}
          onChange={(title, description) => handlePinDataChange(activePin, title, description)}
          onClose={() => setActivePin(null)}
        />
      )}
    </div>
  );
}

export default Map;
