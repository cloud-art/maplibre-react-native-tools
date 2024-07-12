import type {
  FeatureCollection,
  FeatureProperties,
  Geometry,
  LineString,
  Point,
  Polygon,
} from "./geojson";
import type {
  CircleLayerStyle,
  LayerStyle,
  LineLayerStyle,
  PolygonLayerStyle,
} from "./style";

export enum LayerType {
  DATA,
  TILE,
}

export interface BaseLayerParams extends Record<string, unknown> {
  layerIndex?: number;
}
export interface GeometryLayerParams<S extends LayerStyle = LayerStyle>
  extends BaseLayerParams {
  style?: S;
  minZoom?: number;
  maxZoom?: number;
}

export interface BaseLayer {
  name: string;
  type: LayerType;
  params?: BaseLayerParams;
  visible?: boolean;
}
export interface GeometryLayer<
  G extends Geometry | null = Geometry,
  P extends FeatureProperties = FeatureProperties,
  S extends LayerStyle = LayerStyle
> extends BaseLayer {
  collection: FeatureCollection<G, P>;
  params?: GeometryLayerParams<S>;
}
export type PolygonGeometryLayer = GeometryLayer<
  Polygon,
  FeatureProperties,
  PolygonLayerStyle
>;
export type CircleGeometryLayer = GeometryLayer<
  Point,
  FeatureProperties,
  CircleLayerStyle
>;
export type LineGeometryLayer = GeometryLayer<
  LineString,
  FeatureProperties,
  LineLayerStyle
>;

export interface ITileLayer extends BaseLayer {
  type: LayerType.TILE;
  source: string;
  description: string;
  size?: number;
}

export type MapLayer = ITileLayer;
