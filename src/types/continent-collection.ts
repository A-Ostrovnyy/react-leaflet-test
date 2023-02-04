import { Continent } from "./continent";

export type ContinentFilter = GeoJSON.Feature<
  GeoJSON.MultiPolygon,
  Continent
> | null;
