import type { BaseLayerProps, PolygonLayerStyle } from '@/types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo } from 'react';

// #region Types
export type PolygonSymbolizerProps = {
  style?: PolygonLayerStyle;
} & BaseLayerProps;
// #endregion

export const PolygonSymbolizer = memo(function PolygonSymbolizer({
  id,
  style,
  ...props
}: PolygonSymbolizerProps) {
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
});
