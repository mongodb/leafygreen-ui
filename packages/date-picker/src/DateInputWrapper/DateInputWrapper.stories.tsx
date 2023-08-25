import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';

import { DateInputWrapper } from './DateInputWrapper';

const meta: StoryMetaType<typeof DateInputWrapper, DatePickerContextProps> = {
  title: 'Components/DatePicker/DateInputWrapper',
  component: DateInputWrapper,
  parameters: {
    default: null,
    generate: {
      combineArgs: {},
      decorator: (Instance, ctx) => (
        <DatePickerProvider value={{ size: ctx?.args.size }}>
          <Instance />
        </DatePickerProvider>
      ),
    },
  },
  args: {
    label: 'Label',
    description: 'locale',
    state: 'unset',
    errorMessage: 'This is an error message',
    children: <span>children</span>,
  },
  argTypes: {},
};

export default meta;

const Template: StoryFn<typeof DateInputWrapper> = props => (
  <LeafyGreenProvider>
    <DateInputWrapper {...props}>
      <input
        style={{
          border: 'none',
          outline: '1px solid red',
          padding: 0,
          margin: 0,
          width: '100px',
        }}
      />
      {'/'}
      <input
        style={{
          border: 'none',
          outline: '1px solid red',
          padding: 0,
          margin: 0,
          width: '100px',
        }}
      />
    </DateInputWrapper>
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});

export const Generated = () => {};
