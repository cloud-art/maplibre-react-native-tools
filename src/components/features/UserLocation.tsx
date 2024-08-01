import type { FC } from 'react';

import MapLibreGL from '@maplibre/maplibre-react-native';
import type { UserLocationProps } from '../../types';

export const UserLocation: FC<UserLocationProps> = ({ ...props }) => {
  // #region Render
  return <MapLibreGL.UserLocation visible {...props} />;
  // #endregion
};
