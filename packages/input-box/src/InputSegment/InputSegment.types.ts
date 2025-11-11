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
   * 'hours'
   * 'minutes'
   * 'seconds'
   */
  segment: Segment;

  /**
   * Minimum value for the segment
   *
   * @example
   * 1
   * 1
   * 1970
   * 0
   * 0
   * 0
   */
  minSegmentValue: number;

  /**
   * Maximum value for the segment
   *
   * @example
   * 31
   * 12
   * 2038
   * 23
   * 59
   * 59
   */
  maxSegmentValue: number;

  /**
   * The step value for the arrow keys
   *
   * @default 1
   */
  step?: number;

  /**
   * Whether the segment should wrap at max boundaries when using the up arrow key.
   *
   * @default true
   */
  shouldWrap?: boolean;

  /**
   * Whether the segment should validate. Skipping validation is useful for segments that allow values outside of the default range.
   *
   * @default true
   */
  shouldValidate?: boolean;
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
