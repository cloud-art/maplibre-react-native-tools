import type { BaseLayerProps, CircleLayerStyle } from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo } from 'react';

// #region Types
export type PointSymbolizerProps = {
  style?: CircleLayerStyle;
} & BaseLayerProps;
// #endregion

export const PointSymbolizer = memo(function PointSymbolizer({
  style,
  ...props
}: PointSymbolizerProps) {
  // #region Render
  if (
    style &&
    'symbol' in style &&
    style.symbol &&
    'iconImage' in style.symbol
  ) {
    return <MapLibreGL.SymbolLayer {...props} style={style.symbol} />;
  }

  return <MapLibreGL.CircleLayer {...props} style={style?.circle} />;
  // #endregion
});
