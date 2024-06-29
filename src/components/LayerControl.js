// src/components/LayerControl.js
import React from 'react';
import { LayersControl, TileLayer, LayerGroup } from 'react-leaflet';
import '../styles.css'; // Importar o arquivo CSS

function LayerControl() {
  return (
    <div className="layer-control">
      <LayersControl position="topright">
        <LayersControl.Overlay name="Divisões Territoriais">
          <LayerGroup>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Pontos de Interesse">
          <LayerGroup>
            <TileLayer
              url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
              attribution='Map data: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> contributors'
            />
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>
    </div>
  );
}

export default LayerControl;
