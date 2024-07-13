import type { ShapeSourceProps } from '@maplibre/maplibre-react-native';
import type { GeometryLayer, LayerRules, LayerStyle } from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo, useMemo } from 'react';

import {
  PointSymbolizer,
  PolygonSymbolizer,
  Symbolizers,
} from '../symbolizers';

// #region Types
export type GeoJSONLayerProps = {
  layer: GeometryLayer;
  rules?: LayerRules[];
  style?: LayerStyle;
  onPress?: ShapeSourceProps['onPress'];
};
// #endregion

export const GeoJSONLayer = memo(function GeoJSONLayer({
  style,
  layer: { collection, params, name },
  rules,
  onPress,
}: GeoJSONLayerProps) {
  // #region Constants
  const sourceId = `${name}-shape`;
  // #endregion

  // #region Render
  const content = useMemo(() => {
    if (rules?.length)
      return (
        <Symbolizers
          baseId={name}
          rules={rules}
          sourceId={sourceId}
          style={style}
        />
      );

    return (
      <>
        <PolygonSymbolizer
          id={`${name}-polygon`}
          maxZoomLevel={params?.maxZoom}
          minZoomLevel={params?.minZoom}
          sourceID={sourceId}
          style={style}
        />
        <PointSymbolizer
          id={`${name}-circle`}
          maxZoomLevel={params?.maxZoom}
          minZoomLevel={params?.minZoom}
          sourceID={sourceId}
          style={style}
        />
      </>
    );
  }, [rules, name, style, sourceId, params?.minZoom, params?.maxZoom]);

  return (
    <MapLibreGL.ShapeSource id={sourceId} shape={collection} onPress={onPress}>
      {content}
    </MapLibreGL.ShapeSource>
  );
  // #endregion
});
