import React, { ForwardedRef, ReactElement } from 'react';

export interface InputSegmentProps<Segment extends string>
  extends Omit<
    React.ComponentPropsWithRef<'input'>,
    'size' | 'step' | 'value'
  > {
  /**
   * Which segment this input represents
   *
   * @example
   * 'day'
   * 'month'
   * 'year'
   */
  segment: Segment;

  /**
   * Minimum value for the segment
   *
   * @example
   * 1
   * 1
   * 1970
   */
  min: number;

  /**
   * Maximum value for the segment
   *
   * @example
   * 31
   * 12
   * 2038
   */
  max: number;

  /**
   * The step value for the arrow keys
   *
   * @default 1
   */
  step?: number;

  /**
   * Whether the segment should wrap at min/max boundaries
   *
   * @default true
   */
  shouldWrap?: boolean;

  /**
   * Whether the segment should skip validation. This is useful for segments that allow values outside of the default range.
   *
   * @default false
   */
  shouldSkipValidation?: boolean;
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
  <Segment extends string>(
    props: InputSegmentProps<Segment>,
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

/**
 * Base props for custom segment components passed to InputBox.
 *
 * Extend this interface to define props for custom segment implementations.
 * InputBox will provide additional props internally (e.g., onChange, value, min, max).
 */
export interface InputSegmentComponentProps<Segment extends string>
  extends Omit<
    React.ComponentPropsWithoutRef<'input'>,
    'onChange' | 'value' | 'min' | 'max'
  > {
  segment: Segment;
}
