/** The minimum number for each segment */
export const defaultMin = {
  day: 1,
  month: 1,
  year: 1970,
} as const;

/** The maximum number for each segment */
export const defaultMax = {
  day: 31,
  month: 12,
  year: 2038,
} as const;

/** The shorthand for each char */
export const placeholderChar = {
  day: 'D',
  month: 'M',
  year: 'Y',
};

export const charsPerSegment = {
  day: 2,
  month: 2,
  year: 4,
};

const makePlaceholder = (n: number, s: string) => new Array(n).fill(s).join('');

/** The default placeholders for each segment */
export const defaultPlaceholder = {
  day: makePlaceholder(charsPerSegment.day, placeholderChar.day),
  month: makePlaceholder(charsPerSegment.month, placeholderChar.month),
  year: makePlaceholder(charsPerSegment.year, placeholderChar.year),
} as const;

/** The percentage of 1ch these specific characters take up */
export const characterWidth = {
  D: 1.1875,
  M: 1.375,
  Y: 1.125,
  // TODO: Remove if not using small-caps placeholders
  // D: 1.05,
  // M: 1.25,
  // Y: 0.975,
} as const;
