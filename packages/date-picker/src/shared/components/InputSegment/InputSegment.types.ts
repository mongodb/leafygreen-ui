import React, { ForwardedRef, ReactElement } from 'react';

import { keyMap } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

export interface InputSegmentChangeEvent<
  T extends string = string,
  V extends string = string,
> {
  segment: T;
  value: V;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    [key: string]: any;
  };
}

export type InputSegmentChangeEventHandler<
  T extends string = string,
  V extends string = string,
> = (inputSegmentChangeEvent: InputSegmentChangeEvent<T, V>) => void;

export interface InputSegmentProps<
  T extends string = string,
  V extends string = string,
> extends Omit<React.ComponentPropsWithRef<'input'>, 'onChange' | 'size'> {
  /** Which segment this input represents */
  segment: T;

  /** The value of the segment */
  value: V;

  /** Custom onChange handler */
  onChange: InputSegmentChangeEventHandler<T, V>;

  charsPerSegment: Record<T, number>;

  /** Minimum value. */
  min: number;

  /** Maximum value. */
  max: number;

  /** Segment object */
  segmentObj: Readonly<Record<string, T>>;

  /** Default minimum value */
  defaultMin: Record<T, number>;

  /** Default maximum value */
  defaultMax: Record<T, number>;

  size: Size;
}

export interface InputSegmentComponentType {
  <T extends string, V extends string>(
    props: InputSegmentProps<T, V>,
    ref: ForwardedRef<HTMLInputElement>,
  ): ReactElement | null;
  displayName?: string;
}
