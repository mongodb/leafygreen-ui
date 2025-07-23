import { AutoComplete, DateSegment } from '../../types';

export const getAutoComplete = (
  autoComplete: AutoComplete,
  segment: DateSegment,
) => {
  if (autoComplete === AutoComplete.Bday) {
    switch (segment) {
      case DateSegment.Day:
        return 'bday-day';

      case DateSegment.Month:
        return 'bday-month';

      case DateSegment.Year:
        return 'bday-year';
    }
  }

  return autoComplete;
};
