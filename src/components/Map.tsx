import type { CameraRef, MapViewRef } from '@maplibre/maplibre-react-native';
import type {
  CameraProps,
  Feature,
  MapEvents,
  Point,
  RegionPayload,
  VisibleRegion,
} from '../types';

import MapLibreGL, { Camera, MapView } from '@maplibre/maplibre-react-native';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';
import { MapContext } from '../context';
import { expandBboxByOneZoom, mapEvents, positionToBbox } from '../utils';
import { MapDefaultFeatures } from './features';

import mapStyle from '../mapStyle.json';
import type { MapViewProps } from '../types';
import { MapControls } from './controls';

// #region Config
void MapLibreGL.setAccessToken(null);
// #endregion

// #region Types
type MapProps = {
  camera?: CameraProps;
  onRegionDidChange?: (event: MapEvents['onRegionDidChange']) => void;
  onRegionIsChange?: (event: MapEvents['onRegionIsChanging']) => void;
  onPress?: (event: MapEvents['onPress']) => void;
} & Omit<MapViewProps, 'onRegionDidChange'>;
// #endregion

const MapChildren = memo(function MapChildren({
  camera,
  onRegionDidChange,
  onRegionIsChanging,
  onPress,
  children,
  ...props
}: MapProps) {
  // #region Bindings
  mapEvents.subscribe('onPress', () => {
    console.log('test');
  });
  const { mapViewRef, cameraRef } = useContext(MapContext)!;
  // #endregion

  const styleJSON = useMemo(() => JSON.stringify(mapStyle), []);

  // #region Methods
  const handlePress = useCallback((event: Feature) => {
    mapEvents.publish('onPress', event as Feature<Point>);
  }, []);

  const handleRegionIsChanging = useCallback(
    (feature: Feature<Point, RegionPayload>) => {
      mapEvents.publish('onRegionIsChanging', feature);
    },
    [],
  );
  const handleRegionDidChange = useCallback(
    (event: Feature<Point, RegionPayload>) => {
      const visibleBBox = positionToBbox(event.properties.visibleBounds);
      const expandedBBox = expandBboxByOneZoom(visibleBBox, 1);
      const region: VisibleRegion = {
        ...event,
        properties: { ...event.properties, visibleBBox, expandedBBox },
      };
      mapEvents.publish('onRegionDidChange', region);
    },
    [],
  );
  // #endregion

  // #region LifeCycle
  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (onRegionDidChange)
      unsubscribe = mapEvents.subscribe('onRegionDidChange', onRegionDidChange);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (onRegionIsChanging)
      unsubscribe = mapEvents.subscribe(
        'onRegionIsChanging',
        onRegionIsChanging,
      );
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    if (onPress) unsubscribe = mapEvents.subscribe('onPress', onPress);
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  // #endregion

  // #region Render
  return (
    <MapView
      ref={mapViewRef}
      attributionEnabled={false}
      compassEnabled={false}
      regionDidChangeDebounceTime={10}
      regionWillChangeDebounceTime={0}
      style={StyleSheet.absoluteFill}
      styleJSON={styleJSON}
      onPress={handlePress}
      onRegionDidChange={handleRegionDidChange}
      onRegionIsChanging={handleRegionIsChanging}
      {...props}
    >
      <Camera ref={cameraRef} maxZoomLevel={20} {...camera} />

      {children}
      <MapDefaultFeatures />
      <MapControls />
    </MapView>
  );
  // #endregion
});

export const Map = memo(function Map({ ...props }: MapProps) {
  const cameraRef = useRef<CameraRef>(null);
  const mapViewRef = useRef<MapViewRef>(null);

  return (
    <MapContext.Provider value={{ cameraRef, mapViewRef }}>
      <MapChildren {...props} />
    </MapContext.Provider>
  );
});
