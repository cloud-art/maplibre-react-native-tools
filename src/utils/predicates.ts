import type {
  CircleLayerStyle,
  IBaseSymbolizer,
  ILineSymbolizer,
  IPointSymbolizer,
  IPolygonSymbolizer,
  LayerSymbolizer,
  LineLayerStyle,
  PolygonLayerStyle,
} from '@/types';

import { SymbolizerType } from '@/types';

export const isPointSymbolizerScheme = (
  symbolizer: IBaseSymbolizer,
): symbolizer is IPointSymbolizer => symbolizer.type === SymbolizerType.POINT;

export const isLineSymbolizerScheme = (
  symbolizer: IBaseSymbolizer,
): symbolizer is ILineSymbolizer => symbolizer.type === SymbolizerType.LINE;

export const isPolygonSymbolizerScheme = (
  symbolizer: IBaseSymbolizer,
): symbolizer is IPolygonSymbolizer =>
  symbolizer.type === SymbolizerType.POLYGON;

export const isPointSymbolizer = (
  symbolizer: LayerSymbolizer,
): symbolizer is LayerSymbolizer<CircleLayerStyle> =>
  symbolizer.type === SymbolizerType.POINT;

export const isLineSymbolizer = (
  symbolizer: LayerSymbolizer,
): symbolizer is LayerSymbolizer<LineLayerStyle> =>
  symbolizer.type === SymbolizerType.LINE;

export const isPolygonSymbolizer = (
  symbolizer: LayerSymbolizer,
): symbolizer is LayerSymbolizer<PolygonLayerStyle> =>
  symbolizer.type === SymbolizerType.POLYGON;
