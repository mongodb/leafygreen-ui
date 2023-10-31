/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import { DatePickerState } from '../../../types';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateFormField } from './DateFormField';

const meta: StoryMetaType<
  typeof DateFormField,
  Partial<DatePickerContextProps>
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
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'Description',
        },
      ],
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider
          darkMode={ctx?.args.darkMode}
          baseFontSize={ctx?.args.baseFontSize}
        >
          <DatePickerProvider
            // @ts-expect-error - incomplete context value
            value={{ ...ctx?.args }}
          >
            <Instance />
          </DatePickerProvider>
        </LeafyGreenProvider>
      ),
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
    state: DatePickerState.Error,
    errorMessage: 'This is an error message',
  },
  argTypes: {
    darkMode: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<typeof DateFormField> = () => {
  return (
    <DatePickerProvider
      value={{
        label: 'Label',
        description: 'Description',
        state: DatePickerState.Error,
        errorMessage: 'This is an error message',
      }}
    >
      <DateFormField>
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
    </DatePickerProvider>
  );
};

export const Basic = Template.bind({});

export const Generated = () => {};
