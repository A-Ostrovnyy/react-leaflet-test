import L from "leaflet";

import mountainImg from "../images/mountain.png";

export const mountainIcon = new L.Icon({
  iconSize: [35, 23],
  iconUrl: mountainImg,
  iconAnchor: [17, 16],
  tooltipAnchor: [15, -5],
});
