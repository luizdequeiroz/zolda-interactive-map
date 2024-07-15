export const handleRightClick = (setMarkers, setMarkerData, setActiveMarker) => (id, activeMarker) => {
    setMarkers((prevMarkers) => prevMarkers.filter(marker => marker.id !== id));
    setMarkerData((prevData) => {
        const newData = { ...prevData };
        delete newData[id];
        return newData;
    });
    if (activeMarker === id) setActiveMarker(null);
};

export const handlePinRightClick = (setPins, setPinData, setActivePin) => (id, activePin) => {
    setPins((prevPins) => prevPins.filter(pin => pin.id !== id));
    setPinData((prevData) => {
        const newData = { ...prevData };
        delete newData[id];
        return newData;
    });
    if (activePin === id) setActivePin(null);
};

export const handleDragEnd = (setMarkers) => (event, id) => {
    const newPosition = event.target.getLatLng();
    setMarkers((prevMarkers) => {
        const newMarkers = prevMarkers.map(marker =>
            marker.id === id ? { ...marker, lat: newPosition.lat, lng: newPosition.lng } : marker
        );
        return newMarkers;
    });
};

export const handlePinDragEnd = (setPins) => (event, id) => {
    const newPosition = event.target.getLatLng();
    setPins((prevPins) => {
        const newPins = prevPins.map(pin =>
            pin.id === id ? { ...pin, lat: newPosition.lat, lng: newPosition.lng } : pin
        );
        return newPins;
    });
};

export const handleMarkerClick = (setActiveMarker) => (id) => {
    setActiveMarker(id);
};

export const handlePinClick = (setActivePin) => (id) => {
    setActivePin(id);
};

export const handleMarkerDataChange = (setMarkerData) => (id, title, description) => {
    setMarkerData((prevData) => ({
        ...prevData,
        [id]: { title, description }
    }));
};

export const handlePinDataChange = (setPinData) => (id, title, description) => {
    setPinData((prevData) => ({
        ...prevData,
        [id]: { title, description }
    }));
};

export const handleExport = (markers, markerData, pins, pinData) => () => {
    const data = {
        markers,
        markerData,
        pins,
        pinData
    };
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'map-data.json';
    a.click();
    URL.revokeObjectURL(url);
};

export const handleImport = (setMarkers, setMarkerData, setPins, setPinData) => (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
        const data = JSON.parse(e.target.result);
        setMarkers(data.markers);
        setMarkerData(data.markerData);
        setPins(data.pins);
        setPinData(data.pinData);
    };
    reader.readAsText(file);
};