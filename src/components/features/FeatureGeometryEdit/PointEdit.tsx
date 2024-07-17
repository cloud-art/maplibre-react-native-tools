import type { ForwardRefRenderFunction } from 'react';
import type {
  CircleGeometryLayer,
  Feature,
  GeometryToolHandle,
  LayerEditProps,
  Point,
} from '../../../types';

import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MapControlTarget } from '../../controls';

import { MapExtendFeatures } from '../MapExtend';

import { CircleLayer } from '../../geometry';

import { mapEvents } from '../../../utils';

const PointEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  LayerEditProps
> = ({ feature, isTargetMode = true }, ref) => {
  const mapControlTargetRef = useRef<GeometryToolHandle>(null);

  const [point, setPoint] = useState<Feature<Point>>();

  const pointCollection = useMemo<
    Omit<CircleGeometryLayer, 'type'> | undefined
  >(
    () =>
      point && {
        name: 'POINT_PREVIEW',
        collection: { type: 'FeatureCollection', features: [point] },
        visible: true,
      },
    [point],
  );

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (!isTargetMode) unsubscribe = mapEvents.subscribe('onPress', setPoint);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, [isTargetMode]);

  useImperativeHandle(
    ref,
    () => ({
      getValue: isTargetMode
        ? async () => await mapControlTargetRef.current?.getValue()
        : () => point,
    }),
    [point, isTargetMode],
  );

  return isTargetMode ? (
    <MapControlTarget
      ref={mapControlTargetRef}
      feature={feature as Feature<Point>}
    />
  ) : (
    pointCollection && (
      <MapExtendFeatures>
        <CircleLayer layer={pointCollection} style={styles.points} />
      </MapExtendFeatures>
    )
  );
};

export const PointEdit = memo(forwardRef(PointEditRender));

const styles = {
  points: {
    circle: {
      circleColor: '#000',
      circleRadius: 5,
      circleStrokeWidth: 3,
      circleStrokeColor: '#fff',
    },
  },
};
