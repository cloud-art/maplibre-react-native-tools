import type MapLibreGL from '@maplibre/maplibre-react-native';
import type {
  BBox as BaseBBox,
  Feature as BaseFeature,
  FeatureCollection as BaseFeatureCollection,
  GeometryCollection as BaseGeometryCollection,
  LineString as BaseLineString,
  MultiLineString as BaseMultiLineString,
  MultiPoint as BaseMultiPoint,
  MultiPolygon as BaseMultiPolygon,
  Point as BasePoint,
  Polygon as BasePolygon,
  Position as BasePosition,
} from 'geojson';

export enum SRID {
  EPSG_4326 = 4326,
  EPSG_3857 = 3857,
  EPSG_3395 = 3395,
}

export type GeometryType = Pick<Geometry, 'type'>['type'];

export type BBox = BaseBBox;
export type Position = BasePosition;
export type Location = MapLibreGL.Location;

export type FeatureOptions = {
  bbox?: BBox;
  id?: string | number;
};

export type Point = BasePoint;
export type LineString = BaseLineString;
export type MultiPoint = BaseMultiPoint;
export type MultiLineString = BaseMultiLineString;
export type MultiPolygon = BaseMultiPolygon;
export type Polygon = BasePolygon;
export type GeometryCollection = BaseGeometryCollection;

export type Geometry =
  | Point
  | MultiPoint
  | LineString
  | MultiLineString
  | Polygon
  | MultiPolygon
  | GeometryCollection;

export type FeatureProperties = { [name: string]: any } | null;

export type Feature<
  G extends Geometry | null = Geometry,
  P extends FeatureProperties = FeatureProperties,
> = BaseFeature<G, P>;
export type FeatureCollection<
  G extends Geometry | null = Geometry,
  P extends FeatureProperties = FeatureProperties,
> = BaseFeatureCollection<G, P>;
