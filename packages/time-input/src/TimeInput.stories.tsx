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
import { MAX_DATE, MIN_DATE } from './constants';

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
    generate: {
      storyNames: [
        'TwelveHourFormat',
        'TwentyFourHourFormat',
        'WithoutSeconds',
      ],
      combineArgs: {
        darkMode: [false, true],
        value: [new Date('2026-02-20T04:00:00Z'), undefined],
        disabled: [true, false],
        size: Object.values(Size),
        timeZone: ['UTC', 'America/New_York', 'Europe/London'],
      },
    },
  },
  args: {
    showSeconds: true,
    locale: SupportedLocales.ISO_8601,
    timeZone: 'UTC',
    label: 'Time Input',
    darkMode: false,
    size: Size.Default,
    disabled: false,
    // min: MIN_DATE,
    // max: MAX_DATE,
    min: new Date('2026-02-20T08:22:00Z'), // 8:22AM in every timezone
    max: new Date('2026-02-21T22:00:00Z'), // 10PM in every timezone
  },
  argTypes: {
    locale: { control: 'select', options: Object.values(SupportedLocales) },
    timeZone: {
      control: 'select',
      options: [
        undefined,
        'UTC',
        'America/New_York',
        'Europe/London',
        'America/Los_Angeles',
      ],
    },
    darkMode: storybookArgTypes.darkMode,
    size: { control: 'select', options: Object.values(Size) },
    min: { control: 'date' },
    max: { control: 'date' },
  },
};

export default meta;

const Template: StoryFn<typeof TimeInput> = props => {
  const [value, setValue] = useState<DateType | undefined>(
    new Date('2026-02-20T00:00:00Z'),
  );

  return (
    <div>
      <TimeInput
        {...props}
        value={value}
        onTimeChange={time => {
          setValue(time);
          console.log('Storybook: onTimeChange ⏰', {
            localTime: time,
            utcTime: time?.toUTCString(),
          });
        }}
        onChange={e => {
          console.log('Storybook: onChange ⏰', { value: e.target.value });
        }}
      />
      <p>Time zone: {props.timeZone}</p>
      <p>UTC value: {value?.toUTCString()}</p>
    </div>
  );
};

export const TwelveHourFormat = Template.bind({});
TwelveHourFormat.parameters = {
  generate: {
    args: {
      locale: SupportedLocales.en_US,
    },
  },
};

export const TwentyFourHourFormat = Template.bind({});
TwentyFourHourFormat.parameters = {
  generate: {
    args: {
      locale: SupportedLocales.ISO_8601,
    },
  },
};

export const WithoutSeconds = Template.bind({});
WithoutSeconds.parameters = {
  generate: {
    args: {
      showSeconds: false,
    },
  },
};

export const LiveExample = Template.bind({});
LiveExample.parameters = {
  chromatic: {
    disableSnapshot: true,
  },
};
