import type {
  CircleLayerStyle as BaseCircleLayerStyle,
  FillLayerStyle as BaseFillLayerStyle,
  LineLayerStyle as BaseLineLayerStyle,
  SymbolLayerStyle as BaseSymbolLayerStyle,
  Expression,
} from '@maplibre/maplibre-react-native';
import type { Position } from './geojson';

export type ExpressionField =
  | string
  | number
  | boolean
  | Expression
  | ExpressionField[]
  | { [key: string]: ExpressionField };

export type CircleLayerStyle = {
  circle?: BaseCircleLayerStyle;
  symbol?: BaseSymbolLayerStyle;
};
export type LineLayerStyle = {
  line?: BaseLineLayerStyle;
};
export type PolygonLayerStyle = {
  fill?: BaseFillLayerStyle;
} & LineLayerStyle;

export type LayerStyle = CircleLayerStyle | LineLayerStyle | PolygonLayerStyle;
export type LayerSymbolizer<S extends LayerStyle = LayerStyle> = {
  type: SymbolizerType;
  style?: S;
  layerIndex?: number;
};
export type LayerRules<S extends LayerStyle = LayerStyle> = {
  name: string;
  minZoom?: number;
  maxZoom?: number;
  filter?: Expression;
  symbolizers?: LayerSymbolizer<S>[];
};

export type Anchor =
  | 'center'
  | 'left'
  | 'right'
  | 'top'
  | 'bottom'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export enum Unit {
  PIXEL = 'pixel',
  METRE = 'meter',
  FOOT = 'foot',
}

export enum SymbolizerType {
  POINT = 'PointSymbolizer',
  LINE = 'LineSymbolizer',
  POLYGON = 'PolygonSymbolizer',
}

export interface Graphic {
  size: number;
  type: 'Graphic';
  anchor: Position;
  format: string;
  content: string;
  opacity: number;
  rotation: number;
  displacement: Position;
}

export interface Stroke {
  type: 'Stroke';
  opacity?: number;
  color?: string;
  width?: number;
  linecap?: 'butt' | 'round' | 'square';
  linejoin?: 'bevel' | 'round' | 'miter';
  dasharray?: number[];
  dashoffset?: number;
}
export interface Fill {
  type: 'Fill';
  graphic?: Graphic;
  opacity?: number;
  color?: string;
}
export interface IBaseSymbolizer {
  uom: Unit;
  type: SymbolizerType;
  geometry: unknown;
}

export interface IPointSymbolizer extends IBaseSymbolizer {
  type: SymbolizerType.POINT;
  graphic: Graphic;
}

export interface ILineSymbolizer extends IBaseSymbolizer {
  type: SymbolizerType.LINE;
  stroke: Stroke;
}

export interface IPolygonSymbolizer extends IBaseSymbolizer {
  type: SymbolizerType.POLYGON;
  fill: Fill;
  stroke: Stroke;
}
export type ISymbolizer =
  | IPointSymbolizer
  | ILineSymbolizer
  | IPolygonSymbolizer;

export interface Rule {
  type: 'Rule';
  name: string;
  max: number;
  min: number;
  filter: Expression;
  description: string;
  symbolizers: ISymbolizer[];
}

export interface IStyle {
  name: string;
  type: 'FeatureTypeStyle';
  rules?: Rule[];
}
