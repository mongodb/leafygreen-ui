import {
  isValidSegmentName,
  isValidSegmentValue,
} from '../isValidSegment/isValidSegment';

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
 *   day: { maxChars: 2, minExplicitValue: 4 },
 *   month: { maxChars: 2, minExplicitValue: 2 },
 *   year: { maxChars: 4 },
 * };
 *
 * const isExplicitSegmentValue = createExplicitSegmentValidator({
 *   segmentEnum,
 *   rules,
 * });
 *
 * isExplicitSegmentValue('day', '1'); // false
 * isExplicitSegmentValue('day', '01'); // true
 * isExplicitSegmentValue('day', '4'); // true
 * isExplicitSegmentValue('day', '10'); // true
 * isExplicitSegmentValue('month', '1'); // false
 * isExplicitSegmentValue('month', '01'); // true
 * isExplicitSegmentValue('month', '2'); // true
 * isExplicitSegmentValue('month', '12'); // true
 * isExplicitSegmentValue('year', '2000'); // true
 * isExplicitSegmentValue('year', '0001'); // true
 * isExplicitSegmentValue('year', '1'); // false
 * isExplicitSegmentValue('year', '200'); // false
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
