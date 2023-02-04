import { LeafletMouseEvent } from "leaflet";
import { Marker, Tooltip, useMap, LayersControl } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";

interface MarkerLayerWithToolTipClusterProps {
  data: GeoJSON.FeatureCollection<GeoJSON.Point>;
}

export const MarkerLayerWithToolTipClusterFoo = ({
  data,
}: MarkerLayerWithToolTipClusterProps) => {
  const leafletMap = useMap();
  const handleClick = (e: LeafletMouseEvent) => {
    leafletMap.panTo(e.latlng);
  };
  return (
    <>
      {data.features.map(({ geometry, properties }) => {
        const [lat, long] = geometry.coordinates;
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
    </>
  );
};

// TODO: fix error props WithChildren<T>
export const MarkerLayerWithToolTipCluster = ({
  data,
}: MarkerLayerWithToolTipClusterProps) => {
  return (
    <LayersControl.Overlay name='Cities Clustered'>
      <MarkerClusterGroup zoomToBoundsOnClick={false}>
        <MarkerLayerWithToolTipClusterFoo data={data} />
      </MarkerClusterGroup>
    </LayersControl.Overlay>
  );
};
