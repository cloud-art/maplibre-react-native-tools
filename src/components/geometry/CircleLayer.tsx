import type {
  CircleGeometryLayer,
  CircleLayerStyle,
  LayerRules,
  ShapeSourceProps,
} from '@/types';
import type { FC } from 'react';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo, useMemo } from 'react';

import { PointSymbolizer, Symbolizers } from '../symbolizers';

// #region Types
type CircleLayerProps = {
  layer: Omit<CircleGeometryLayer, 'type'>;
  style?: CircleLayerStyle;
  rules?: LayerRules[];
  onPress?: ShapeSourceProps['onPress'];
};
// #endregion

export const CircleLayerRender: FC<CircleLayerProps> = ({
  layer: { collection, params, name },
  style,
  rules,
  onPress,
}) => {
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
      <PointSymbolizer
        id={`${name}-circle`}
        maxZoomLevel={params?.maxZoom}
        minZoomLevel={params?.minZoom}
        sourceID={sourceId}
        style={style}
      />
    );
  }, [name, rules, style, sourceId, params?.maxZoom, params?.minZoom]);

  return (
    <MapLibreGL.ShapeSource id={sourceId} shape={collection} onPress={onPress}>
      {content}
    </MapLibreGL.ShapeSource>
  );
  // #endregion
};
export const CircleLayer = memo(CircleLayerRender);
