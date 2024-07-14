import { BBox, Feature, FeatureProperties, Point, Position } from './geojson';

export interface RegionProperties extends NonNullable<FeatureProperties> {
  zoomLevel: number;
  heading: number;
  animated: boolean;
  isUserInteraction: boolean;
  visibleBounds: Position[];
  pitch: number;
}

export interface VisibleRegionProperties extends RegionProperties {
  visibleBBox: BBox;
  expandedBBox: BBox;
}
export type Region = Feature<Point, RegionProperties>;
export type VisibleRegion = Feature<Point, VisibleRegionProperties>;
