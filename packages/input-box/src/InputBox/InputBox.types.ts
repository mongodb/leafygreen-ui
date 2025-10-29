import React, { FocusEventHandler, ForwardedRef, ReactElement } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';

import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import { ExplicitSegmentRule } from '../utils/createExplicitSegmentValidator';

export interface RenderSegmentProps<T extends string = string> {
  onChange: InputSegmentChangeEventHandler<T, string>;
  onBlur: FocusEventHandler<HTMLInputElement>;
  partType: T;
}

export interface InputChangeEvent<T extends string = string> {
  value: DateType;
  segments: Record<T, string>;
}

export type InputChangeEventHandler<T extends string = string> = (
  changeEvent: InputChangeEvent<T>,
) => void;

export interface InputBoxProps<T extends Record<string, any>>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'children'> {
  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: InputSegmentChangeEventHandler<T[keyof T], string>;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /**
   * An object that maps the segment names to their refs
   *
   * @example
   * { day: ref, month: ref, year: ref }
   */
  segmentRefs: Record<
    T[keyof T],
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;

  /**
   * An enumerable object that maps the segment names to their values
   *
   * @example
   * { Day: 'day', Month: 'month', Year: 'year' }
   */
  segmentObj: T;

  /**
   * An object containing the values of the segments
   *
   * @example
   * { day: '1', month: '2', year: '2025' }
   */
  segments: Record<T[keyof T], string>;

  /**
   * A function that sets the value of a segment
   *
   * @example
   * (segment: 'day', value: '1') => void;
   */
  setSegment: (segment: T[keyof T], value: string) => void;

  /**
   * The format parts of the date
   *
   * @example
   * [
   *   { type: 'month', value: '02' },
   *   { type: 'literal', value: '-' },
   *   { type: 'day', value: '02' },
   *   { type: 'literal', value: '-' },
   *   { type: 'year', value: '2025' },
   * ]
   */
  formatParts?: Array<Intl.DateTimeFormatPart>;

  /**
   * The number of characters per segment
   *
   * @example
   * { day: 2, month: 2, year: 4 }
   */
  charsPerSegment: Record<T[keyof T], number>;

  /**
   * Whether the input box is disabled
   *
   * @default false
   */
  disabled?: boolean;

  /**
   * An object that maps the segment names to their rules.
   *
   * maxChars: the maximum number of characters for the segment
   * minExplicitValue: the minimum explicit value for the segment
   *
   * @example
   * {
   *   day: { maxChars: 2, minExplicitValue: 1 },
   *   month: { maxChars: 2, minExplicitValue: 4 },
   *   year: { maxChars: 4, minExplicitValue: 1970 },
   * }
   *
   * Explicit: Day = 5, 02
   * Ambiguous: Day = 2 (could be 20-29)
   *
   */
  segmentRules: Record<T[keyof T], ExplicitSegmentRule>;
  /**
   * An object that maps the segment names to their minimum values
   *
   * @example
   * { day: 0, month: 1, year: 1970 }
   */
  minValues: Record<T[keyof T], number>;

  /**
   * A function that renders a segment
   *
   * @example
   * (props: {
   *   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
   *   onBlur: (event: React.FocusEvent<HTMLInputElement>) => void,
   *   partType: 'day' | 'month' | 'year',
   * }) => React.ReactElement;
   */
  renderSegment: (props: RenderSegmentProps<T[keyof T]>) => React.ReactElement;
}

/**
 * Type definition for the InputBox component that maintains generic type safety with forwardRef.
 *
 * Interface with a generic call signature that preserves type parameters(<T>) when using forwardRef.
 * React.forwardRef loses type parameters, so this interface is used to restore them.
 *
 * @see https://stackoverflow.com/a/58473012
 */
export interface InputBoxComponentType {
  <T extends Record<string, string>>(
    props: InputBoxProps<T>,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement | null;
  displayName?: string;
}
