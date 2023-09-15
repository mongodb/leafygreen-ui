/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { DateFormField } from './DateFormField';

const meta: StoryMetaType<
  typeof DateFormField,
  Partial<DatePickerContextProps>
> = {
  title: 'Components/DatePicker/DateFormField',
  component: DateFormField,
  parameters: {
    default: null,
    controls: {
      exclude: ['inputId', 'descriptionId', 'errorId'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: [undefined, 'Label'],
        description: [undefined, 'Description'],
        state: ['unset', 'error'],
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
          {/* @ts-expect-error - incomplete context value */}
          <DatePickerProvider value={{ size: ctx?.args.size }}>
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
    state: 'error',
    errorMessage: 'This is an error message',
  },
  argTypes: {
    inputId: { control: 'none' },
    descriptionId: { control: 'none' },
    errorId: { control: 'none' },
    darkMode: { control: 'boolean' },
  },
};

export default meta;

const Template: StoryFn<typeof DateFormField> = ({
  label,
  description,
  state,
  errorMessage,
}) => {
  const inputId = 'input';
  const descriptionId = 'descr';
  const errorId = 'error';

  return (
    <DateFormField
      label={label}
      description={description}
      state={state}
      errorMessage={errorMessage}
      inputId={inputId}
      descriptionId={descriptionId}
      errorId={errorId}
    >
      <input
        id={inputId}
        aria-describedby={descriptionId + ' ' + errorId}
        style={{
          border: 'none',
          outline: '1px solid green',
          padding: 0,
          margin: 0,
          width: '100px',
          fontFamily: 'inherit',
        }}
        placeholder="<placeholder>"
      />
    </DateFormField>
  );
};

export const Basic = Template.bind({});

export const Generated = () => {};
