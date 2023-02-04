import { Dispatch, SetStateAction, useState } from "react";
import { Button, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

import { City } from "../../../../types";
import { CityCollectionFilter } from "../../../../types/city-collection-filter";
import "./styles.css";

interface PopupStatisticsProps {
  feature: GeoJSON.Feature<GeoJSON.Point, City>;
  onRadiusFilter: Dispatch<SetStateAction<CityCollectionFilter>>;
}

const DEFAULT_VALUE = 3000;

export const PopupStatistics = ({
  feature,
  onRadiusFilter,
}: PopupStatisticsProps) => {
  const [radius, setRadius] = useState<number | null>(DEFAULT_VALUE);

  const { name, adm0name, pop_max } = feature.properties;

  const handleInputChange = (value: 0 | 3000 | null): void => {
    setRadius(value);
  };

  const handleFilterChange = (): void => {
    onRadiusFilter((prev) => {
      let newFilter = null;
      if (prev) {
        if (radius === 0) {
          newFilter = prev;
          return newFilter;
        } else {
          const sameFeature = prev.feature === feature;
          const sameRadius = prev.radius === radius;
          if (!sameFeature || !sameRadius) {
            newFilter = { feature, radius };
          }
        }
      } else if (radius !== 0) {
        newFilter = { feature, radius };
      }
      return newFilter;
    });
  };

  return (
    <>
      <Card type='inner' title='Name' className='rl-card'>
        {`${name}, ${adm0name}`}
      </Card>
      <Card type='inner' title='Population' className='rl-card'>
        {`${name}, ${pop_max}`}
      </Card>
      <Card type='inner' title='Radius filter' className='rl-card'>
        <Space>
          <InputNumber
            defaultValue={DEFAULT_VALUE}
            min={0}
            onChange={handleInputChange}
          />
          <Button
            type='primary'
            shape='round'
            icon={<FilterOutlined />}
            onClick={handleFilterChange}>
            Filter by km
          </Button>
        </Space>
      </Card>
    </>
  );
};
