import React, { ForwardedRef, ReactElement } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

import {
  InputSegmentChangeEventHandler,
  InputSegmentComponentProps,
  SharedInputBoxTypes,
} from '../shared.types';
import { ExplicitSegmentRule } from '../utils';

export interface InputChangeEvent<Segment extends string = string> {
  value: DateType;
  segments: Record<Segment, string>;
}

export type InputChangeEventHandler<Segment extends string = string> = (
  changeEvent: InputChangeEvent<Segment>,
) => void;

export interface InputBoxProps<Segment extends string>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'children'>,
    SharedInputBoxTypes<Segment> {
  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: InputSegmentChangeEventHandler<Segment, string>;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /**
   * A function that sets the value of a segment
   *
   * @example
   * (segment: 'day', value: '1') => void;
   */
  setSegment: (segment: Segment, value: string) => void;

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
  charsPerSegment: Record<Segment, number>;

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
  segmentRules: Record<Segment, ExplicitSegmentRule>;

  /**
   * The component that renders a segment. When mapping over the formatParts, we will render the segment component for each part using this component.
   * This should be a React component that accepts the InputSegmentComponentProps<Segment> type.
   *
   * @example
   * segmentComponent={DateInputSegment}
   */
  segmentComponent: React.ComponentType<InputSegmentComponentProps<Segment>>;
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
  <Segment extends string>(
    props: InputBoxProps<Segment>,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement | null;
  displayName?: string;
}
