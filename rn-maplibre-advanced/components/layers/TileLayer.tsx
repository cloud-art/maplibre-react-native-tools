import type { RasterLayerStyle } from '@maplibre/maplibre-react-native';
import type { ITileLayer } from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo, useMemo } from 'react';

// #region Types
export type TileLayerProps = {
  layer: ITileLayer;
};
// #endregion

export const TileLayer = memo(function TileLayer({
  layer: { source, size, visible, name, params },
}: TileLayerProps) {
  // #region Constants
  const baseId = `${name}-raster`;
  // #endregion

  const visibilityStyle = useMemo<RasterLayerStyle>(
    () => ({ visibility: visible ? 'visible' : 'none' }),
    [visible],
  );

  // #region Render
  return (
    <MapLibreGL.RasterSource
      id={`${baseId}-source`}
      tileSize={size}
      tileUrlTemplates={[source]}
    >
      <MapLibreGL.RasterLayer
        id={`${baseId}-layer`}
        layerIndex={params?.layerIndex}
        style={visibilityStyle}
      />
    </MapLibreGL.RasterSource>
  );
  // #endregion
});
