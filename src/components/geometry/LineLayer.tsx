import type {
  LayerRules,
  LineGeometryLayer,
  LineLayerStyle,
  ShapeSourceProps,
} from '@/types';
import type { FC } from 'react';

import MapLibreGL from '@maplibre/maplibre-react-native';
import { memo, useMemo } from 'react';

import { LineSymbolizer, Symbolizers } from '../symbolizers';

// #region Types
export type LineLayerProps = {
  layer: Omit<LineGeometryLayer, 'type'>;
  style?: LineLayerStyle;
  rules?: LayerRules[];
  onPress?: ShapeSourceProps['onPress'];
};
// #endregion

const LineLayerRender: FC<LineLayerProps> = ({
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
      <LineSymbolizer
        id={`${name}-line`}
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
export const LineLayer = memo(LineLayerRender);
