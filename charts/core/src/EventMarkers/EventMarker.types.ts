export const EventLevel = {
  Warning: 'warning',
  Info: 'info',
} as const;
export type EventLevel = (typeof EventLevel)[keyof typeof EventLevel];
