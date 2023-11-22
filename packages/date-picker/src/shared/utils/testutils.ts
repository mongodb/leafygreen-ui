import { StoryContext } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import range from 'lodash/range';

import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';

import {
  ContextPropKeys,
  contextPropNames,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../components/DatePickerContext';
import { BaseDatePickerProps } from '../types';
import { pickAndOmit } from '../utils';

/** Time zones used to test with */
export const TimeZones = [
  'Pacific/Honolulu',
  'America/Los_Angeles',
  'America/New_York',
  'Europe/London',
  'Asia/Istanbul',
  'Asia/Seoul',
  'Pacific/Auckland',
];

/** Locales (date formats) to test with:
 *
 * English-US
 * English-UK
 * German (Germany) (uses `.` char separator)
 * Farsi-Afghanistan (week starts on Sat)
 * English-Maldives (week starts on Fri.)
 */
export const Locales = ['iso8601', 'en-US', 'en-UK', 'de-DE', 'fa-AF', 'en-MV'];

/** Presses the `tab` key `count` times */
export const tabNTimes = (count: number) => {
  for (const _ in range(count)) {
    userEvent.tab();
  }
};

/** Returns a jest object containing the expected target value  */
export const eventContainingTargetValue = (value: any) =>
  expect.objectContaining({
    target: expect.objectContaining({ value }),
  });

interface ProviderPropsObject<T> {
  leafyGreenProviderProps: LeafyGreenProviderProps;
  datePickerProviderProps: DatePickerProviderProps;
  storyProps: T;
}

export const getProviderPropsFromStoryContext = <P = BaseDatePickerProps>(
  ctx: StoryContext<Partial<P & DatePickerProviderProps>>,
): ProviderPropsObject<Partial<Omit<P, ContextPropKeys>>> => {
  const [
    { darkMode, baseFontSize, ...datePickerProviderProps },
    { ...storyProps },
  ] = pickAndOmit(ctx.args, [...contextPropNames]);

  return {
    leafyGreenProviderProps: {
      darkMode,
      baseFontSize: baseFontSize === 13 ? 14 : baseFontSize,
    },
    datePickerProviderProps: {
      ...defaultDatePickerContext,
      ...datePickerProviderProps,
    },
    storyProps,
  };
};
