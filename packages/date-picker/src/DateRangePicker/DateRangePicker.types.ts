import { MouseEventHandler } from 'react';

import { BaseDatePickerProps, DateRangeType } from '../types';

export interface DateRangePickerProps extends BaseDatePickerProps {
  /**
   * The selected start & end date
   */
  value?: DateRangeType;

  /**
   * Callback fired when the “Apply” button is clicked, or when either the start or end date changes. If either start or end is unset, then that value will be null.
   *
   * Parameter `range[0]` represents the start date,
   * and `range[1]` represents the end date.
   *
   * Callback date arguments will be in Date objects in UTC time, or null
   */
  onChange?: (range?: DateRangeType) => void;

  /**
   * The initial selected start & end dates.
   *
   * A given initial index is ignored if `range[x]` is defined
   */
  initialValue?: DateRangeType;

  // TODO: onSegmentChange: () => {};

  /**
   * A callback fired when validation should run, based on our form validation guidelines.
   * Use this callback to compute the correct `state` value.
   *
   * Parameter `range[0]` represents the start date, and `range[1]` represents the end date.
   *
   * Callback date arguments will be in Date objects in UTC time, or null
   */
  handleValidation?: (range?: DateRangeType) => void;

  /** Callback fired when the “clear” button is clicked. */
  onClear?: MouseEventHandler;

  /** Callback fired when the “cancel” button is clicked.  */
  onCancel?: MouseEventHandler;

  /** Whether or not to show the Quick Range Selection menu */
  showQuickSelection?: boolean;
}
