import { keyMap } from '@leafygreen-ui/lib';

/**
 *  SharedInput Segment Types
 */

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
 * Returns whether the given string is a valid segment
 */
export function isInputSegment<T extends Record<string, string>>(
  segment: unknown,
  segmentObj: T,
): segment is T[keyof T] {
  if (typeof segment !== 'string') return false;
  return Object.values(segmentObj).includes(segment);
}

/**
 * Base props for custom segment components passed to InputBox.
 *
 * Extend this interface to define props for custom segment implementations.
 */
export interface InputSegmentComponentProps<Segment extends string>
  extends Omit<
      React.ComponentPropsWithRef<'input'>,
      'onChange' | 'value' | 'disabled'
    >,
    SharedInputBoxTypes<Segment> {
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
   * The handler for the onChange event that will be read in the InputSegment component
   *
   * @example
   * (event: InputSegmentChangeEvent<Segment, string>) => void
   */
  onChange: InputSegmentChangeEventHandler<Segment, string>;

  /**
   * The value of the segment
   *
   * @example
   * '1'
   * '2'
   * '2025'
   */
  value: string;
}

/**
 * Shared Input Box Types
 *
 * These types are shared between the InputBox and the segmentComponent.
 */
export interface SharedInputBoxTypes<Segment extends string> {
  /**
   * An enumerable object that maps the segment names to their values
   *
   * @example
   * { Day: 'day', Month: 'month', Year: 'year' }
   */
  segmentEnum: Record<string, Segment>;

  /**
   * Whether the input box is disabled
   */
  disabled: boolean;
}
