import type { FC } from 'react';

import type { UserLocationProps } from '@/types';
import MapLibreGL from '@maplibre/maplibre-react-native';

export const UserLocation: FC<UserLocationProps> = ({ ...props }) => {
  // #region Render
  return <MapLibreGL.UserLocation visible {...props} />;
  // #endregion
};
