/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import Button from '@leafygreen-ui/button';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import Modal from '@leafygreen-ui/modal';
import { Size } from '@leafygreen-ui/tokens';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../shared/components/DatePickerContext';
import { Month } from '../shared/constants';
import { AutoComplete } from '../shared/types';
import { newUTC } from '../shared/utils';
import { Locales, TimeZones } from '../shared/utils/testutils';

import { DatePicker } from './DatePicker';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => (
  <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
    <DatePickerProvider {...ctx?.args}>
      <Story />
    </DatePickerProvider>
  </LeafyGreenProvider>
);

const meta: StoryMetaType<typeof DatePicker, DatePickerContextProps> = {
  title: 'Components/DatePicker/DatePicker',
  component: DatePicker,
  decorators: [ProviderWrapper],
  parameters: {
    default: null,
    controls: {
      exclude: [
        'handleValidation',
        'initialValue',
        'onChange',
        'onSegmentChange',
        'value',
      ],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        value: [newUTC(2023, Month.December, 26)],
        dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
        timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
        disabled: [false, true],
      },
      decorator: ProviderWrapper,
    },
  },
  args: {
    dateFormat: 'en-US',
    label: 'Pick a date',
    min: newUTC(1996, Month.October, 14),
    max: newUTC(2026, Month.October, 14),
    size: Size.Default,
    timeZone: 'America/New_York',
    autoComplete: AutoComplete.Off,
  },
  argTypes: {
    baseFontSize: { control: 'select' },
    dateFormat: { control: 'select', options: Locales },
    description: { control: 'text' },
    label: { control: 'text' },
    min: { control: 'date' },
    max: { control: 'date' },
    size: { control: 'select' },
    state: { control: 'select' },
    timeZone: { control: 'select', options: TimeZones },
    autoComplete: { control: 'select', options: Object.values(AutoComplete) },
  },
};

export default meta;

export const Basic: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();

  return <DatePicker {...props} value={value} onDateChange={setValue} />;
};

export const Uncontrolled: StoryFn<typeof DatePicker> = props => {
  return <DatePicker {...props} />;
};

export const InModal: StoryFn<typeof DatePicker> = props => {
  const [value, setValue] = useState<Date | null | undefined>();
  const [isModalOpen, setisModalOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setisModalOpen(curr => !curr)}>Open Modal</Button>
      <Modal open={isModalOpen} setOpen={setisModalOpen}>
        Inside the modal
        <DatePicker {...props} value={value} onDateChange={setValue} />
      </Modal>
    </>
  );
};
InModal.parameters = {
  chromatic: {
    disableSnapshots: true,
  },
};

export const Generated = () => {};
