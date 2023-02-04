import { Dispatch, SetStateAction } from "react";
import { CityCollectionFilter } from "./city-collection-filter";

export interface FilterFeature {
  setRadiusFilter: Dispatch<SetStateAction<CityCollectionFilter>>;
}
