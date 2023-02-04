import { useEffect, useState } from "react";
import { MapContainer, TileLayer, LayersControl } from "react-leaflet";

import {
  MarkerLayerWithToolTip,
  MarkerLayerWithToolTipCluster,
  MarkerLayer,
  RadiusFilter,
  ContinentPolygonLayer,
  MarkerLayerWithToolTipReproject,
} from "../../layers";
import { highestPoints, continents, irishCities2157 } from "../../data";
import {
  CityCollection,
  CityCollectionFilter,
  ContinentFilter,
} from "../../types";

import { FitBoundToDataControl, ShowActiveFilters } from "../../controls";

const URL =
  "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_populated_places_simple.geojson";

const MarkersWithToolTipPage = () => {
  const [scrollWheelZoom, setScrollWheelZoom] = useState<boolean>(true);
  const [radiusFilter, setRadiusFilter] = useState<CityCollectionFilter>(null);
  const [geoFilter, setGeoFilter] = useState<ContinentFilter>(null);
  const [cities, setCities] = useState<CityCollection>({
    features: [],
    type: "FeatureCollection",
  });

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    async function fetchData(url: string): Promise<void> {
      // TODO: add error handling;

      try {
        const response = await fetch(url, {
          signal: signal,
          method: "GET",
        });
        const cities = await response.json();
        setCities(cities);
      } catch (err) {
        if (!signal?.aborted) {
          console.error(err);
        }
      }
    }
    fetchData(URL);
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={scrollWheelZoom}>
      <LayersControl position='topright'>
        <LayersControl.BaseLayer checked name='OSM Streets'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name='Topo Map'>
          <TileLayer
            attribution='Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
            url='https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
          />
        </LayersControl.BaseLayer>
        <MarkerLayer
          data={cities}
          radiusFilter={radiusFilter}
          onRadiusFilter={setRadiusFilter}
          geoFilter={geoFilter}
        />
        <MarkerLayerWithToolTip data={highestPoints} />
        <MarkerLayerWithToolTipCluster data={cities} />
        <MarkerLayerWithToolTipReproject data={irishCities2157} />
        <RadiusFilter
          radiusFilter={radiusFilter}
          onRadiusFilter={setRadiusFilter}
        />
        <ContinentPolygonLayer
          data={continents}
          onGeoFilter={setGeoFilter}
          geoFilter={geoFilter}
        />
      </LayersControl>
      <FitBoundToDataControl />
      <ShowActiveFilters geoFilter={geoFilter} radiusFilter={radiusFilter} />
    </MapContainer>
  );
};

export default MarkersWithToolTipPage;
