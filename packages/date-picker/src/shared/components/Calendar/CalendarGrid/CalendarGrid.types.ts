export interface CalendarGridProps
  extends Omit<React.HTMLProps<HTMLTableElement>, 'children'> {
  /**
   * The month to display in the calendar grid
   * @default {current month}
   */
  month: Date;

  children: (day: Date, index: number) => React.ReactNode;
}
