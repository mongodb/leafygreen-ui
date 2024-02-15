import { Month } from '@leafygreen-ui/date-utils';
import { DropdownWidthBasis } from '@leafygreen-ui/select';

/**
 * The default earliest selectable date
 * (Unix epoch start: https://en.wikipedia.org/wiki/Unix_time)
 * */
export const MIN_DATE = new Date(Date.UTC(1970, Month.January, 1));

/**
 * The default latest selectable date
 * (Unix 32-bit rollover date: https://en.wikipedia.org/wiki/Year_2038_problem)
 */
export const MAX_DATE = new Date(Date.UTC(2038, Month.January, 19));

// TODO: Update how defaultMin & defaultMax are defined,
// since day/month are constants,
// but year is consumer-defined

/**
 * The minimum number for each segment
 */
export const defaultMin = {
  day: 1,
  month: 1,
  year: MIN_DATE.getUTCFullYear(),
} as const;

/**
 * The maximum number for each segment
 */
export const defaultMax = {
  day: 31,
  month: 12,
  year: MAX_DATE.getUTCFullYear(),
} as const;

/**
 * The shorthand for each char
 */
export const placeholderChar = {
  day: 'D',
  month: 'M',
  year: 'Y',
};

/**
 * The number of characters per input segment
 */
export const charsPerSegment = {
  day: 2,
  month: 2,
  year: 4,
};

const _makePlaceholder = (n: number, s: string) =>
  new Array(n).fill(s).join('\u200B');

/**
 * The default placeholders for each segment
 */
export const defaultPlaceholder = {
  day: _makePlaceholder(charsPerSegment.day, placeholderChar.day),
  month: _makePlaceholder(charsPerSegment.month, placeholderChar.month),
  year: _makePlaceholder(charsPerSegment.year, placeholderChar.year),
} as const;

/** The percentage of 1ch these specific characters take up */
export const characterWidth = {
  // // Standard font
  D: 46 / 40,
  M: 55 / 40,
  Y: 50 / 40,
} as const;

/** Default props for the month & year select menus */
export const selectElementProps = {
  size: 'xsmall',
  allowDeselect: false,
  dropdownWidthBasis: DropdownWidthBasis.Option,
  // using no portal so the select menus are included in the backdrop "foreground"
  // there is currently no way to pass a ref into the Select portal to use in backdrop "foreground"
  usePortal: false,
} as const;
