import type { CameraConfig, Feature, Position } from '@/types';
import type { Geometry } from 'geojson';

import { MapContext } from '@/context';
import { sleep } from '@/utils';
import { bbox } from '@turf/turf';
import { useContext } from 'react';

import type { CameraRef } from '@maplibre/maplibre-react-native';
import { useLocation } from './location';

// #region Types
export type UseMapConfigProps = CameraConfig;
// #endregion

export const useMapCamera = (
  {
    transitionDuration = 350,
    zoom = { step: 1, fractional: false, default: 11 },
  }: UseMapConfigProps = {
    transitionDuration: 350,
    zoom: { step: 1, fractional: false, default: 11 },
  },
) => {
  // #region Bindings
  const { cameraRef, mapViewRef } = useContext(MapContext)!;
  const { getUserLocation } = useLocation();
  // #endregion

  // #region Methods
  // #region Camera
  const fitBounds: CameraRef['fitBounds'] = (
    northEastCoordinates,
    southWestCoordinates,
    padding,
    duration,
  ) => {
    cameraRef.current?.fitBounds(
      northEastCoordinates,
      southWestCoordinates,
      padding,
      duration,
    );
  };
  const fit = (feature: Feature<Geometry>) => {
    if (!feature.geometry) {
      console.error(
        `Feature with id ${
          feature.id?.toString() ?? 'NO_ID'
        } has no geometry to fit camera`,
      );
      return;
    }
    const extent = bbox(feature);
    fitBounds([extent[0], extent[1]], [extent[2], extent[3]], [0, 20]);
  };
  const flyTo: CameraRef['flyTo'] = (
    coordinates,
    duration = transitionDuration,
  ) => {
    cameraRef.current?.flyTo(coordinates, duration);
  };
  const moveTo: CameraRef['moveTo'] = (
    coordinates: Position,
    duration = transitionDuration,
  ) => {
    cameraRef.current?.moveTo(coordinates, duration);
  };
  const flyToWithZoom = async ({
    zoomLevel,
    ...moveParams
  }: {
    zoomLevel: number;
    coordinates: Position;
    duration?: number;
  }) => {
    const move = (await getZoom()) >= zoomLevel ? moveTo : flyTo;
    move(moveParams.coordinates);
    await sleep(moveParams.duration ?? transitionDuration);
    setZoom(zoomLevel);
  };
  const flyToUserLocation = async (zoomLevel = 15) => {
    const {
      coords: { latitude, longitude },
    } = await getUserLocation();

    await flyToWithZoom({ coordinates: [longitude, latitude], zoomLevel });
  };
  // #endregion Camera

  // #region Zoom
  const roundZoom = (level: number, delta: number) => {
    const round = delta < 0 ? Math.floor : Math.ceil;
    return round(level);
  };
  const getZoom = async () => {
    return (await mapViewRef.current?.getZoom()) ?? zoom.default;
  };
  const setZoom = (level = zoom.default, duration = transitionDuration) => {
    cameraRef.current?.zoomTo(level, duration);
  };
  const updateZoomWithDelta = async (
    delta: number,
    fractional = zoom.fractional,
  ) => {
    const currentZoom = await getZoom();
    let processedZoom = currentZoom + delta;
    if (!fractional) processedZoom = roundZoom(processedZoom, delta);
    setZoom(processedZoom);
  };
  const zoomIn = async (delta = zoom.step) => {
    await updateZoomWithDelta(delta);
  };
  const zoomOut = async (delta = zoom.step) => {
    await updateZoomWithDelta(-delta);
  };
  // #endregion Zoom
  // #endregion Methods

  return {
    moveTo,
    fit,
    fitBounds,
    flyTo,
    flyToWithZoom,
    flyToUserLocation,
    getZoom,
    setZoom,
    updateZoomWithDelta,
    zoomIn,
    zoomOut,
  };
};
