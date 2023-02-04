import { List } from "antd";
import { useMemo } from "react";
import { CityCollectionFilter, ContinentFilter } from "../types";

interface ShowActiveFiltersProps {
  geoFilter: ContinentFilter;
  radiusFilter: CityCollectionFilter;
}

const round = (num: number): number => Math.round(num * 100) / 100;

export const ShowActiveFilters = ({
  geoFilter,
  radiusFilter,
}: ShowActiveFiltersProps) => {
  const displayFilter = useMemo(() => {
    const filtersToDisplay = [];

    if (geoFilter) {
      filtersToDisplay.push(geoFilter.properties.CONTINENT);
    }
    if (radiusFilter) {
      const { coordinates } = radiusFilter.feature.geometry;
      const { radius } = radiusFilter;
      const radiusFilterToDisplay = `
        Center: (Lat: ${round(coordinates[1])}, Lon: ${round(coordinates[0])})
        Radius: ${radius} km`;

      filtersToDisplay.push(radiusFilterToDisplay);
    }
    return filtersToDisplay.length > 0
      ? filtersToDisplay
      : ["No Active filter"];
  }, [geoFilter, radiusFilter, round]);

  return (
    <article className='leaflet-bottom leaflet-left'>
      <div className='leaflet-control leaflet-bar leaflet-control-layer'>
        <List
          size='small'
          header={
            <header>
              <b>Active Filters</b>
            </header>
          }
          bordered
          dataSource={displayFilter}
          renderItem={(item) => <List.Item>{item}</List.Item>}
        />
      </div>
    </article>
  );
};
