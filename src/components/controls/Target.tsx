import type { ForwardRefRenderFunction } from 'react';
import {
  View,
  type LayoutChangeEvent,
  type LayoutRectangle,
} from 'react-native';
import type { Feature, GeometryToolHandle, Point } from '../../types';

import { point } from '@turf/turf';

import {
  forwardRef,
  memo,
  useContext,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';

import { MapContext } from '../../context';
import { MapExtendControls } from './DefaultControls';

export type MapControlTargetProps = {
  feature?: Feature<Point>;
};

const MapControlTargetRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  MapControlTargetProps
> = ({ feature }, ref) => {
  // #region Bindings
  const { mapViewRef, cameraRef } = useContext(MapContext)!;
  // #endregion

  // #region State
  const [layout, setLayout] = useState<LayoutRectangle>();
  // #endregion

  const containerStyle = useMemo(
    () =>
      layout
        ? {
            transform: [
              { translateX: -layout.width / 2 },
              { translateY: -layout.height + 2 },
            ],
          }
        : { opacity: 0 },
    [layout],
  );

  // #region Methods
  const initMapCenter = () => {
    feature && cameraRef.current?.moveTo(feature.geometry.coordinates, 0);
  };
  const handleLayout = (e: LayoutChangeEvent) => {
    setLayout(e.nativeEvent.layout);
  };
  // #endregion

  // #region Lifecycle
  useEffect(() => {
    initMapCenter();
  }, []);
  // #endregion

  useImperativeHandle(
    ref,
    () => ({
      getValue: async () => {
        return (
          mapViewRef.current && point(await mapViewRef.current.getCenter())
        );
      },
    }),
    [],
  );

  // #region Render
  return (
    <MapExtendControls>
      <View
        style={{
          alignItems: 'center',
          left: '50%',
          position: 'absolute',
          top: '50%',
          ...containerStyle,
        }}
        onLayout={handleLayout}
      >
        <View
          style={{ backgroundColor: 'black', padding: 6, borderRadius: '100%' }}
        >
          <View
            style={{
              backgroundColor: 'white',
              height: 17,
              width: 17,
              borderRadius: '100%',
            }}
          />
        </View>
        <View style={{ backgroundColor: 'black', height: 18, width: 2 }} />
        <View
          style={{
            backgroundColor: 'black',
            height: 4,
            width: 4,
            marginTop: -2,
            borderRadius: '100%',
          }}
        />
      </View>
    </MapExtendControls>
  );
  // #endregion
};

export const MapControlTarget = memo(forwardRef(MapControlTargetRender));
