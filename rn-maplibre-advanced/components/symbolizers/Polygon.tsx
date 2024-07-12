import type { LayerBaseProps } from "@maplibre/maplibre-react-native";
import type { FC } from "react";
import type { PolygonLayerStyle } from "../../types";

import MapLibreGL from "@maplibre/maplibre-react-native";
import { memo } from "react";

// #region Types
export type PolygonSymbolizerProps = {
  style?: PolygonLayerStyle;
} & LayerBaseProps;
// #endregion

const PolygonSymbolizerRender: FC<PolygonSymbolizerProps> = ({
  id,
  style,
  ...props
}) => {
  // #region Render
  return (
    <>
      <MapLibreGL.FillLayer
        {...props}
        id={`${id}-fill`}
        layerIndex={props.layerIndex ? props.layerIndex - 1 : undefined}
        style={style?.fill}
      />
      <MapLibreGL.LineLayer {...props} id={`${id}-line`} style={style?.line} />
    </>
  );
  // #endregion
};
export const PolygonSymbolizer = memo(PolygonSymbolizerRender);
