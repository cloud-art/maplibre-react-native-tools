import type { Location } from '@maplibre/maplibre-react-native';
import type { ReactElement } from 'react';

export interface UserLocationProps {
  /**
   * Whether location icon is animated between updates
   */
  animated?: boolean;
  /**
   * Which render mode to use.
   * Can either be `normal` or `native`
   */
  renderMode?: 'normal' | 'native';
  /**
   * native/android only render mode
   *
   *  - normal: just a circle
   *  - compass: triangle with heading
   *  - gps: large arrow
   *
   * @platform android
   */
  androidRenderMode?: 'normal' | 'compass' | 'gps';
  /**
   * Whether location icon is visible
   */
  visible?: boolean;
  /**
   * Callback that is triggered on location icon press
   */
  onPress?(): void;
  /**
   * Callback that is triggered on location update
   */
  onUpdate?(location: Location): void;
  /**
   * Show or hide small arrow which indicates direction the device is pointing relative to north.
   */
  showsUserHeadingIndicator?: boolean;
  /**
   * Minimum amount of movement before GPS location is updated in meters
   */
  minDisplacement?: number;
  /**
   * Custom location icon of type mapbox-gl-native components
   *
   * NOTE: Forking maintainer does not understand the above comment.
   */
  children?: ReactElement | ReactElement[];
}
