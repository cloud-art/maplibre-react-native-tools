import type { FC } from 'react';

import MapLibreGL, { UserLocationProps } from '@maplibre/maplibre-react-native';

export const UserLocation: FC<UserLocationProps> = ({ ...props }) => {
  // #region Render
  return <MapLibreGL.UserLocation visible {...props} />;
  // #endregion
};
