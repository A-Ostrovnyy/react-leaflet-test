import L from "leaflet";
import { Dispatch, SetStateAction } from "react";
import { Circle, LayersControl } from "react-leaflet";

import { CityCollectionFilter } from "../../types/city-collection-filter";
import { getLatLng } from "../../utils";

interface RadiusFilterProps {
  radiusFilter: CityCollectionFilter;
  onRadiusFilter: Dispatch<SetStateAction<CityCollectionFilter>>;
}

export const RadiusFilter = ({
  radiusFilter,
  onRadiusFilter,
}: RadiusFilterProps) => {
  if (!radiusFilter || !radiusFilter?.radius) {
    return null;
  }
  const { coordinates } = radiusFilter.feature.geometry;
  const center = getLatLng(coordinates);

  return (
    <LayersControl.Overlay name='Radius filter'>
      <Circle
        center={center}
        radius={radiusFilter.radius * 1000}
        eventHandlers={{
          dblclick: (e) => {
            // e.originalEvent.view.L.DomEvent.stopPropagation(e);
            L.DomEvent.stopPropagation(e);
            onRadiusFilter(null);
          },
        }}
        color='grey'
        weight={1}
        fillOpacity={0.4}
      />
    </LayersControl.Overlay>
  );
};
