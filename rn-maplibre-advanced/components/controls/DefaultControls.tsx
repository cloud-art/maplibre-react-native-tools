import type { FC, PropsWithChildren } from 'react';

import { Portal, PortalHost } from '@gorhom/portal';

import { View } from 'react-native';
import { MAP_CONTROLS_PORTAL_HOST_NAME } from '../../constants';
import { MapLocationControl } from './Location';
import { MapZoomControl } from './Zoom';

const MapDefaultControls: FC = () => {
  return (
    <View
      style={{
        height: '100%',
        position: 'absolute',
        paddingVertical: 12,
        right: 12,
        top: 12,
      }}
    >
      <MapZoomControl />
      <MapLocationControl />
    </View>
  );
};

export const MapControls: FC = () => {
  //#region Render
  return (
    <>
      <MapDefaultControls />
      <PortalHost name={MAP_CONTROLS_PORTAL_HOST_NAME} />
    </>
  );
  //#endregion
};

export const MapExtendControls: FC<PropsWithChildren> = ({ children }) => {
  //#region Render
  return <Portal hostName={MAP_CONTROLS_PORTAL_HOST_NAME}>{children}</Portal>;
  //#endregion
};
