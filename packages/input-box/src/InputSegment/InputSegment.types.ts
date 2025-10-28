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
  charsPerSegment: Record<T[keyof T], number>; // TODO: make this a number?

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
   * Size of the segment
   * e.g. Size.Default
   * e.g. Size.Small
   * e.g. Size.Large
   */
  size: Size;

  /**
   * The step value for the arrow keys
   *
   * @default 1
   */
  step?: number;

  /**
   * Whether the segment should not rollover
   *
   * @default false
   */
  shouldNotRollover?: boolean;
}

/**
 * Type definition for the InputSegment component that maintains generic type safety with forwardRef.
 *
 * Interface with a generic call signature that preserves type parameters(<T>) when using forwardRef.
 * React.forwardRef loses type parameters, so this interface is used to restore them.
 *
 * @see https://stackoverflow.com/a/58473012
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
