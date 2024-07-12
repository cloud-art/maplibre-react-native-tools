import type { LineLayerStyle } from "../../types";
import type { LayerBaseProps } from "@maplibre/maplibre-react-native";
import type { FC } from "react";

import MapLibreGL from "@maplibre/maplibre-react-native";
import { memo } from "react";

// #region Types
export type LineSymbolizerProps = {
  style?: LineLayerStyle;
} & LayerBaseProps;
// #endregion

const LineSymbolizerRender: FC<LineSymbolizerProps> = ({ style, ...props }) => {
  // #region Render
  return <MapLibreGL.LineLayer {...props} style={style?.line} />;
  // #endregion
};
export const LineSymbolizer = memo(LineSymbolizerRender);
