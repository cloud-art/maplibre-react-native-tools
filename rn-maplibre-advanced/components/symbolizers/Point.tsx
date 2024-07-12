import type { LayerBaseProps } from "@maplibre/maplibre-react-native";
import type { FC } from "react";
import type { CircleLayerStyle } from "../../types";

import MapLibreGL from "@maplibre/maplibre-react-native";
import { memo } from "react";

// #region Types
export type PointSymbolizerProps = {
  style?: CircleLayerStyle;
} & LayerBaseProps;
// #endregion

export const PointSymbolizerRender: FC<PointSymbolizerProps> = ({
  style,
  ...props
}) => {
  // #region Render
  if (
    style &&
    "symbol" in style &&
    style.symbol &&
    "iconImage" in style.symbol
  ) {
    return <MapLibreGL.SymbolLayer {...props} style={style.symbol} />;
  }

  return <MapLibreGL.CircleLayer {...props} style={style?.circle} />;
  // #endregion
};
export const PointSymbolizer = memo(PointSymbolizerRender);
