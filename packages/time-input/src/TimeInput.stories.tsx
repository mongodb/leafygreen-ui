/* eslint-disable no-console */
import React, { useState } from 'react';
import {
  storybookArgTypes,
  type StoryMetaType,
} from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import { DateType, SupportedLocales } from '@leafygreen-ui/date-utils';

import { Size } from './TimeInput/TimeInput.types';
import { TimeInput } from '.';

const meta: StoryMetaType<typeof TimeInput> = {
  title: 'Components/Inputs/TimeInput',
  component: TimeInput,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onDateChange',
        'onSegmentChange',
        'value',
        'onTimeChange',
        'data-lgid',
        'data-testid',
      ],
    },
  },
  args: {
    showSeconds: true,
    locale: SupportedLocales.ISO_8601,
    timeZone: 'UTC',
    label: 'Time Input',
    darkMode: false,
    size: Size.Default,
  },
  argTypes: {
    locale: { control: 'select', options: Object.values(SupportedLocales) },
    timeZone: {
      control: 'select',
      options: [undefined, 'UTC', 'America/New_York', 'Europe/London'],
    },
    darkMode: storybookArgTypes.darkMode,
    size: { control: 'select', options: Object.values(Size) },
  },
};

export default meta;

const Template: StoryFn<typeof TimeInput> = props => {
  // const [value, setValue] = useState<DateType | undefined>(
  //   new Date('1990-02-20T14:00:00Z'),
  // );
  // const [value, setValue] = useState<DateType | undefined>(
  //   new Date('2022-03-13T06:00:00Z'),
  // );
  const [value, setValue] = useState<DateType | undefined>(
    new Date('1990-02-20T04:00:00Z'),
  );
  // const [value, setValue] = useState<DateType | undefined>();
  // const [value, setValue] = useState<DateType | undefined>(
  //   new Date('1990--20T14:30:50Z'),
  // );

  return (
    <TimeInput
      {...props}
      value={value}
      onTimeChange={time => {
        setValue(time);
        console.log('onTimeChange 🦁🦁🦁', {
          time,
          utc: time?.toUTCString(),
        });
      }}
    />
  );
};

export const LiveExample = Template.bind({});
