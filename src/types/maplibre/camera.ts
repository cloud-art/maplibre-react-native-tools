import type { CameraBounds as BaseCameraBounds } from '@maplibre/maplibre-react-native/javascript/components/Camera';

export type CameraBounds = BaseCameraBounds;

import type {
  CameraStop,
  UserTrackingMode,
  UserTrackingModeChangeCallback,
} from '@maplibre/maplibre-react-native/javascript/components/Camera';
import type { ViewProps } from 'react-native';

export interface CameraProps extends Omit<ViewProps, 'style'>, CameraStop {
  /**
   * If false, the camera will not send any props to the native module. Intended to be used to prevent unnecessary tile fetching and improve performance when the map is not visible. Defaults to true.
   */
  allowUpdates?: boolean;

  /**
   * Default view settings applied on camera
   */
  defaultSettings?: CameraStop;

  /**
   * The minimun zoom level of the map
   */
  minZoomLevel?: number;

  /**
   * The maximun zoom level of the map
   */
  maxZoomLevel?: number;

  /**
   * Restrict map panning so that the center is within these bounds
   */
  maxBounds?: CameraBounds;

  /**
   * Should the map orientation follow the user's.
   */
  followUserLocation?: boolean;

  /**
   * The mode used to track the user location on the map. One of; "normal", "compass", "course". Each mode string is also available as a member on the `MapLibreGL.UserTrackingModes` object. `Follow` (normal), `FollowWithHeading` (compass), `FollowWithCourse` (course). NOTE: `followUserLocation` must be set to `true` for any of the modes to take effect. [Example](../example/src/examples/Camera/SetUserTrackingModes.js)
   */
  followUserMode?: UserTrackingMode;

  /**
   * The zoomLevel on map while followUserLocation is set to `true`
   */
  followZoomLevel?: number;

  /**
   * The pitch on map while followUserLocation is set to `true`
   */
  followPitch?: number;

  /**
   * The heading on map while followUserLocation is set to `true`
   */
  followHeading?: number;

  /**
   * Manually update the camera - helpful for when props did not update, however you still want the camera to move
   */
  triggerKey?: string | number;

  // Triggered when the
  onUserTrackingModeChange?: UserTrackingModeChangeCallback;
}
