import React, { ForwardedRef, ReactElement } from 'react';

import { keyMap } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export interface InputSegmentChangeEvent<T extends string, V extends string> {
  segment: T;
  value: V;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

/**
 * The type for the onChange handler
 */
export type InputSegmentChangeEventHandler<
  T extends string,
  V extends string,
> = (inputSegmentChangeEvent: InputSegmentChangeEvent<T, V>) => void;

export interface InputSegmentProps<
  T extends Record<string, any>,
  V extends string,
> extends Omit<
    React.ComponentPropsWithRef<'input'>,
    'onChange' | 'size' | 'step'
  > {
  /**
   * Which segment this input represents
   * e.g. 'day'
   * e.g. 'month'
   * e.g. 'year'
   */
  segment: T[keyof T];

  /**
   * The value of the segment
   * e.g. '1'
   * e.g. '2'
   * e.g. '2025'
   */
  value: V;

  /**
   * Custom onChange handler
   */
  onChange: InputSegmentChangeEventHandler<T[keyof T], V>;

  /**
   * The number of characters per segment
   * e.g. { day: 2, month: 2, year: 4 }
   */
  charsPerSegment: Record<T[keyof T], number>;

  /**
   * Minimum value.
   * e.g. 1
   * e.g. 1
   * e.g. 1970
   */
  min: number;

  /**
   * Maximum value.
   * e.g. 31
   * e.g. 12
   * e.g. 2038
   */
  max: number;

  /**
   * Segment object
   * e.g. { Day: 'day', Month: 'month', Year: 'year' }
   */
  segmentObj: T;

  /**
   * Default minimum value
   * e.g. { day: 1, month: 1, year: 1970 }
   */
  defaultMin: Record<T[keyof T], number>;

  /**
   * Default maximum value
   * e.g. { day: 31, month: 12, year: 2038 }
   */
  defaultMax: Record<T[keyof T], number>;

  /**
   * Size of the segment
   * e.g. Size.Default
   * e.g. Size.Small
   * e.g. Size.Large
   */
  size: Size;

  /**
   * The step value for the arrow keys
   * e.g. 1
   * e.g. { day: 1, month: 1, year: 1 }
   *
   * @default 1
   */
  step?: number | Partial<Record<T[keyof T], number>>;

  /**
   * The segments that should not rollover
   * e.g. 'year'
   * e.g. ['year', 'month']
   *
   * @default undefined
   */
  shouldNotRollover?: T[keyof T] | Array<T[keyof T]>;
}

/**
 * The component type for the InputSegment
 * TODO: add why we need this
 */
export interface InputSegmentComponentType {
  <T extends Record<string, any>, V extends string>(
    props: InputSegmentProps<T, V>,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement | null;
  displayName?: string;
}
/**
 * Returns whether the given string is a valid segment
 */
export function isInputSegment<T extends Record<string, string>>(
  str: any,
  segmentObj: T,
): str is T[keyof T] {
  if (typeof str !== 'string') return false;
  return Object.values(segmentObj).includes(str);
}
