import { LatLngBounds } from "leaflet";

export const center = [12.77, -36.37];
export const bounds = new LatLngBounds(
  [-5.134475371454281, -79.50845859491564],
  [30.67883861843332, 6.762828376789505]
);

export const setCenter = (mapRef) => (center) => {
  if (mapRef.current) {
    const map = mapRef.current;
    map.setView(center, 6);
  }
};