import React, { ForwardedRef, ReactElement } from 'react';

import { Size } from '@leafygreen-ui/tokens';

import { InputSegmentComponentProps } from '../shared.types';

export interface InputSegmentProps<Segment extends string, Value extends string>
  extends Omit<
      React.ComponentPropsWithRef<'input'>,
      'size' | 'step' | 'value' | 'onBlur' | 'onChange' | 'min' | 'max'
    >,
    Pick<
      InputSegmentComponentProps<Segment>,
      'onChange' | 'onBlur' | 'segment' | 'segmentEnum'
    > {
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

  /**
   * The value of the segment
   *
   * @example
   * '1'
   * '2'
   * '2025'
   */
  value: Value;

  /**
   * The number of characters per segment
   *
   * @example
   * 2
   * 2
   * 4
   */
  charsPerSegment: number;

  /**
   * The size of the input box
   *
   * @example
   * Size.Default
   * Size.Small
   * Size.Large
   */
  size: Size;
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
  <Segment extends string, Value extends string>(
    props: InputSegmentProps<Segment, Value>,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement | null;
  displayName?: string;
}
