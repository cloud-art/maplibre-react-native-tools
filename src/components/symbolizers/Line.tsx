import type { BaseLayerProps, LineLayerStyle } from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo } from 'react';

// #region Types
export type LineSymbolizerProps = {
  style?: LineLayerStyle;
} & BaseLayerProps;
// #endregion

export const LineSymbolizer = memo(function LineSymbolizer({
  style,
  ...props
}: LineSymbolizerProps) {
  // #region Render
  return <MapLibreGL.LineLayer {...props} style={style?.line} />;
  // #endregion
});
