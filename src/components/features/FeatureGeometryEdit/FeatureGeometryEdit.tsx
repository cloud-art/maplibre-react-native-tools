import type { ForwardRefRenderFunction } from 'react';
import type { GeometryToolHandle } from '../../../types';

import { forwardRef, memo } from 'react';

import type { FeatureGeometryEditProps } from '../../../types';
import { LineEdit } from './LineEdit';
import { PointEdit } from './PointEdit';

export const FeatureGeometryEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  FeatureGeometryEditProps
> = ({ geometryType, ...props }, ref) => {
  //#region Render
  if (geometryType === 'Point') return <PointEdit ref={ref} {...props} />;
  if (geometryType === 'LineString') return <LineEdit ref={ref} {...props} />;
  //#endregion
};

export const FeatureGeometryEdit = memo(forwardRef(FeatureGeometryEditRender));
