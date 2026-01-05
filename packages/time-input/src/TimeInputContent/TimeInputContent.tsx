import React, { forwardRef, useEffect } from 'react';

import { TimeInputInputs } from '../TimeInputInputs';

import { TimeInputContentProps } from './TimeInputContent.types';
import { useTimeInputContext } from '../Context/TimeInputContext/TimeInputContext';
import { useTimeInputDisplayContext } from '../Context/TimeInputDisplayContext/TimeInputDisplayContext';
import { usePrevious } from '@leafygreen-ui/hooks';
import { isSameUTCDateTime } from '@leafygreen-ui/date-utils';

import isEqual from 'lodash/isEqual';

/**
 * @internal
 */
export const TimeInputContent = forwardRef<
  HTMLDivElement,
  TimeInputContentProps
>((props: TimeInputContentProps, forwardedRef) => {
  const { max, min, timeZone, locale } = useTimeInputDisplayContext();
  const { value, handleValidation } = useTimeInputContext();

  const prevValue = usePrevious(value);
  const prevMax = usePrevious(max);
  const prevMin = usePrevious(min);
  const prevTimeZone = usePrevious(timeZone);
  const prevLocale = usePrevious(locale);

  /**
   * When value changes, validate it. Checking iEqual is necessary to prevent the useEffect from running if prevValue and value are both undefined.
   */
  useEffect(() => {
    if (!isEqual(prevValue, value) && !isSameUTCDateTime(value, prevValue)) {
      console.log('🌈 useEffect');
      handleValidation(value);
    }
  }, [handleValidation, prevValue, value]);

  /**
   * If min/max changes, re-validate the value
   */
  useEffect(() => {
    if (
      (prevMin && !isSameUTCDateTime(min, prevMin)) ||
      (prevMax && !isSameUTCDateTime(max, prevMax))
    ) {
      handleValidation(value);
    }
  }, [min, max, value, prevMin, prevMax, handleValidation]);

  /**
   * If time zone changes, re-validate the value
   */
  useEffect(() => {
    if (prevTimeZone && value && prevTimeZone !== timeZone) {
      handleValidation(value);
    }
  }, [timeZone, value, prevTimeZone, handleValidation]);

  /**
   * If locale changes, re-validate the value
   */
  useEffect(() => {
    if (prevLocale && value && prevLocale !== locale) {
      handleValidation(value);
    }
  }, [locale, value, prevLocale, handleValidation]);

  return <TimeInputInputs ref={forwardedRef} {...props} />;
});

TimeInputContent.displayName = 'TimeInputContent';
