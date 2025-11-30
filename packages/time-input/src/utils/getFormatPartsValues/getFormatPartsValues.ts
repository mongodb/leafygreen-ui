import { DateType } from '@leafygreen-ui/date-utils';
import { getFormatter } from '../getFormatter/getFormatter';

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
  // Get the formatter
  const formatter = getFormatter({
    locale: locale,
    withFullDate: true,
    options: {
      timeZone: timeZone,
      hourCycle: hasDayPeriod ? 'h12' : 'h23',
    },
  });

  // Get the time parts
  const timeParts = formatter?.formatToParts(value);
  const filteredTimeParts = timeParts?.filter(part => part.type !== 'literal');

  return filteredTimeParts;
};
