export const daysPerWeek = 7 as const;

// Note: no lightweight library (date-fns, day.js, @internationalized)
// includes a similar enum
export const DaysOfWeek = [
  { long: 'Sunday', short: 'su' },
  { long: 'Monday', short: 'mo' },
  { long: 'Tuesday', short: 'tu' },
  { long: 'Wednesday', short: 'we' },
  { long: 'Thursday', short: 'th' },
  { long: 'Friday', short: 'fr' },
  { long: 'Saturday', short: 'sa' },
] as const;

export type DaysOfWeek = (typeof DaysOfWeek)[number];

export interface CalendarGridProps
  extends Omit<React.HTMLProps<HTMLTableElement>, 'children'> {
  /**
   * The month to display in the calendar grid
   * @default {current month}
   */
  month: Date;

  children: (day: Date, index: number) => React.ReactNode;
}
