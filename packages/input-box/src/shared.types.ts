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
      React.ComponentPropsWithoutRef<'input'>,
      'onChange' | 'value' | 'min' | 'max' | 'size' | 'disabled'
    >,
    Pick<SharedInputBoxTypes<Segment>, 'segments' | 'segmentEnum'> {
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
   * The handler for the onBlur event that will be read by the InputSegment component
   *
   * @example
   * (event: React.FocusEvent<HTMLInputElement>) => void
   */
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}

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
   * Whether the input box is disabled
   */
  disabled: boolean;

  /**
   * id of the labelling element
   */
  labelledBy?: string;
}
