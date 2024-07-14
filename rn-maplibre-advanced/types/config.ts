import type { Position, SRID } from './geojson';

export type LogLevel = 'error' | 'warning' | 'info' | 'debug' | 'verbose';

export interface MapConfig {
  srid: SRID;
  camera: {
    defaultExtent: Position;
    transitionDuration: number;
    zoom: { step: number; fractional: boolean; default: number };
  };
  logLevel: LogLevel;
}
