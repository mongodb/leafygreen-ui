import defaultsDeep from 'lodash/defaultsDeep';

import { DateType, isValidDate } from '@leafygreen-ui/date-utils';

import { getFormatter } from '../getFormatter/getFormatter';

const defaultTimePartsObject: Record<FormattedTimeParts, string> = {
  hour: '',
  minute: '',
  second: '',
  month: '',
  day: '',
  year: '',
  dayPeriod: 'AM',
};

type FormattedTimeParts =
  | 'hour'
  | 'minute'
  | 'second'
  | 'month'
  | 'day'
  | 'year'
  | 'dayPeriod';

export type TimeParts = Record<FormattedTimeParts, string>;

const getFilteredTimeParts = ({
  timeParts,
}: {
  timeParts?: Array<Intl.DateTimeFormatPart>;
}) => {
  const filteredTimeParts =
    timeParts?.filter(part => part.type !== 'literal') ?? [];

  return filteredTimeParts;
};

const getFormattedAndMergedTimeParts = (
  timeParts: Array<Intl.DateTimeFormatPart>,
): TimeParts => {
  const formattedTimeParts: Record<FormattedTimeParts, string> =
    timeParts.reduce((acc, part) => {
      acc[part.type as FormattedTimeParts] = part.value;
      return acc;
    }, {} as Record<FormattedTimeParts, string>);

  const mergedTimeParts = defaultsDeep(
    formattedTimeParts,
    defaultTimePartsObject,
  );

  return mergedTimeParts;
};

/**
 * Used when the component is uncontrolled, and the value is undefined
 * @param timeZone
 * @param locale
 * @param hasDayPeriod
 * @returns
 */
export const getDefaultTimeParts = (
  timeZone: string,
  locale: string,
  hasDayPeriod: boolean,
) => {
  const formatter = getFormatter({
    locale: locale,
    withDate: true,
    withTime: false,
    options: {
      timeZone: timeZone,
      hourCycle: hasDayPeriod ? 'h12' : 'h23',
    },
  });

  const timeParts = formatter?.formatToParts(new Date());
  const filteredTimeParts = getFilteredTimeParts({ timeParts });
  const formattedTimeParts = getFormattedAndMergedTimeParts(filteredTimeParts);

  return formattedTimeParts;
};

export const getFormatPartsValues = ({
  locale,
  timeZone,
  value,
  hasDayPeriod,
}: {
  locale: string;
  timeZone: string;
  value: DateType | undefined;
  hasDayPeriod: boolean;
}): TimeParts => {
  if (!isValidDate(value)) {
    const formattedTimeParts = getDefaultTimeParts(
      timeZone,
      locale,
      hasDayPeriod,
    );
    return formattedTimeParts;
  }

  // Get the formatter
  const formatter = getFormatter({
    locale: locale,
    withDate: true,
    options: {
      timeZone: timeZone,
      hourCycle: hasDayPeriod ? 'h12' : 'h23',
    },
  });

  // Get the time parts
  const timeParts = formatter?.formatToParts(value);
  const filteredTimeParts = getFilteredTimeParts({ timeParts });
  const formattedTimeParts = getFormattedAndMergedTimeParts(filteredTimeParts);

  return formattedTimeParts;
};
