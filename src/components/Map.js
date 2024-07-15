import React, { useState, useRef } from 'react';
import { MapContainer, ImageOverlay, Marker, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { CRS } from 'leaflet';
import Search from './Search';
import AddMarker from './AddMarker';
import DistanceInfo from './DistanceInfo';
import InfoPanel from './InfoPanel';
import LayerControl from './LayerControl';
import { firstMarkerIcon, subsequentMarkerIcon } from './MarkerIcon';
import MarkerPanel from './MarkerPanel';
import AddPin from './AddPin';
import { pinIcon } from './PinIcon';
import { initializeDice, addDice, resetDice } from './DiceRoller/DiceBox';
import DiceControls from './DiceRoller/DiceControls';
import { useMapEffect } from './Map/effects';
import { center, bounds, setCenter } from './Map/setup';
import { handleDragEnd, handleExport, handleImport, handleMarkerClick, handleMarkerDataChange, handlePinClick, handlePinDataChange, handlePinDragEnd, handlePinRightClick, handleRightClick } from './Map/handlers';

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

  useMapEffect(markers, speed, setDistance, setTravelTime);

  const rollDice = async (notation) => {
    await initializeDice();
    addDice(notation);
  };

  const resetDiceHandler = () => {
    resetDice();
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
              contextmenu: () => handleRightClick(setMarkers, setMarkerData, setActiveMarker)(marker.id, activeMarker),
              dragend: (event) => handleDragEnd(setMarkers)(event, marker.id),
              click: () => handleMarkerClick(setActiveMarker)(marker.id)
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
              contextmenu: () => handlePinRightClick(setPins, setPinData, setActivePin)(pin.id, activePin),
              dragend: (event) => handlePinDragEnd(setPins)(event, pin.id),
              click: () => handlePinClick(setActivePin)(pin.id)
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
      <Search setCenter={setCenter(mapRef)} setPopupInfo={setPopupInfo} />
      <DistanceInfo
        distance={distance}
        travelTime={travelTime}
        speed={speed}
        setSpeed={setSpeed}
        handleExport={handleExport(markers, markerData, pins, pinData)}
        handleImport={() => document.getElementById('importInput').click()}
      />
      <DiceControls rollDice={rollDice} resetDice={resetDiceHandler} />
      <input
        type="file"
        id="importInput"
        style={{ display: 'none' }}
        accept=".json"
        onChange={handleImport(setMarkers, setMarkerData, setPins, setPinData)}
      />
      <InfoPanel popupInfo={popupInfo} onClose={() => setPopupInfo(null)} />
      {activeMarker !== null && (
        <MarkerPanel
          markerData={markerData[activeMarker] || { title: '', description: '' }}
          onChange={(title, description) => handleMarkerDataChange(setMarkerData)(activeMarker, title, description)}
          onClose={() => setActiveMarker(null)}
          isPin={false}
          coordinates={markers.find(marker => marker.id === activeMarker)}
        />
      )}
      {activePin !== null && (
        <MarkerPanel
          markerData={pinData[activePin] || { title: '', description: '' }}
          onChange={(title, description) => handlePinDataChange(setPinData)(activePin, title, description)}
          onClose={() => setActivePin(null)}
          isPin={true}
          coordinates={pins.find(pin => pin.id === activePin)}
        />
      )}
    </div>
  );
}

export default Map;
