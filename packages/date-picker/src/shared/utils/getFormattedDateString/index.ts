import { DateSegment } from '../../hooks';
import { getFormatParts } from '../getFormatParts';
import { getFormattedSegmentsFromDate } from '../getSegmentsFromDate';

export const getFormattedDateString = (date: Date, locale: string) => {
  const formatParts = getFormatParts(locale);
  const dateSegments = getFormattedSegmentsFromDate(date);

  // Note: looping through `formatParts`, instead of using `Intl.DateTimeFormat(locale).format(date)`
  // since the locale `iso8601` does not return a valid formatter
  const formattedDate = formatParts?.reduce((dateString, part) => {
    const partString =
      part.type === 'literal'
        ? part.value
        : dateSegments[part.type as DateSegment];
    return dateString + partString;
  }, '');

  return formattedDate;
};
