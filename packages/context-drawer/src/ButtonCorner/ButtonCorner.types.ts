export const Side = {
  Left: 'left',
  Right: 'right',
} as const;
export type Side = (typeof Side)[keyof typeof Side];
