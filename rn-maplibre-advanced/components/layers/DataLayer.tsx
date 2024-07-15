import type { OnPressEvent } from '@maplibre/maplibre-react-native';
import type { IDataLayer, LayerPressPayload } from '../../types';

import { memo, useCallback, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { GeoJSONLayer } from '../geometry';

import { getDefaultStyle, mapEvents } from '../../utils';

// #region Types
export type DataLayerProps = {
  layer: IDataLayer;
  onPress?: (event: LayerPressPayload) => void;
};
// #endregion

export const DataLayer = memo(function DataLayer({
  layer,
  layer: { params, rules, name, visible = true },
  onPress,
}: DataLayerProps) {
  // #region Methods
  const handlePress = useCallback(
    (collection: OnPressEvent) => {
      const payload = {
        collection,
        name,
        params: params?.filters,
      };
      !mapEvents.publish('onLayerPress', payload) &&
        onPress &&
        onPress(payload);
    },
    [name, params?.filters, onPress],
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
