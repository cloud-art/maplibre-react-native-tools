import type {
  BBox,
  Feature,
  FeatureCollection,
  LineString,
  Point,
  Position,
} from '@/types';

import { booleanIntersects } from '@turf/boolean-intersects';
import { buffer, distance, nearestPointOnLine } from '@turf/turf';

export const positionToBbox = (position: Position[]): BBox => [
  position[1][0],
  position[1][1],
  position[0][0],
  position[0][1],
];

export const expandBboxByOneZoom = (
  bbox: BBox,
  restrictionDelta?: number,
): BBox => {
  const [latX, lonX, latY, lonY] = bbox;

  const latDelta = (latY - latX) / 2;
  const lonDelta = (lonY - lonX) / 2;

  if (
    restrictionDelta &&
    (latDelta >= restrictionDelta || lonDelta >= restrictionDelta)
  )
    return bbox;

  return [latX - latDelta, lonX - lonDelta, latY + latDelta, lonY + lonDelta];
};

export const snapTo = (
  feature: Feature<Point>,
  source: FeatureCollection<Point | LineString>,
  radius = 3,
): Point | undefined =>
  source.features
    .filter(f =>
      booleanIntersects(buffer(feature, radius, { units: 'meters' }), f),
    )
    .sort(a => (a.geometry.type === 'Point' ? -1 : 1))
    .map(f => {
      const geometry =
        f.geometry.type === 'LineString'
          ? nearestPointOnLine(f.geometry, feature.geometry, {
              units: 'meters',
            }).geometry
          : f.geometry;

      return {
        ...geometry,
        distance: distance(feature.geometry, geometry, {
          units: 'meters',
        }),
      };
    })
    .sort((a, b) => a.distance - b.distance)
    .at(0);
