import type { PropsWithChildren } from 'react';

import { Portal, PortalHost } from '@gorhom/portal';
import { memo } from 'react';
import { MAP_FEATURES_PORTAL_HOST_NAME } from '../../constants';

export const MapDefaultFeatures = memo(function MapDefaultFeatures() {
  //#region Render
  return <PortalHost name={MAP_FEATURES_PORTAL_HOST_NAME} />;
  //#endregion
});

export const MapExtendFeatures = memo(function MapExtendsFeatures({
  children,
}: PropsWithChildren) {
  //#region Render
  return <Portal hostName={MAP_FEATURES_PORTAL_HOST_NAME}>{children}</Portal>;
  //#endregion
});
