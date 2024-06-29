// src/components/MarkerIcon.js
import { icon } from 'leaflet';

const firstMarkerIcon = icon({
  iconUrl: '/img/first-marker-icon.png',
  iconSize: [35, 35], // ajuste conforme necessário
  iconAnchor: [17.5, 35] // ajuste para centralizar o ícone no ponto de clique
});

const subsequentMarkerIcon = icon({
  iconUrl: '/img/subsequent-marker-icon.png',
  iconSize: [25, 41], // ajuste conforme necessário
  iconAnchor: [12.5, 41] // ajuste para centralizar o ícone no ponto de clique
});

export { firstMarkerIcon, subsequentMarkerIcon };
