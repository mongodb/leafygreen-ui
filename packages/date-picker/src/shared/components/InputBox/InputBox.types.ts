import React, { FocusEventHandler, ForwardedRef, ReactElement } from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { ExplicitSegmentRule } from '../../utils/isExplicitSegmentValue';

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
   * Segment Refs
   * e.g. { day: ref, month: ref, year: ref }
   */
  segmentRefs: Record<
    T[keyof T],
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;

  /**
   * Segment object
   * e.g. { Day: 'day', Month: 'month', Year: 'year' }
   */
  segmentObj: T;

  /**
   * An object containing the values of the segments
   * e.g. { day: '1', month: '2', year: '2025' }
   */
  segments: Record<T[keyof T], string>;

  /**
   * A function that sets the value of a segment
   * e.g. (segment: 'day', value: '1') => void;
   */
  setSegment: (segment: T[keyof T], value: string) => void;

  /**
   * The format parts of the date
   */
  formatParts?: Intl.DateTimeFormatPart[];

  /**
   * The number of characters per segment
   * e.g. { day: 2, month: 2, year: 4 }
   */
  charsPerSegment: Record<T[keyof T], number>;

  /**
   * Whether the input box is disabled
   */
  disabled: boolean;

  /**
   * The rules for the segments
   * e.g. { day: { maxChars: 2, minExplicitValue: 1 }, month: { maxChars: 2, minExplicitValue: 1 }, year: { maxChars: 4, minExplicitValue: 1970 } }
   */
  segmentRules: Record<T[keyof T], ExplicitSegmentRule>;

  /**
   * A function that renders a segment
   * e.g. (props: { onChange: (event: React.ChangeEvent<HTMLInputElement>) => void, onBlur: (event: React.FocusEvent<HTMLInputElement>) => void, partType: 'day' | 'month' | 'year' }) => React.ReactElement;
   */
  renderSegment: (props: RenderSegmentProps<T[keyof T]>) => React.ReactElement;
}

/**
 * The component type for the InputBox
 * TODO: add why we need this
 */
export interface InputBoxComponentType {
  <T extends Record<string, string>>(
    props: InputBoxProps<T>,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement | null;
  displayName?: string;
}
