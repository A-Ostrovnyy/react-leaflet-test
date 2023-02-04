import ReactDOM from "react-dom/client";
import { unmountComponentAtNode } from "react-dom";
import { Button } from "antd";
import { BorderOuterOutlined, BorderInnerOutlined } from "@ant-design/icons";
import { createControlComponent } from "@react-leaflet/core";
import { Control, LatLngTuple, DomUtil, Map } from "leaflet";

const node = DomUtil.create("div");
// TODO: add types possible solution: https://stackoverflow.com/questions/56639406/how-to-define-the-type-of-a-custom-leaflet-control
// https://www.npmjs.com/package/react-leaflet-custom-control
Control.FitBoundToDataControl = Control.extend({
  options: {
    position: "topleft",
  },
  onAdd: function (map: Map) {
    const doFitDataToBounds = () => {
      const latLngCollection: LatLngTuple[] = [];
      map.eachLayer((layer) => {
        const currentLatLng = layer.options.doFitToBounds && layer.getLatLng();
        if (currentLatLng) {
          latLngCollection.push(currentLatLng);
        }
      });
      map.fitBounds(latLngCollection);
    };

    ReactDOM.createRoot(
      document.querySelector(
        ".leaflet-top.leaflet-left .leaflet-control"
      ) as HTMLElement
    ).render(
      <div className='fit-bound-control-container'>
        <Button
          title='Fit bounds to data'
          icon={<BorderInnerOutlined />}
          onClick={doFitDataToBounds}
          className='leaflet-control-layer'
        />
        <Button
          title='Fit bounds to world'
          icon={<BorderOuterOutlined />}
          onClick={() => map.fitWorld()}
          className='leaflet-control-layer'
        />
      </div>
    );
    return node;
  },
  onRemove: function (map: Map) {
    unmountComponentAtNode(node);
  },
});

export const FitBoundToDataControl = createControlComponent(
  (props) => new Control.FitBoundToDataControl(props)
);
