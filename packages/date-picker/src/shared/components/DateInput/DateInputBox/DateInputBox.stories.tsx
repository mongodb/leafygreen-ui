/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { StoryMetaType, StoryType } from '@lg-tools/storybook-utils';
import { StoryFn } from '@storybook/react';

import {
  DateType,
  isValidDate,
  Month,
  newUTC,
  testLocales,
} from '@leafygreen-ui/date-utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../../context';
import {
  getProviderPropsFromStoryContext,
  segmentRefsMock,
} from '../../../testutils';

import { DateInputBox } from './DateInputBox';
import { DateInputChangeEventHandler } from './DateInputBox.types';

const testDate = newUTC(1993, Month.December, 26);

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext(ctx?.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <SharedDatePickerProvider {...datePickerProviderProps}>
        <Story {...storyProps} segmentRefs={segmentRefsMock} />
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DateInputBox, SharedDatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/DateInputBox',
  component: DateInputBox,
  decorators: [ProviderWrapper],
  parameters: {
    controls: {
      exclude: ['onSegmentChange', 'setValue', 'segmentRefs'],
    },
    default: null,
    generate: {
      storyNames: ['Formats'],
      combineArgs: {
        darkMode: [false, true],
        value: [null, testDate],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    label: 'Label',
    locale: 'iso8601',
    timeZone: 'Europe/London',
  },
  argTypes: {
    value: { control: 'date' },
    locale: { control: 'select', options: testLocales },
  },
};

export default meta;

export const Basic: StoryFn<typeof DateInputBox> = props => {
  const [date, setDate] = useState<DateType>(null);

  useEffect(() => {
    if (props.value && isValidDate(props.value)) {
      setDate(props.value);
    }
  }, [props.value]);

  const updateDate: DateInputChangeEventHandler = ({ value }) => {
    setDate(value);
  };

  return (
    <div>
      <DateInputBox
        value={date}
        setValue={updateDate}
        segmentRefs={segmentRefsMock}
      />
      <code>
        {isValidDate(date)
          ? date.toISOString()
          : date
          ? 'Invalid'
          : 'undefined'}
      </code>
    </div>
  );
};

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Static: StoryFn<typeof DateInputBox> = () => {
  return <DateInputBox value={testDate} segmentRefs={segmentRefsMock} />;
};

Static.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Formats: StoryType<
  typeof DateInputBox,
  SharedDatePickerContextProps
> = () => <></>;
Formats.parameters = {
  generate: {
    combineArgs: {
      locale: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    },
  },
};
