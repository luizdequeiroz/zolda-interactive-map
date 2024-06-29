// src/components/DistanceInfo.js
import React from 'react';

function DistanceInfo({ distance, travelTime, speed, setSpeed }) {
  return (
    <div className="info-container" style={{ zIndex: 1000, position: 'absolute', bottom: '10px', left: '10px', background: 'white', padding: '5px', border: '1px solid #ccc', borderRadius: '3px', display: 'flex', alignItems: 'center' }}>
      <div className="distance-info" style={{ marginRight: '20px' }}>
        <strong>Distância Total: </strong>{distance.toFixed(2)} km<br />
        <strong>Tempo de Viagem: </strong>{travelTime.days} dias {travelTime.hours} horas {travelTime.minutes} minutos
      </div>
      <div className="controls">
        <label>
          Modo de Transporte:
          <select value={speed} onChange={e => setSpeed(Number(e.target.value))}>
            <option value={4.17}>Passos Curtos (4.17 km/h)</option>
            <option value={7.14}>Passos Longos (7.14 km/h)</option>
            <option value={11.11}>Galopes Curtos (11.11 km/h)</option>
            <option value={33.33}>Galopes Longos (33.33 km/h)</option>
            <option value={20.0}>Velas Curtas (20 km/h)</option>
            <option value={34.0}>Velas Longas (34 km/h)</option>
            <option value={100.0}>Voo Lento (100 km/h)</option>
            <option value={300.0}>Voo Rápido (300 km/h)</option>
          </select>
        </label>
      </div>
    </div>
  );
}

export default DistanceInfo;
