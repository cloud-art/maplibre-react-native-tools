import type { FC } from 'react';
import type {
  LayerRules,
  PolygonGeometryLayer,
  PolygonLayerStyle,
  ShapeSourceProps,
} from '../../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo, useMemo } from 'react';

import { PolygonSymbolizer, Symbolizers } from '../symbolizers';

// #region Types
type PolygonLayerProps = {
  layer: Omit<PolygonGeometryLayer, 'type'>;
  style?: PolygonLayerStyle;
  rules?: LayerRules[];
  onPress?: ShapeSourceProps['onPress'];
};
// #endregion

const PolygonLayerRender: FC<PolygonLayerProps> = ({
  layer: { collection, params, name },
  rules,
  onPress,
  style,
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
      <PolygonSymbolizer
        id={`${name}-polygon`}
        maxZoomLevel={params?.maxZoom}
        minZoomLevel={params?.minZoom}
        sourceID={sourceId}
        style={style}
      />
    );
  }, [rules, name, style, sourceId, params?.minZoom, params?.maxZoom]);
  return (
    <MapLibreGL.ShapeSource id={sourceId} shape={collection} onPress={onPress}>
      {content}
    </MapLibreGL.ShapeSource>
  );
  // #endregion
};

export const PolygonLayer = memo(PolygonLayerRender);
