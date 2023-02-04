import L, { LatLng } from "leaflet";

export const getLatLng = (coordinates: number[]): LatLng => {
  const [lng, lat] = coordinates;
  return L.latLng(lat, lng);
};
