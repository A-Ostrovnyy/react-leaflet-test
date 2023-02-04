import { LeafletMouseEvent } from "leaflet";
import {
  Marker,
  Tooltip,
  LayerGroup,
  useMap,
  LayersControl,
} from "react-leaflet";
import proj4 from "proj4";

interface MarkerLayerWithToolTipReprojectProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point>;
}

const ITM = "EPSG:2157";
const WGS = "EPSG:4326";

proj4.defs(
  ITM,
  "+proj=tmerc +lat_0=53.5 +lon_0=-8 +k=0.99982 +x_0=600000 +y_0=750000 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs +type=crs"
);

proj4.defs(WGS, "+proj=longlat +datum=WGS84 +no_defs +type=crs");

export const MarkerLayerWithToolTipReproject = ({
  data,
}: MarkerLayerWithToolTipReprojectProps) => {
  const leafletMap = useMap();
  const handleClick = (e: LeafletMouseEvent) => {
    leafletMap.panTo(e.latlng);
  };
  return (
    <LayersControl.Overlay name='Irish cities reprojected'>
      <LayerGroup>
        {data.features.map(({ geometry, properties }) => {
          const [lat, long] = proj4(ITM, WGS, geometry.coordinates);
          return (
            <Marker
              key={properties?.name}
              position={[long, lat]}
              eventHandlers={{
                click: handleClick,
              }}>
              <Tooltip>
                <h3>{properties?.name}</h3>
              </Tooltip>
            </Marker>
          );
        })}
      </LayerGroup>
    </LayersControl.Overlay>
  );
};
