// src/components/MarkerPanel.js
import React, { useState, useEffect } from 'react';
import '../styles.css'; // Importar o arquivo CSS

function MarkerPanel({ markerData, onChange, onClose }) {
  const [title, setTitle] = useState(markerData.title);
  const [description, setDescription] = useState(markerData.description);

  useEffect(() => {
    setTitle(markerData.title);
    setDescription(markerData.description);
  }, [markerData]);

  const handleSave = () => {
    onChange(title, description);
    onClose();
  };

  return (
    <div className="marker-panel">
      <h3>Editar Marcador</h3>
      <div className="marker-panel-content">
        <label>
          Título:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ fontWeight: 'bold' }}
          />
        </label>
        <label>
          Descrição:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <div className="marker-panel-actions">
          <button onClick={handleSave}>Salvar</button>
          <button onClick={onClose}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

export default MarkerPanel;
