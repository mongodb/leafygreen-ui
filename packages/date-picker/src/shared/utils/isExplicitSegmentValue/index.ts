import { dateSegmentRules } from '../../constants';
import { DateSegment } from '../../types';
import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

/**
 * Returns whether the provided value is an explicit, unique value for a given segment.
 * Contrast this with an ambiguous segment value:
 * Explicit: Day = 5, 02
 * Ambiguous: Day = 2 (could be 20-29)
 */
export const isExplicitSegmentValue = createExplicitSegmentValidator(
  DateSegment,
  dateSegmentRules,
);

// TODO: MOVE TO the new input box component
/**
 * Configuration for determining if a segment value is explicit
 */
export type ExplicitSegmentRule = {
  /** Maximum characters for this segment */
  maxChars: number;
  /** Minimum numeric value that makes the input explicit (optional) */
  minExplicitValue?: number;
};

/**
 * Factory function that creates a segment value validator
 * @param segmentEnum - The segment enum/object to validate against
 * @param rules - Rules for each segment type
 * @returns A function that checks if a segment value is explicit
 */
export function createExplicitSegmentValidator<
  T extends Record<string, string>,
>(segmentEnum: T, rules: Record<T[keyof T], ExplicitSegmentRule>) {
  return (segment: T[keyof T], value: string): boolean => {
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
