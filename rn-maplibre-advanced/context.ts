import type MapLibreGL from '@maplibre/maplibre-react-native';
import type { RefObject } from 'react';

import { createContext } from 'react';

export type MapContextValue = {
  mapViewRef: RefObject<MapLibreGL.MapView>;
  cameraRef: RefObject<MapLibreGL.Camera>;
};

export const MapContext = createContext<MapContextValue | null>(null);
MapContext.displayName = 'MapContext';
