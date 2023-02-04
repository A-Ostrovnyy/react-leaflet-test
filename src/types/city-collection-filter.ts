import { City } from "./city";

export type CityCollectionFilter = {
  feature: GeoJSON.Feature<GeoJSON.Point, City>;
  radius: number | null;
} | null;
