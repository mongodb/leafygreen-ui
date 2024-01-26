export const DateSegment = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
export type DateSegment = (typeof DateSegment)[keyof typeof DateSegment];

export type DateSegmentValue = string;

export type DateSegmentsState = Record<DateSegment, DateSegmentValue>;

export function isDateSegment(str: any): str is DateSegment {
  if (typeof str !== 'string') return false;
  return ['day', 'month', 'year'].includes(str);
}
