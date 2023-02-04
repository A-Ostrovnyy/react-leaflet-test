import { Dispatch, SetStateAction } from "react";
import { GeoJSON, LayersControl } from "react-leaflet";

import { Continent, ContinentFilter } from "../../types";

interface ContinentPolygonLayerProps {
  data: GeoJSON.FeatureCollection<GeoJSON.MultiPolygon, Continent>;
  onGeoFilter: Dispatch<SetStateAction<ContinentFilter>>;
  geoFilter: ContinentFilter;
}

export const ContinentPolygonLayer = ({
  data,
  onGeoFilter,
  geoFilter,
}: ContinentPolygonLayerProps) => {
  return (
    <LayersControl.Overlay name='Continents'>
      <GeoJSON
        data={data}
        key='Continent-goe-json-layer'
        style={(feature) => {
          return {
            color: geoFilter === feature ? "red" : "blue",
            weight: 0.5,
            fillOpacity: 0.1,
          };
        }}
        eventHandlers={{
          click: (e) =>
            onGeoFilter((prev) => {
              const isSame = prev === e.propagatedFrom.feature;
              return isSame ? null : e.propagatedFrom.feature;
            }),
        }}
      />
    </LayersControl.Overlay>
  );
};
