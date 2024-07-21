import type {
  Feature,
  GeometryToolHandle,
  LayerEditProps,
  LineString,
} from '@/types';
import type { ForwardRefRenderFunction } from 'react';
import { forwardRef, memo, useImperativeHandle, useRef } from 'react';
import { MapControlLine } from '../../controls';

export type MapControlLineHandle = {
  addPoint?: () => Promise<void>;
  popPoint: () => void;
} & GeometryToolHandle;

const LineEditRender: ForwardRefRenderFunction<
  GeometryToolHandle,
  LayerEditProps
> = ({ feature, snapSource, isTargetMode = true }, ref) => {
  const controlRef = useRef<MapControlLineHandle>(null);

  useImperativeHandle(
    ref,
    () => ({
      getValue: () => {
        return controlRef.current?.getValue();
      },
    }),
    [],
  );

  return (
    <MapControlLine
      ref={controlRef}
      feature={feature as Feature<LineString>}
      isTargetMode={isTargetMode}
      snapSource={snapSource}
    />
  );
};

export const LineEdit = memo(forwardRef(LineEditRender));
