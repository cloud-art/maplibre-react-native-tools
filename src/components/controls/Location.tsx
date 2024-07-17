import type { FC } from 'react';

import { Button } from 'react-native';
import { useMapCamera } from '../../hooks';

export const MapLocationControl: FC = () => {
  // #region Bindings
  const { flyToUserLocation } = useMapCamera();
  // #endregion

  const handlePress = () => flyToUserLocation();

  // #region Render
  return <Button title="location" onPress={handlePress} />;
  // #endregion
};
