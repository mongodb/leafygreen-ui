import { useRef } from 'react';

import { useDynamicRefs } from '@leafygreen-ui/hooks';

import { useSegmentRefs } from '../../shared/hooks';

import { DatePickerComponentRefs } from './DatePickerContext.types';

/** Creates `ref` objects for any & all relevant component elements */
export const useDateRangeComponentRefs = (): DatePickerComponentRefs => {
  const segmentRefs = useSegmentRefs();

  const calendarCellRefs = useDynamicRefs<HTMLTableCellElement>();

  const calendarButtonRef = useRef<HTMLButtonElement>(null);

  const leftChevronRef = useRef<HTMLButtonElement>(null);
  const rightChevronRef = useRef<HTMLButtonElement>(null);
  const chevronButtonRefs = {
    left: leftChevronRef,
    right: rightChevronRef,
  };

  return {
    segmentRefs,
    calendarCellRefs,
    calendarButtonRef,
    chevronButtonRefs,
  };
};
