// src/components/InfoPanel.js
import React from 'react';
import '../styles.css'; // Importar o arquivo CSS

function InfoPanel({ popupInfo }) {
  if (!popupInfo) return null;

  return (
    <div className="info-panel">
      <h3>{popupInfo.name}</h3>
      <div className="description">
        <p>{popupInfo.description}</p>
      </div>
    </div>
  );
}

export default InfoPanel;
