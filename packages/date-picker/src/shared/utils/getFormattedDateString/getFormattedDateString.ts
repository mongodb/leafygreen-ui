import { getFormattedSegmentsFromDate } from '../getSegmentsFromDate';

import { getFormattedDateStringFromSegments } from './getFormattedDateStringFromSegments';

export const getFormattedDateString = (date: Date, locale: string) => {
  const dateSegments = getFormattedSegmentsFromDate(date);

  return getFormattedDateStringFromSegments(dateSegments, locale);
};
