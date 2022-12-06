// TODO: Move these to the `a11y` package
/**
 * An enum of accepted values for the "aria-current" attribute, used for
 * indicating current/active state across several contexts.
 *
 * The values "false", the empty string, and an omission of this attribute
 * are all treated identically by user agents and screen readers.
 *
 * W3C Recommendation: https://www.w3.org/TR/wai-aria-1.1/#aria-current
 */
export const AriaCurrentValue = {
  Page: 'page', // current value in a set of pagination links
  Step: 'step', // current value in a step indicator
  Location: 'location', // current value in a chart or other visual flow
  Date: 'date', // current value in a calendar or date picker
  Time: 'time', // current value in a timetable or time picker
  True: 'true', // (fallback) current value in any set of options/elements
  Unset: 'false', // equivalent to omitting the aria-current attribute
} as const;

export type AriaCurrentValue =
  typeof AriaCurrentValue[keyof typeof AriaCurrentValue];
