/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { Size } from '@leafygreen-ui/tokens';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../../context';
import { DatePickerState } from '../../../types';

import { DateFormField } from './DateFormField';

const ProviderWrapper = (Story: StoryFn, ctx?: { args: any }) => {
  return (
    <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
      <SharedDatePickerProvider {...ctx?.args}>
        <Story />
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<
  typeof DateFormField,
  Partial<SharedDatePickerContextProps>
> = {
  title: 'Components/DatePicker/Shared/DateFormField',
  component: DateFormField,
  parameters: {
    default: null,
    controls: {
      exclude: ['inputId', 'descriptionId', 'errorId'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: ['Label', undefined],
        description: [undefined, 'Description'],
        state: Object.values(DatePickerState),
        disabled: [false, true],
        size: Object.values(Size),
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'Description',
        },
      ],
      decorator: ProviderWrapper,
      args: {
        children: (
          <input
            className={css`
              border: none;
              padding: 0;
              margin: 0;
              font-family: inherit;
              background-color: inherit;
              color: inherit;
            `}
            placeholder="<placeholder text>"
          />
        ),
      },
    },
  },
  args: {
    label: 'Label',
    description: 'Description',
    errorMessage: 'This is an error message',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<typeof DateFormField> = () => {
  return (
    <SharedDatePickerProvider
      {...{
        label: 'Label',
        description: 'Description',
        state: DatePickerState.Error,
        errorMessage: 'This is an error message',
      }}
    >
      <DateFormField buttonRef={React.createRef()}>
        <input
          style={{
            border: 'none',
            padding: 0,
            margin: 0,
            width: '100px',
            fontFamily: 'inherit',
          }}
          placeholder="<placeholder>"
        />
      </DateFormField>
    </SharedDatePickerProvider>
  );
};

export const Basic = Template.bind({});

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const Generated = () => {};
