// src/components/DistanceInfo.js
import React from 'react';

function DistanceInfo({ distance, travelTime, speed, setSpeed, handleExport, handleImport }) {
  return (
    <div className="info-container">
      <div className="info-item">
        <strong>Distância Total: </strong>&nbsp;{distance.toFixed(2)} km
      </div>
      <div className="info-item controls">
        <label>
          Modo de Transporte:
          <select value={speed} onChange={e => setSpeed(Number(e.target.value))}>
            <option value={4.17}>Passos Curtos</option>
            <option value={7.14}>Passos Longos</option>
            <option value={11.11}>Galopes Curtos</option>
            <option value={33.33}>Galopes Longos</option>
            <option value={20.0}>Velas Curtas</option>
            <option value={34.0}>Velas Longas</option>
            <option value={100.0}>Voo Lento</option>
            <option value={300.0}>Voo Rápido</option>
          </select>
        </label>
      </div>
      <div className="info-item">
        <strong>Tempo de Viagem: </strong>&nbsp;{travelTime.days} dias {travelTime.hours} horas {travelTime.minutes} minutos
      </div>
      <div className="info-item">
        <button onClick={handleExport}>Exportar</button>
      </div>
      <div className="info-item">
        <button onClick={handleImport}>Importar</button>
      </div>
    </div>
  );
}

export default DistanceInfo;
