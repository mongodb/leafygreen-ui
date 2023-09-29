import { MouseEventHandler } from 'react';

import { BaseDatePickerProps, DateType } from '../types';

export type DateRangeType = [DateType, DateType];

export interface DateRangePickerProps extends BaseDatePickerProps {
  /** The selected start date */
  start?: DateType;

  /**  The selected end date */
  end?: DateType;

  /**
   * Callback fired when the “Apply” button is clicked, or when either the start or end date changes. If either start or end is unset, then that value will be null.
   *
   * Parameter `range[0]` represents the start date,
   * and `range[1]` represents the end date.
   *
   * Callback date arguments will be in Date objects in UTC time, or null
   */
  onRangeChange?: (range?: DateRangeType) => void;

  /** The initial selected start date. Ignored if `start` is provided */
  initialStart?: DateType;

  /** The initial selected end date. Ignored if `end` is provided */
  initialEnd?: DateType;

  // TODO: onSegmentChange: () => {};

  /**
   * A callback fired when validation should run, based on our form validation guidelines.
   * Use this callback to compute the correct `state` value.
   *
   * Parameter `range[0]` represents the start date, and `range[1]` represents the end date.
   *
   * Callback date arguments will be in Date objects in UTC time, or null
   */
  handleValidation?: (range: DateRangeType) => void;

  /** Callback fired when the “clear” button is clicked. */
  onClear?: MouseEventHandler;

  /** Callback fired when the “cancel” button is clicked.  */
  onCancel?: MouseEventHandler;

  /** Whether or not to show the Quick Range Selection menu */
  showQuickSelection?: boolean;
}
