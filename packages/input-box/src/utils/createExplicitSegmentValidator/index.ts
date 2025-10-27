import { isValidSegmentName, isValidSegmentValue } from '../isValidSegment';

/**
 * Configuration for determining if a segment value is explicit
 */
export interface ExplicitSegmentRule {
  /** Maximum characters for this segment */
  maxChars: number;
  /** Minimum numeric value that makes the input explicit (optional) */
  minExplicitValue?: number;
}

/**
 * Factory function that creates a segment value validator
 * @param segmentEnum - The segment enum/object to validate against
 * @param rules - Rules for each segment type
 * @returns A function that checks if a segment value is explicit
 *
 * @example
 * const segmentObj = {
 *   Day: 'day',
 *   Month: 'month',
 *   Year: 'year',
 * };
 * const rules = {
 *   day: { maxChars: 2, minExplicitValue: 1 },
 *   month: { maxChars: 2, minExplicitValue: 1 },
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
