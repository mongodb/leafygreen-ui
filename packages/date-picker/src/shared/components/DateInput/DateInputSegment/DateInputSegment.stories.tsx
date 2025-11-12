import React, { useState } from 'react';
import { StoryMetaType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../../context';
import { DateSegment, DateSegmentValue } from '../../../types';
import { DateInputBoxProvider } from '../DateInputBoxContext';

import { DateInputSegment } from './DateInputSegment';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  return (
    <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
      <SharedDatePickerProvider {...ctx?.args}>
        <DateInputBoxProvider>
          <Story />
        </DateInputBoxProvider>
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<
  typeof DateInputSegment,
  SharedDatePickerContextProps
> = {
  title: 'Components/Inputs/DatePicker/Shared/DateInputSegment',
  component: DateInputSegment,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [undefined, '6', '2023'],
        segment: ['day', 'month', 'year'],
        size: Object.values(Size),
      },
      decorator: ProviderWrapper,
      excludeCombinations: [
        {
          value: '6',
          segment: 'year',
        },
        {
          value: '2023',
          segment: ['day', 'month'],
        },
      ],
    },
    controls: {
      exclude: ['segmentEnum', 'onChange', 'disabled'],
    },
  },
  args: {
    segment: 'day',
    segmentEnum: DateSegment,
  },
  argTypes: {
    segment: {
      control: 'select',
      options: ['day', 'month', 'year'],
    },
  },
};

export default meta;

const Template: StoryFn<typeof DateInputSegment> = props => {
  const [value, setValue] = useState<DateSegmentValue>('');

  return (
    <LeafyGreenProvider>
      <DateInputBoxProvider>
        <DateInputSegment
          {...props}
          value={value}
          onChange={({ value }) => {
            setValue(value);
          }}
        />
      </DateInputBoxProvider>
    </LeafyGreenProvider>
  );
};

export const Basic = Template.bind({});

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
