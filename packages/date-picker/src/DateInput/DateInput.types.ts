export const DateSegment = {
  Day: 'day',
  Month: 'month',
  Year: 'year',
} as const;
export type DateSegment = (typeof DateSegment)[keyof typeof DateSegment];

export type DateSegmentValue = number;

export type DateSegmentsState = Record<
  DateSegment,
  DateSegmentValue | undefined
>;

export function isDateSegment(str: string): str is DateSegment {
  return ['day', 'month', 'year'].includes(str);
}
