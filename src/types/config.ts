import type { Position, SRID } from './geojson';

export type LogLevel = 'error' | 'warning' | 'info' | 'debug' | 'verbose';

export interface CameraConfig {
  defaultExtent?: Position;
  transitionDuration?: number;
  zoom?: { step: number; fractional: boolean; default: number };
}

export interface MapConfig {
  srid: SRID;
  camera: CameraConfig;
  logLevel: LogLevel;
}
