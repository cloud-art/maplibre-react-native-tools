import type { ForwardRefRenderFunction } from 'react';
import type {
  CircleGeometryLayer,
  Feature,
  FeatureCollection,
  GeometryToolHandle,
  LineGeometryLayer,
  LineString,
  Point,
} from '../../types';

import { lineString, point } from '@turf/turf';
import {
  forwardRef,
  memo,
  useCallback,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { MapContext } from '../../context';

import { CircleLayer, LineLayer } from '../geometry';

import {
  LINE_BUILDER_LINE_LAYER,
  LINE_BUILDER_POINT_LAYER,
} from '../../constants';
import { mapEvents, snapTo } from '../../utils';
import { MapExtendFeatures } from '../features';
import { MapControlTarget } from './Target';

export type MapControlLineProps = {
  feature?: Feature<LineString>;
  isTargetMode?: boolean;
  snapSource?: FeatureCollection;
};
export type MapControlLineHandle = {
  addPoint?: () => Promise<void>;
  popPoint: () => void;
} & GeometryToolHandle;

const MapControlLineRender: ForwardRefRenderFunction<
  MapControlLineHandle,
  MapControlLineProps
> = ({ feature, snapSource, isTargetMode = true }, ref) => {
  const { mapViewRef } = useContext(MapContext)!;

  // const [region, setRegion] = useState<Feature<Point, RegionPayload>>();
  const [points, setPoints] = useState<Feature<Point>[]>(
    () =>
      feature?.geometry.coordinates.map(coordinates => point(coordinates)) ??
      [],
  );

  const pointsCollection = useMemo<Omit<CircleGeometryLayer, 'type'>>(
    () => ({
      name: LINE_BUILDER_POINT_LAYER,
      collection: { type: 'FeatureCollection', features: points },
      visible: true,
    }),
    [points],
  );

  const lineCollection = useMemo<
    Omit<LineGeometryLayer, 'type'> | undefined
  >(() => {
    const coordinates = points.map(({ geometry }) => geometry.coordinates);
    // if (isTargetMode && region) coordinates.push(region.geometry.coordinates);
    if (coordinates.length <= 1) return;
    return {
      name: LINE_BUILDER_LINE_LAYER,
      collection: {
        type: 'FeatureCollection',
        features: [lineString(coordinates)],
      },
      visible: true,
    };
  }, [points]);

  const addPoint = useCallback(
    (newPoint: Feature<Point>) => {
      let pointToCreate = newPoint;

      if (snapSource?.features.length) {
        const snappedPoint = snapTo(
          newPoint,
          snapSource as FeatureCollection<LineString | Point>,
        );

        if (snappedPoint)
          pointToCreate = {
            geometry: snappedPoint,
            type: 'Feature',
            properties: {},
          };
      }

      setPoints(restPoints => [...restPoints, pointToCreate]);
    },
    [snapSource],
  );

  const addPointFromCenter = useCallback(async () => {
    const center = await mapViewRef.current?.getCenter();
    if (!center) return;
    addPoint(point(center));
  }, [addPoint]);

  const popPoint = useCallback(() => {
    setPoints(v => v.slice(0, -1));
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      addPoint: isTargetMode ? addPointFromCenter : undefined,
      popPoint,
      getValue: () => {
        if (point.length <= 1) return;
        return lineString(points.map(({ geometry }) => geometry.coordinates));
      },
    }),
    [isTargetMode, points, popPoint, addPointFromCenter],
  );

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    // unsubscribe = mapEventBus.subscribe('onRegionIsChanging', setRegion);
    if (!isTargetMode) unsubscribe = mapEvents.subscribe('onPress', addPoint);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isTargetMode, addPoint]);

  return (
    <>
      {isTargetMode && <MapControlTarget />}
      <MapExtendFeatures>
        <CircleLayer layer={pointsCollection} style={styles.points} />
        {lineCollection && (
          <LineLayer layer={lineCollection} style={styles.lines} />
        )}
      </MapExtendFeatures>
    </>
  );
};

const styles = {
  points: {
    circle: { circleColor: '#000', circleRadius: 5 },
  },
  lines: {
    line: {
      lineDasharray: [3, 3],
      lineWidth: 3,
      lineColor: '#000',
    },
  },
};

export const MapControlLine = memo(forwardRef(MapControlLineRender));
