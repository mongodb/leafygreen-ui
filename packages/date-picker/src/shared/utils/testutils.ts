import { createRef } from 'react';
import { StoryContext } from '@storybook/react';
import userEvent from '@testing-library/user-event';
import { range } from 'lodash';
import timezoneMock, { TimeZone } from 'timezone-mock';

import { LeafyGreenProviderProps } from '@leafygreen-ui/leafygreen-provider';

import {
  ContextPropKeys,
  contextPropNames,
  DatePickerProviderProps,
  defaultDatePickerContext,
} from '../components/DatePickerContext';
import { SegmentRefs } from '../hooks';
import { BaseDatePickerProps } from '../types';
import { pickAndOmit } from '../utils';

export const segmentRefsMock: SegmentRefs = {
  day: createRef<HTMLInputElement>(),
  month: createRef<HTMLInputElement>(),
  year: createRef<HTMLInputElement>(),
};

// TODO: Move to separate file
/**
 * Mocks the `timeZone` returned from the `Intl.DateTimeFormat`,
 * and the `getTimeZoneOffset` returned from `Date`
 * @param timeZone IANA time zone string
 * @param UTCOffset UTC offset (in hours)
 */
export const mockTimeZone = (timeZone: string, UTCOffset: number) => {
  timezoneMock.register(
    `Etc/GMT${UTCOffset >= 0 ? '+' : ''}${UTCOffset}` as TimeZone,
    {
      Date,
    },
  );

  const realDTFOptions = Intl.DateTimeFormat().resolvedOptions();

  /** DTF.resolvedOptions */
  global.Intl.DateTimeFormat.prototype.resolvedOptions = jest
    .fn()
    .mockImplementation(() => ({
      ...realDTFOptions,
      timeZone,
    }));

  /** getTimezoneOffset */
  global.Date.prototype.getTimezoneOffset = jest
    .fn()
    .mockImplementation(() => UTCOffset * 60);

  /** getDate */
  global.Date.prototype.getDate = jest
    .fn()
    .mockImplementation(function getDate() {
      /// @ts-expect-error - typeof `this` is unknown
      const utcDate: number = (this as Date).getUTCDate();
      /// @ts-expect-error - typeof `this` is unknown
      const utcHrs: number = (this as Date).getUTCHours();

      const adjustedHr = utcHrs + UTCOffset;
      const daysOffset = adjustedHr >= 24 ? 1 : adjustedHr < 0 ? -1 : 0;
      return utcDate + daysOffset;
    });

  /** getHours */
  global.Date.prototype.getHours = jest
    .fn()
    .mockImplementation(function getHours() {
      /// @ts-expect-error - typeof `this` is unknown
      const utcHrs: number = (this as Date).getUTCHours();
      const adjustedHrs = utcHrs + UTCOffset;
      const hours =
        adjustedHrs >= 24
          ? adjustedHrs % 24
          : adjustedHrs < 0
          ? adjustedHrs + 24
          : adjustedHrs;

      return hours;
    });
};

export const testTimeZones = [
  { tz: 'Pacific/Honolulu', UTCOffset: -10 },
  { tz: 'America/Los_Angeles', UTCOffset: -8 },
  { tz: 'America/New_York', UTCOffset: -5 },
  { tz: 'Europe/London', UTCOffset: +0 },
  { tz: 'Asia/Istanbul', UTCOffset: +3 },
  { tz: 'Asia/Seoul', UTCOffset: +9 },
  { tz: 'Pacific/Auckland', UTCOffset: +13 },
] as const;

/** Time zones used to test with */
export const TimeZones = testTimeZones.map(({ tz }) => tz);

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
