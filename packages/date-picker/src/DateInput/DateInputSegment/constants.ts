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

const makePlaceholder = (n: number, s: string) =>
  new Array(n).fill(s).join('\u200B');

/** The default placeholders for each segment */
export const defaultPlaceholder = {
  day: makePlaceholder(charsPerSegment.day, placeholderChar.day),
  month: makePlaceholder(charsPerSegment.month, placeholderChar.month),
  year: makePlaceholder(charsPerSegment.year, placeholderChar.year),
} as const;

/** The percentage of 1ch these specific characters take up */
export const characterWidth = {
  // // Standard font
  D: 46 / 40,
  M: 55 / 40,
  Y: 50 / 40,
  // TODO: rm. for 1.25 small-caps placeholders
  // D: 41 / 40,
  // M: 49 / 40,
  // Y: 44 / 40,
  // TODO: rm. for small-caps placeholders
  // D: 32 / 40,
  // M: 37 / 40,
  // Y: 35 / 40,
  // TODO: rm. for monospace
  // D: 1,
  // M: 1,
  // Y: 1,
} as const;
