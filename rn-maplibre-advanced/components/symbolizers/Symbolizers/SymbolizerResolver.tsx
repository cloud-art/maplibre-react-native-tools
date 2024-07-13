import type { LayerBaseProps } from '@maplibre/maplibre-react-native';
import type { FC } from 'react';
import type { LayerRules, LayerStyle, LayerSymbolizer } from '../../../types';

import { memo, useMemo } from 'react';

import { SymbolizerType } from '../../../types';

import {
  isLineSymbolizer,
  isPointSymbolizer,
  isPolygonSymbolizer,
} from '../../../utils';

import { LineSymbolizer } from '../Line';
import { PointSymbolizer } from '../Point';
import { PolygonSymbolizer } from '../Polygon';

// #region Types
export type SymbolizersProps = {
  baseId: string;
  sourceId: string;
  rules: LayerRules[];
  style?: LayerStyle;
};

export type SymbolizerResolverProps = Pick<
  LayerRules,
  'filter' | 'maxZoom' | 'minZoom'
> & {
  symbol: LayerSymbolizer;
  style?: LayerStyle;
  sourceId: string;
  id: string;
};
// #endregion

const SYMBOL_COMPONENTS: Record<
  SymbolizerType,
  FC<LayerBaseProps & { style?: LayerStyle }>
> = {
  // @ts-expect-error
  [SymbolizerType.LINE]: LineSymbolizer,
  // @ts-expect-error
  [SymbolizerType.POINT]: PointSymbolizer,
  // @ts-expect-error
  [SymbolizerType.POLYGON]: PolygonSymbolizer,
};

export const SymbolizerResolver = memo(function SymbolizerResolver({
  filter,
  maxZoom,
  minZoom,
  symbol,
  sourceId,
  id,
  style,
}: SymbolizerResolverProps) {
  const styles = useMemo<LayerStyle | undefined>(() => {
    if (isPointSymbolizer(symbol))
      return {
        // @ts-expect-error
        circle: { ...style?.circle, ...symbol.style?.circle },
        // @ts-expect-error
        symbol: { ...style?.symbol, ...symbol.style?.symbol },
      };
    if (isPolygonSymbolizer(symbol))
      return {
        // @ts-expect-error
        line: { ...style.line, ...symbol.style?.line },
        // @ts-expect-error
        fill: { ...style.fill, ...symbol.style?.fill },
      };
    if (isLineSymbolizer(symbol))
      return {
        // @ts-expect-error
        line: { ...style.line, ...symbol.style?.line },
      };
  }, [style, symbol]);

  const SymbolComponent = useMemo(
    () => SYMBOL_COMPONENTS[symbol.type],
    [symbol.type],
  );

  return (
    <SymbolComponent
      filter={filter}
      id={id}
      layerIndex={symbol.layerIndex}
      maxZoomLevel={maxZoom}
      minZoomLevel={minZoom}
      sourceID={sourceId}
      style={styles}
    />
  );
});
