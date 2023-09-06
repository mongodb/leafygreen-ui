import { useEffect, useMemo, useState } from 'react';

import { consoleOnce } from '@leafygreen-ui/lib';

import { isValidLocale } from '../../utils/isValidLocale';

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
 * Hook that returns an Intl.DateTimeFormat object for the provided format string
 */
export const useFormatter = (format: string) => {
  const [formatter, setFormatter] = useState<Intl.DateTimeFormat | undefined>(
    isValidLocale(format) ? Intl.DateTimeFormat(format) : undefined,
  );

  useEffect(() => {
    if (isValidLocale(format)) {
      setFormatter(Intl.DateTimeFormat(format));
    } else {
      if (format !== ISO) {
        consoleOnce.error('Invalid dateFormat', format);
      }
    }
  }, [format]);

  return formatter;
};

export const useFormatParts = (
  format: string,
): Array<Intl.DateTimeFormatPart> | undefined => {
  const formatter = useFormatter(format);

  const formatParts = useMemo(() => formatter?.formatToParts(now), [formatter]);

  if (format === ISO) {
    return IsoFormatParts;
  }

  return formatParts;
};
