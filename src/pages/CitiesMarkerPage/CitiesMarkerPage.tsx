import { useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import { MarkerLayer, RadiusFilter } from "../../layers";
import { cities } from "../../data";
import { CityCollectionFilter } from "../../types/city-collection-filter";
import { ContinentFilter } from "../../types";

const CitiesMarkerPage = () => {
  const [scrollWheelZoom, setScrollWheelZoom] = useState<boolean>(true);
  const [radiusFilter, setRadiusFilter] = useState<CityCollectionFilter>(null);
  const [geoFilter, setGeoFilter] = useState<ContinentFilter>(null);

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <LayersControl>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <MarkerLayer
          data={cities}
          onRadiusFilter={setRadiusFilter}
          radiusFilter={radiusFilter}
          geoFilter={geoFilter}
        />
        <RadiusFilter
          radiusFilter={radiusFilter}
          onRadiusFilter={setRadiusFilter}
        />
      </LayersControl>
    </MapContainer>
  );
};

export default CitiesMarkerPage;
