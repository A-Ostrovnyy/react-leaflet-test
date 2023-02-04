import { LeafletMouseEvent } from "leaflet";
import {
  Marker,
  Tooltip,
  useMap,
  LayersControl,
  LayerGroup,
} from "react-leaflet";

import { mountainIcon } from "../../icons";

interface MarkerLayerWithToolTipProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point>;
}

export const MarkerLayerWithToolTip = ({
  data,
}: MarkerLayerWithToolTipProps) => {
  const leafletMap = useMap();
  const handleClick = (e: LeafletMouseEvent) => {
    leafletMap.panTo(e.latlng);
  };
  return (
    <LayersControl.Overlay name='Highest points'>
      <LayerGroup>
        {data.features.map(({ geometry, properties }) => {
          const [lat, long] = geometry.coordinates;
          return (
            <Marker
              key={properties?.name}
              position={[long, lat]}
              icon={mountainIcon}
              eventHandlers={{
                click: handleClick,
              }}>
              <Tooltip>
                <h3>Mt. {properties?.name}</h3>
                Continent: <b>{properties?.continent}</b>
                <br />
                Elevation: <b>{properties?.elevation} m.</b>
              </Tooltip>
            </Marker>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
