import type { IDataLayer, LayerPressPayload } from '@/features/map/types';
import type { OnPressEvent } from '@maplibre/maplibre-react-native';

import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import {
  GeoJSONLayer,
  selectListenEvents,
  useFetchVisibleFeatures,
  useMapStore,
} from '@/features/map';
import { mapEventBus } from '@/features/map/utils';

import { getDefaultStyle } from '../../styles';

// #region Types
export type DataLayerProps = {
  layer: IDataLayer;
  onPress?: (event: LayerPressPayload) => void;
};
// #endregion

const DataLayer = memo(function DataLayer({
  layer,
  layer: { source, params, rules, name, visible = true },
  onPress,
}: DataLayerProps) {
  // #region Inject
  useFetchVisibleFeatures({
    name,
    source,
    visible,
    params,
  });
  // #endregion

  const listenEvents = useMapStore(selectListenEvents);

  // #region Methods
  const handlePress = useCallback(
    (collection: OnPressEvent) => {
      const payload = {
        collection,
        source,
        name,
        params: params?.filters,
      };
      !mapEventBus.publish('onLayerPress', payload) &&
        onPress &&
        onPress(payload);
    },
    [source, name, params?.filters, onPress],
  );
  // #endregion

  // #region Computed
  const styles = useMemo(
    () => StyleSheet.flatten([getDefaultStyle({ visible }), params?.style]),
    [visible, params?.style],
  );

  // #endregion

  // #region Render
  return (
    <GeoJSONLayer
      layer={layer}
      rules={rules}
      style={styles}
      onPress={handlePress}
    />
  );
  // #endregion
});
