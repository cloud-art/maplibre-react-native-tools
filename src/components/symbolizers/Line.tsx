import type { LayerBaseProps } from '@maplibre/maplibre-react-native';
import type { LineLayerStyle } from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo } from 'react';

// #region Types
export type LineSymbolizerProps = {
  style?: LineLayerStyle;
} & LayerBaseProps;
// #endregion

export const LineSymbolizer = memo(function LineSymbolizer({
  style,
  ...props
}: LineSymbolizerProps) {
  // #region Render
  return <MapLibreGL.LineLayer {...props} style={style?.line} />;
  // #endregion
});
