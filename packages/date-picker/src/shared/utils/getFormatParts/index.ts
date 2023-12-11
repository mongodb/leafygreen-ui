import { isValidLocale } from '@leafygreen-ui/date-utils';

const now = new Date();
const ISO = 'iso8601';
const IsoFormatParts: Array<Intl.DateTimeFormatPart> = [
  { type: 'year', value: '' },
  { type: 'literal', value: '-' },
  { type: 'month', value: '' },
  { type: 'literal', value: '-' },
  { type: 'day', value: '' },
];

/**
 * Returns an {@link Intl.DateTimeFormat} for the provided locale
 */
export const getFormatter = (locale: string) => {
  const formatter: Intl.DateTimeFormat | undefined = isValidLocale(locale)
    ? Intl.DateTimeFormat(locale)
    : undefined;

  return formatter;
};

/**
 * Returns an array of {@link Intl.DateTimeFormatPart} for the provided locale
 */
export const getFormatParts = (
  locale: string,
): Array<Intl.DateTimeFormatPart> | undefined => {
  if (locale === ISO) {
    return IsoFormatParts;
  }

  const formatter = getFormatter(locale);
  const formatParts = formatter?.formatToParts(now);

  return formatParts;
};
