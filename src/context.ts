import type { CameraRef, MapViewRef } from '@maplibre/maplibre-react-native';
import type { RefObject } from 'react';

import { createContext } from 'react';

export type MapContextValue = {
  mapViewRef: RefObject<MapViewRef>;
  cameraRef: RefObject<CameraRef>;
};

export const MapContext = createContext<MapContextValue | null>(null);
MapContext.displayName = 'MapContext';
