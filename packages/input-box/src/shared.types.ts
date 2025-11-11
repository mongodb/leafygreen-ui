import { keyMap } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

/**
 *  Shared Input Segment Change Event
 */
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

/**
 * Shared Input Box Types
 */
export interface SharedInputBoxTypes<Segment extends string> {
  /**
   * The number of characters per segment
   *
   * @example
   * { day: 2, month: 2, year: 4 }
   */
  charsPerSegment: Record<Segment, number>;

  /**
   * An enumerable object that maps the segment names to their values
   *
   * @example
   * { Day: 'day', Month: 'month', Year: 'year' }
   */
  segmentEnum: Record<string, Segment>;

  /**
   * An object that maps the segment names to their refs
   *
   * @example
   * { day: ref, month: ref, year: ref }
   */
  segmentRefs: Record<Segment, React.RefObject<HTMLInputElement>>;

  /**
   * An object containing the values of the segments
   *
   * @example
   * { day: '1', month: '2', year: '2025' }
   */
  segments: Record<Segment, string>;

  /**
   * The size of the input box
   *
   * @example
   * Size.Default
   * Size.Small
   * Size.Large
   */
  size: Size;

  /**
   * Whether the input box is disabled
   */
  disabled: boolean;

  /**
   * id of the labelling element
   */
  labelledBy?: string;
}
