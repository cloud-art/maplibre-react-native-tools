import type { Expression } from '@maplibre/maplibre-react-native';
import type { ImageURISource } from 'react-native';
import type {
  Anchor,
  ExpressionField,
  Fill,
  Graphic,
  Position,
  Stroke,
} from '../types';

import { MAX_ZOOM_LEVEL, MIN_SCALE } from '../constants';
import { stripUndefined } from './objects';

export const interpolateZoom = (
  inputRange: [number, number],
  outputRange: [ExpressionField, ExpressionField],
): Expression => [
  'interpolate',
  ['linear'],
  ['zoom'],
  inputRange[0],
  outputRange[0],
  inputRange[1],
  outputRange[1],
];

export const parseAnchor = ([x, y]: Position): Anchor => {
  const placements: Record<
    number,
    Record<number, Anchor | undefined> | undefined
  > = {
    0: { 0: 'top-left', 0.5: 'left', 1: 'bottom-left' },
    0.5: { 0: 'top', 0.5: 'center', 1: 'bottom' },
    1: { 0: 'top-right', 0.5: 'right', 1: 'bottom-right' },
  };
  try {
    return placements[x]![y]!;
  } catch {
    return 'center';
  }
};

export const scaleToZoom = (scale: number) => {
  const zoomLevel = Math.round(MAX_ZOOM_LEVEL - Math.log2(scale / MIN_SCALE));
  return zoomLevel === Infinity ? null : zoomLevel;
};

export const graphicToImage = ({
  content,
  format,
}: Pick<Graphic, 'content' | 'format'>): ImageURISource => ({
  uri: `data:${format};base64,${content}`,
  scale: 4,
});

export const parseGraphic = ({
  anchor,
  displacement,
  opacity,
  rotation,
  size,
}: Graphic) => ({
  iconAllowOverlap: true,
  iconAnchor: parseAnchor(anchor),
  iconOffset: displacement,
  iconOpacity: opacity,
  iconRotate: rotation,
  iconSize: size,
});

export const parseStroke = ({
  width,
  color,
  opacity,
  linecap,
  linejoin,
  dasharray,
}: Stroke) =>
  stripUndefined({
    lineWidth: width,
    lineColor: color,
    lineOpacity: opacity,
    lineCap: linecap,
    lineJoin: linejoin,
    lineDasharray: dasharray,
  });

export const parseFill = (
  { color, opacity }: Fill,
  zoom?: { minZoom: number; maxZoom: number },
) =>
  stripUndefined({
    fillColor:
      color &&
      (zoom
        ? interpolateZoom([zoom.minZoom, zoom.maxZoom], ['transparent', color])
        : color),
    fillOpacity: opacity,
  });
