// src/components/Map.js
import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CRS, LatLngBounds, latLng } from 'leaflet';
import Search from './Search';
import AddMarker from './AddMarker';
import DistanceInfo from './DistanceInfo';
import InfoPanel from './InfoPanel';
import LayerControl from './LayerControl';
import { firstMarkerIcon, subsequentMarkerIcon } from './MarkerIcon';

const center = [12.77, -36.37];
const bounds = new LatLngBounds(
  [-5.134475371454281, -79.50845859491564],
  [30.67883861843332, 6.762828376789505]
);

function calculateDistance(markerA, markerB) {
  if (!markerA || !markerB) return 0;
  const distanceInCoordinates = markerA.distanceTo(markerB);
  const kmPerCoordinateUnit = 0.0009942; // Ajuste para refletir a nova proporção
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
  const [distance, setDistance] = useState(0);
  const [speed, setSpeed] = useState(4.17); // velocidade padrão para "Passos Curtos"
  const [travelTime, setTravelTime] = useState({ days: 0, hours: 0, minutes: 0 });
  const [popupInfo, setPopupInfo] = useState(null);
  const mapRef = useRef();

  useEffect(() => {
    if (markers.length > 1) {
      const totalDistance = markers.reduce((acc, marker, idx, arr) => {
        if (idx === 0) return acc;
        const prevMarker = latLng(arr[idx - 1][0], arr[idx - 1][1]);
        const currentMarker = latLng(marker[0], marker[1]);
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
      map.setView(center, 6); // Ajuste o nível de zoom conforme necessário
    }
  };

  const handleRightClick = (idx) => {
    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers.splice(idx, 1);
      return newMarkers;
    });
  };

  const handleDragEnd = (event, idx) => {
    const newPosition = event.target.getLatLng();
    setMarkers((prevMarkers) => {
      const newMarkers = [...prevMarkers];
      newMarkers[idx] = [newPosition.lat, newPosition.lng];
      return newMarkers;
    });
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <MapContainer
        center={center}
        zoom={4} // Ajuste o nível de zoom inicial conforme necessário
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
        <AddMarker markers={markers} setMarkers={setMarkers} />
        {markers.map((position, idx) => (
          <Marker
            key={`marker-${idx}`}
            position={position}
            icon={idx === 0 ? firstMarkerIcon : subsequentMarkerIcon}
            draggable={true}
            eventHandlers={{
              contextmenu: () => handleRightClick(idx), // Manipulador para clique direito
              dragend: (event) => handleDragEnd(event, idx) // Manipulador para o fim do arrasto
            }}
          >
            <Popup>
              Marcador {idx + 1}
            </Popup>
          </Marker>
        ))}
        {markers.length > 1 && (
          <Polyline
            positions={markers}
            color="blue"
            dashArray="5, 10" // Linha tracejada
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
      <InfoPanel popupInfo={popupInfo} />
    </div>
  );
}

export default Map;
