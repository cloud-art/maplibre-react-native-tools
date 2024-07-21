import MapLibreGL from '@maplibre/maplibre-react-native';

export const useLocation = () => {
  // #region Methods
  const getUserLocation = async () =>
    await (
      MapLibreGL.locationManager as unknown as {
        getLastKnownLocation: () => Promise<MapLibreGL.Location>;
      }
    ).getLastKnownLocation();
  // #endregion

  return {
    getUserLocation,
  };
};
