import type { FC } from 'react';

import { useState } from 'react';

import { Button, View } from 'react-native';
import { useMapCamera } from '../../hooks';

export const MapZoomControl: FC = () => {
  // #region Bindings
  const { zoomIn, zoomOut } = useMapCamera();
  // #endregion

  const [isLoading, setIsLoading] = useState(false);

  const handleZoomIn = async () => {
    setIsLoading(true);
    try {
      await zoomIn();
    } finally {
      setIsLoading(false);
    }
  };
  const handleZoomOut = async () => {
    setIsLoading(true);
    try {
      await zoomOut();
    } finally {
      setIsLoading(false);
    }
  };

  // #region Render
  return (
    <View style={{ display: 'flex', flexDirection: 'column' }}>
      <Button title="In" onPress={handleZoomIn} />
      <Button title="Out" onPress={handleZoomOut} />
    </View>
  );
  // #endregion
};
