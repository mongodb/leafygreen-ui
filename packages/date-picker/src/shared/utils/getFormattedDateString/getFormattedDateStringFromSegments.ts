import { DateSegment, DateSegmentsState } from '../../../shared/types';
import { getFormatParts } from '../getFormatParts';
import { getValueFormatter } from '../getValueFormatter';

export const getFormattedDateStringFromSegments = (
  segments: DateSegmentsState,
  locale: string,
): string | undefined => {
  const formatParts = getFormatParts(locale);

  // Note: looping through `formatParts`, instead of using `Intl.DateTimeFormat(locale).format(date)`
  // since the locale `iso8601` does not return a valid formatter
  const formattedDate = formatParts?.reduce((dateString, part) => {
    if (part.type === 'literal') {
      return dateString + part.value;
    }

    const segment = part.type as DateSegment;
    const formatter = getValueFormatter(segment);
    const formattedSegment = formatter(segments[segment]);
    return dateString + formattedSegment;
  }, '');

  return formattedDate;
};
