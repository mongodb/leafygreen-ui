import { DateType, isValidDate } from '@leafygreen-ui/date-utils';
import { getFormatter } from '../getFormatter/getFormatter';
import defaultsDeep from 'lodash/defaultsDeep';

const defaultTimeParts: Array<Intl.DateTimeFormatPart> = [
  { type: 'hour', value: '' },
  { type: 'minute', value: '' },
  { type: 'second', value: '' },
  { type: 'month', value: '' },
  { type: 'day', value: '' },
  { type: 'year', value: '' },
  { type: 'dayPeriod', value: 'AM' },
];

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
  const filteredTimeParts =
    timeParts?.filter(part => part.type !== 'literal') ?? [];
  const mergedTimeParts = defaultsDeep(filteredTimeParts, defaultTimeParts);

  // console.log('🪼getDefaultTimeParts', {
  //   locale,
  //   timeZone,
  //   mergedTimeParts,
  //   hasDayPeriod,
  // });

  return mergedTimeParts;
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
}) => {
  if (!value) return getDefaultTimeParts(timeZone, locale, hasDayPeriod);

  if (!isValidDate(value)) {
    return defaultTimeParts;
  }

  // console.log('🍓getFormatPartsValues', {
  //   locale,
  //   timeZone,
  //   value,
  //   hasDayPeriod,
  // });

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
  const filteredTimeParts: Array<Intl.DateTimeFormatPart> =
    timeParts?.filter(part => part.type !== 'literal') ?? [];
  const mergedTimeParts = defaultsDeep(filteredTimeParts, defaultTimeParts);

  return mergedTimeParts;
};
