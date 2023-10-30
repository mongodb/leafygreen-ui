/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '@leafygreen-ui/date-picker/shared/components/DatePickerContext';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import { DateRangeInput } from './DateRangeInput';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider
      value={{
        ...ctx?.args,
      }}
    >
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof DateRangeInput, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateRangePicker/DateRangeInput',
  component: DateRangeInput,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: ['segmentRefs'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        // value: [null, new Date('1993-12-26')],
        dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        size: Object.values(Size),
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
  },
  argTypes: {},
};

export default meta;

export const Basic: StoryFn<typeof DateRangeInput> = props => {
  return (
    <>
      <DateRangeInput {...props} />
    </>
  );
};

export const Generated = () => {};
