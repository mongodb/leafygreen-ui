import {
  isValidSegmentName,
  isValidSegmentValue,
} from '../isValidSegment/isValidSegment';

/**
 * Configuration for determining if a segment value is an explicit, unique value for a given segment.
 */
export interface ExplicitSegmentRule {
  /** Maximum characters for this segment */
  maxChars: number;
  /** Minimum numeric value that makes the input explicit (optional) */
  minExplicitValue?: number;
}

/**
 * Factory function that creates a segment value validator that checks if a segment value is an explicit, unique value for a given segment.
 *
 * An "explicit" segment value is one that is complete and unambiguous, eliminating the possibility that it is a partial input.
 * A value is considered explicit if it meets one of two conditions:
 * 1.  **Maximum Length:** The value has been padded (e.g., with leading zeros) to reach the segment's maximum character length (`maxChars`).
 * *(Example: For `maxChars: 2`, '01' is explicit, but '1' is not).*
 * 2.  **Minimum Value Threshold:** The value, while shorter than `maxChars`, is numerically equal to or greater than the segment's defined `minExplicitValue`. This ensures single-digit inputs are treated as final values rather than the start of a multi-digit entry.
 * *(Example: For `minExplicitValue: 4`, '4' is explicit, but '1' is potentially ambiguous).*
 *
 * @param segmentEnum - The segment enum/object containing the segment names and their corresponding values to validate against
 * @param rules - Rules for each segment type
 * @returns A function that checks if a segment value is explicit
 *
 * @example
 * const segmentObj = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 *   Hour: 'hour',
 *   Minute: 'minute',
 * };
 * const rules = {
 *   day: { maxChars: 2, minExplicitValue: 4 },
 *   month: { maxChars: 2, minExplicitValue: 2 },
 *   year: { maxChars: 4 },
 *   hour: { maxChars: 2, minExplicitValue: 3 },
 *   minute: { maxChars: 2, minExplicitValue: 6 },
 * };
 *
 * // Contrast this with an ambiguous segment value:
 * // Explicit: Day = '4' (meets min value), '02' (meets max length)
 * // Ambiguous: Day = '2' (does not meet max length and is less than min value)
 *
 * const isExplicitSegmentValue = createExplicitSegmentValidator({
 *   segmentEnum,
 *   rules,
 * });
 *
 * isExplicitSegmentValue('day', '1'); // false (Ambiguous - below min value and max length)
 * isExplicitSegmentValue('day', '01'); // true (Explicit - meets max length)
 * isExplicitSegmentValue('day', '4'); // true (Explicit - meets min value)
 * isExplicitSegmentValue('year', '2000'); // true (Explicit - meets max length)
 * isExplicitSegmentValue('year', '1'); // false (Ambiguous - below max length)
 * isExplicitSegmentValue('hour', '05'); // true (Explicit - meets min value)
 * isExplicitSegmentValue('hour', '23'); // true (Explicit - meets max length)
 * isExplicitSegmentValue('hour', '2'); // false (Ambiguous - below min value)
 * isExplicitSegmentValue('minute', '07'); // true (Explicit - meets min value)
 * isExplicitSegmentValue('minute', '59'); // true (Explicit - meets max length)
 * isExplicitSegmentValue('minute', '5'); // false (Ambiguous - below min value)
 */
export function createExplicitSegmentValidator<
  SegmentEnum extends Record<string, string>,
>({
  segmentEnum,
  rules,
}: {
  segmentEnum: SegmentEnum;
  rules: Record<SegmentEnum[keyof SegmentEnum], ExplicitSegmentRule>;
}) {
  return (segment: SegmentEnum[keyof SegmentEnum], value: string): boolean => {
    if (
      !(isValidSegmentValue(value) && isValidSegmentName(segmentEnum, segment))
    )
      return false;

    const rule = rules[segment];
    if (!rule) return false;

    const isMaxLength = value.length === rule.maxChars;
    const meetsMinValue = rule.minExplicitValue
      ? Number(value) >= rule.minExplicitValue
      : false;

    return isMaxLength || meetsMinValue;
  };
}
