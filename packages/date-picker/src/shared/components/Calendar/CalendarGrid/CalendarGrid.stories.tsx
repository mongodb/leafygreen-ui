/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import {
  getISODate,
  isTodayTZ,
  Month,
  newUTC,
  testLocales,
  testTimeZoneLabels,
} from '@leafygreen-ui/date-utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
  useSharedDatePickerContext,
} from '../../../context';
import { CalendarCell } from '../CalendarCell/CalendarCell';

import { CalendarGrid } from './CalendarGrid';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <SharedDatePickerProvider {...ctx?.args}>
      <Story />
    </SharedDatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof CalendarGrid, SharedDatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/CalendarGrid',
  component: CalendarGrid,
  parameters: {
    default: 'Demo',
    generate: {
      combineArgs: {
        darkMode: [false, true],
        locale: testLocales,
      },
      decorator: ProviderWrapper,
    },
  },
  decorators: [ProviderWrapper],
  args: {
    locale: 'en-US',
    timeZone: 'UTC',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
    locale: {
      control: 'select',
      options: testLocales,
    },
    timeZone: {
      control: 'select',
      options: testTimeZoneLabels,
    },
  },
};

export default meta;

export const Basic: StoryFn<typeof CalendarGrid> = ({ ...props }) => {
  const { timeZone } = useSharedDatePickerContext();
  const [month] = useState(newUTC(2023, Month.August, 1));

  const [hovered, setHovered] = useState<string | undefined>();

  const handleHover = (id?: string) => () => {
    setHovered(id);
  };

  return (
    <CalendarGrid
      {...props}
      month={month}
      onMouseLeave={handleHover(undefined)}
    >
      {(day, i) => (
        <CalendarCell
          aria-label="test"
          key={i}
          isCurrent={isTodayTZ(day, timeZone)}
          isHighlighted={hovered ? hovered === getISODate(day) : false}
          onMouseEnter={handleHover(getISODate(day))}
          data-iso={getISODate(day)}
        >
          {day?.getUTCDate()}
        </CalendarCell>
      )}
    </CalendarGrid>
  );
};

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated: StoryFn<typeof CalendarGrid> = () => <></>;
Generated.parameters = {
  generate: {
    args: {
      month: newUTC(2023, Month.August, 1),
      children: (day: Date, i: number) => (
        <CalendarCell
          key={i}
          aria-label="test"
          isCurrent={false}
          isHighlighted={false}
        >
          {day?.getUTCDate()}
        </CalendarCell>
      ),
    },
  },
};
