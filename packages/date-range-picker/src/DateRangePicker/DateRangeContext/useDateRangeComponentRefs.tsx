import { useRef } from 'react';

import { useSegmentRefs } from '@leafygreen-ui/date-picker/shared/hooks';
import { useDynamicRefs, useForwardedRef } from '@leafygreen-ui/hooks';

import { DateRangeComponentRefs } from './DateRangeContext.types';

/** Creates `ref` objects for any & all relevant component elements */
export const useDateRangeComponentRefs = (
  forwardedRef: React.ForwardedRef<HTMLDivElement>,
): DateRangeComponentRefs => {
  const formFieldRef = useForwardedRef(forwardedRef, null);
  const menuRef = useRef<HTMLDivElement>(null);
  const startSegmentRefs = useSegmentRefs();
  const endSegmentRefs = useSegmentRefs();
  const calendarSectionRef = useRef<HTMLDivElement>(null);
  const chevronRefs = useDynamicRefs<HTMLButtonElement>();
  const calendarCellRefs = useDynamicRefs<HTMLTableCellElement>();
  const footerButtonRefs = useDynamicRefs<HTMLButtonElement>();
  const selectRefs = useDynamicRefs<HTMLDivElement>();
  const quickRangeButtonRefs = useDynamicRefs<HTMLButtonElement>();

  return {
    formFieldRef,
    menuRef,
    startSegmentRefs,
    endSegmentRefs,
    calendarSectionRef,
    chevronRefs,
    calendarCellRefs,
    footerButtonRefs,
    selectRefs,
    quickRangeButtonRefs,
  };
};
