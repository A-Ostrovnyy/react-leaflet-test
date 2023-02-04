import { Dispatch, SetStateAction } from "react";
import { LatLng } from "leaflet";
import { Marker, Popup, LayersControl, LayerGroup } from "react-leaflet";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

import { City, ContinentFilter } from "../../types";
import { CityCollectionFilter } from "../../types/city-collection-filter";
import { getLatLng } from "../../utils";
import { PopupStatistics } from "./components/PopupStatistics/PopupStatistics";

interface MarkerLayerProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point, City>;
  radiusFilter: CityCollectionFilter;
  onRadiusFilter: Dispatch<SetStateAction<CityCollectionFilter>>;
  geoFilter: ContinentFilter;
}

export const MarkerLayer = ({
  data,
  onRadiusFilter,
  radiusFilter,
  geoFilter,
}: MarkerLayerProps) => {
  let centerPoint: LatLng;
  if (radiusFilter) {
    const { coordinates } = radiusFilter.feature.geometry;
    centerPoint = getLatLng(coordinates);
  }

  return (
    <LayersControl.Overlay name='World cities'>
      <LayerGroup>
        {/* TODO: move this logic outside JSX */}
        {data.features
          .filter((currentFeature) => {
            let filterByRadius = false;
            let filterByGeo = false;
            if (centerPoint && radiusFilter?.radius) {
              const { coordinates } = currentFeature.geometry;
              const currentPoint = getLatLng(coordinates);
              filterByRadius =
                centerPoint.distanceTo(currentPoint) / 1000 <
                radiusFilter.radius;
            }
            if (geoFilter) {
              filterByGeo = booleanPointInPolygon(currentFeature, geoFilter);
            }
            let doFilter = true;

            if (geoFilter && radiusFilter) {
              doFilter = filterByGeo && filterByRadius;
            } else if (geoFilter && !radiusFilter) {
              doFilter = filterByGeo;
            } else if (radiusFilter && !geoFilter) {
              doFilter = filterByRadius;
            }
            return doFilter;
          })
          .map((feature) => {
            const position = getLatLng(feature.geometry.coordinates);
            const name = feature.properties?.name;
            return (
              <Marker key={name} position={position} doFitToBounds={true}>
                <Popup>
                  <PopupStatistics
                    feature={feature}
                    onRadiusFilter={onRadiusFilter}
                  />
                </Popup>
              </Marker>
            );
          })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
