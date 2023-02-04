import { useState } from "react";
import { LatLngTuple } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

const position: LatLngTuple = [51.505, -0.09];

const SingleMarkerPage = () => {
  const [scrollWheelZoom, setScrollWheelZoom] = useState<boolean>(true);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={scrollWheelZoom}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default SingleMarkerPage;
