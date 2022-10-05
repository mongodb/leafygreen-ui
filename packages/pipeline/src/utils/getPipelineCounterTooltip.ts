import flatMap from 'lodash/flatMap';

/**
 * A utility function which takes an array of strings
 * and returns the string which represents the full pipeline, for usage with the tooltip.
 *
 * @param stages - an array of text from each hidden stage
 * @returns string - the tooltip text
 */
export default function getPipelineCounterTooltip(
  stages: Array<string | null>,
): string {
  return flatMap(stages, (value, index, array) =>
    array.length - 1 !== index ? [value, '>'] : value,
  ).join(' ');
}
