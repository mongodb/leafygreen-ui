import type { Theme } from '@leafygreen-ui/lib';

export const EventLevel = {
  Warning: 'warning',
  Info: 'info',
} as const;
export type EventLevel = (typeof EventLevel)[keyof typeof EventLevel];

export interface BaseEventMarkerProps {
  name: string;
  theme: Theme;
  label: string;
  message: string;
  level: EventLevel;
  position: [string | number, string | number] | string | number;
  type: 'line' | 'point';
}
