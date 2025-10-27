import { getValueFormatter } from '@leafygreen-ui/input-box';

import { charsPerSegment } from '../../../shared/constants';
import { DateSegment, DateSegmentsState } from '../../../shared/types';
import { getFormatParts } from '../getFormatParts';

export const getFormattedDateStringFromSegments = (
  segments: DateSegmentsState,
  locale: string,
): string | undefined => {
  const formatParts = getFormatParts(locale);

  // Note: looping through `formatParts`, instead of using `Intl.DateTimeFormat(locale).format(date)`
  // since the locale `iso-8601` does not return a valid formatter
  const formattedDate = formatParts?.reduce((dateString, part) => {
    if (part.type === 'literal') {
      return dateString + part.value;
    }

    const segment = part.type as DateSegment;
    const formatter = getValueFormatter(segment, charsPerSegment);
    const formattedSegment = formatter(segments[segment]);
    return dateString + formattedSegment;
  }, '');

  return formattedDate;
};
