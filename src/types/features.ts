import type { Feature, FeatureCollection, GeometryType } from './geojson';

export type GeometryToolHandle = {
  getValue: () =>
    | Feature
    | Promise<Feature | undefined | null>
    | undefined
    | null;
};

export type FeatureGeometryEditProps = {
  geometryType: GeometryType;
  feature?: Feature;
  snapSource?: FeatureCollection;
};

export type LayerEditProps = { isTargetMode?: boolean } & Omit<
  FeatureGeometryEditProps,
  'geometryType'
>;
