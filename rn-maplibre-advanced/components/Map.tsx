import type {
  CameraProps,
  MapViewProps,
  RegionPayload,
} from '@maplibre/maplibre-react-native';
import type { Feature, MapEvents, Point, VisibleRegion } from '../types';

import MapLibreGL from '@maplibre/maplibre-react-native';
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
} from 'react';
import { StyleSheet } from 'react-native';

import { MapContext } from '../context';
import { expandBboxByOneZoom, mapEvents, positionToBbox } from '../utils';
import { MapDefaultFeatures } from './features';

import mapStyle from '../mapStyle.json';
import { MapControls } from './controls';

// #region Config
MapLibreGL.setAccessToken(null);
// #endregion

// #region Types
type MapProps = Omit<MapViewProps, 'onRegionDidChange'> & {
  camera?: CameraProps;
  onRegionDidChange?: (event: MapEvents['onRegionDidChange']) => void;
  onRegionIsChange?: (event: MapEvents['onRegionIsChanging']) => void;
  onPress?: (event: MapEvents['onPress']) => void;
};
// #endregion

const MapChildren = memo(function MapChildren({
  camera,
  onRegionDidChange,
  onRegionIsChanging,
  onPress,
  children,
  ...props
}: MapProps) {
  // #region Constants
  const mapId = useId();
  // #endregion

  // #region Bindings
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
    <MapLibreGL.MapView
      id={mapId}
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
      <MapLibreGL.Camera ref={cameraRef} maxZoomLevel={20} {...camera} />

      {children}
      <MapDefaultFeatures />
      <MapControls />
    </MapLibreGL.MapView>
  );
  // #endregion
});

export const Map = memo(function Map({ ...props }: MapProps) {
  const cameraRef = useRef<MapLibreGL.Camera>(null);
  const mapViewRef = useRef<MapLibreGL.MapView>(null);

  return (
    <MapContext.Provider value={{ cameraRef, mapViewRef }}>
      <MapChildren {...props} />
    </MapContext.Provider>
  );
});
