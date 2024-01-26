export const CalendarCellState = {
  Default: 'default',
  Active: 'active',
  Disabled: 'disabled',
} as const;
export type CalendarCellState =
  (typeof CalendarCellState)[keyof typeof CalendarCellState];

export const CalendarCellRangeState = {
  None: 'none',
  Start: 'start',
  End: 'end',
  Range: 'range',
} as const;
export type CalendarCellRangeState =
  (typeof CalendarCellRangeState)[keyof typeof CalendarCellRangeState];

export interface CalendarCellProps
  extends Omit<React.HTMLProps<HTMLTableCellElement>, 'onClick'> {
  /** The label for the calendar cell */
  ['aria-label']: string;

  /**
   * The current state of the cell
   */
  state?: CalendarCellState;

  /**
   * Whether the cell is in a selected range
   */
  rangeState?: CalendarCellRangeState;

  /** Whether the cell represents the current date */
  isCurrent?: boolean;

  /**
   * Whether the cell should display hovered/highlighted styles.
   * This is used to programmatically set highlight when using keyboard navigation
   */
  isHighlighted?: boolean;

  onClick?:
    | React.MouseEventHandler<HTMLTableCellElement>
    | React.KeyboardEventHandler<HTMLTableCellElement>;
}
