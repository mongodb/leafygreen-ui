import React from 'react';

import { DateType } from '@leafygreen-ui/date-utils';

import { InputSegmentChangeEventHandler } from '../InputSegment/InputSegment.types';
import { DynamicRefGetter } from '@leafygreen-ui/hooks';
import { ExplicitSegmentRule } from '../../utils/isExplicitSegmentValue';

export interface InputChangeEvent<T extends string = string> {
  value: DateType;
  segments: Record<T, string>;
}

export type InputChangeEventHandler<T extends string = string> = (
  changeEvent: InputChangeEvent<T>,
) => void;

export interface InputBoxProps<T extends string = string>
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'onChange' | 'children'> {
  /**
   * Date value passed into the component
   */
  value?: DateType;

  /**
   * Value setter callback.
   */
  setValue?: InputChangeEventHandler<T>;

  /**
   * Callback fired when any segment changes, but not necessarily a full value
   */
  onSegmentChange?: InputSegmentChangeEventHandler;

  /**
   * id of the labelling element
   */
  labelledBy?: string;

  /** Refs  */
  segmentRefs: Record<T, ReturnType<DynamicRefGetter<HTMLInputElement>>>;

  /** Segment object */
  segmentObj: Readonly<Record<string, T>>;

  /** Default minimum value */
  defaultMin: Record<T, number>;

  /** Default maximum value */
  defaultMax: Record<T, number>;

  segments: Record<T, string>;

  setSegment: (segment: T, value: string) => void;

  formatParts: Intl.DateTimeFormatPart[];

  charsPerSegment: Record<T, number>;

  disabled: boolean;

  children: React.ReactElement;

  segmentRules: Record<T, ExplicitSegmentRule>;
}
