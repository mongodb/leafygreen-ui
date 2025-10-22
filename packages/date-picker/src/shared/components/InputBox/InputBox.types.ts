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

export interface InputBoxProps<T extends Record<string, string>>
  extends Omit<React.ComponentPropsWithRef<'div'>, 'onChange' | 'children'> {
  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: InputSegmentChangeEventHandler<T[keyof T], string>;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  // instead of T, this should  be a key from the Record<string, string>
  segmentRefs: Record<
    T[keyof T],
    ReturnType<DynamicRefGetter<HTMLInputElement>>
  >;

  /** Segment object */
  // { Day: 'day', Month: 'month', Year: 'year' }
  segmentObj: T;

  // This should be a Record where the key is the value of the segmentObj and the value is a string
  segments: Record<T[keyof T], string>;

  setSegment: (segment: T[keyof T], value: string) => void;

  formatParts?: Intl.DateTimeFormatPart[];

  charsPerSegment: Record<T[keyof T], number>;

  disabled: boolean;

  segmentRules: Record<T[keyof T], ExplicitSegmentRule>;

  renderSegment: (props: RenderSegmentProps<T[keyof T]>) => React.ReactElement;
}

export interface InputBoxComponentType {
  <T extends Record<string, string>>(
    props: InputBoxProps<T>,
    ref: ForwardedRef<HTMLDivElement>,
  ): ReactElement | null;
  displayName?: string;
}
