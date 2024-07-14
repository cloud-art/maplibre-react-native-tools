import type { OnPressEvent } from '@maplibre/maplibre-react-native';
import type { Feature, Point } from './geojson';
import type { Region, VisibleRegion } from './region';

export interface BaseEventMap {}

export type LayerPressPayload = {
  collection: OnPressEvent;
  name: string;
};

export interface MapEvents extends BaseEventMap {
  onPress: Feature<Point>;
  onLayerPress: LayerPressPayload;
  onRegionIsChanging: Region;
  onRegionDidChange: VisibleRegion;
}
