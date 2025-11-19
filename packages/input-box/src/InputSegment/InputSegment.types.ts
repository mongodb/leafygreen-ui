import { ForwardedRef, ReactElement } from 'react';

import { InputSegmentComponentProps } from '../shared.types';

export interface InputSegmentProps<Segment extends string>
  extends InputSegmentComponentProps<Segment> {
  /**
   * Minimum value for the segment
   */
  minSegmentValue: number;

  /**
   * Maximum value for the segment
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
