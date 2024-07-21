import type { FC } from 'react';

import { useMapCamera } from '@/hooks';
import { Button } from 'react-native';

export const MapLocationControl: FC = () => {
  // #region Bindings
  const { flyToUserLocation } = useMapCamera();
  // #endregion

  const handlePress = () => flyToUserLocation();

  // #region Render
  return <Button title="location" onPress={handlePress} />;
  // #endregion
};
