import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { useSegmentRefs } from '../../shared/hooks';

import { DatePickerComponentRefs } from './SingleDateContext.types';

/** Creates `ref` objects for any & all relevant component elements */
export const useDateRangeComponentRefs = (): DatePickerComponentRefs => {
  const segmentRefs = useSegmentRefs();

  // TODO: https://jira.mongodb.org/browse/LG-3666
  // useDynamicRefs may overflow if a user navigates to too many months.
  // consider purging the refs map within the hook
  const calendarCellRefs = useDynamicRefs<HTMLTableCellElement>();

  return {
    segmentRefs,
    calendarCellRefs,
  };
};
