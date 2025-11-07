import { keyMap } from '@leafygreen-ui/lib';

export interface InputSegmentChangeEvent<
  Segment extends string,
  Value extends string,
> {
  segment: Segment;
  value: Value;
  meta?: {
    key?: (typeof keyMap)[keyof typeof keyMap];
    min: number;
    [key: string]: any;
  };
}

/**
 * The type for the onChange handler
 */
export type InputSegmentChangeEventHandler<
  Segment extends string,
  Value extends string,
> = (inputSegmentChangeEvent: InputSegmentChangeEvent<Segment, Value>) => void;
