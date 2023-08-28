/* eslint-disable react/prop-types */
import React from 'react';
import { StoryFn } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
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
    controls: {
      exclude: ['inputId', 'descriptionId', 'errorId'],
    },
    generate: {
      combineArgs: {
        darkMode: [false, true],
        label: [undefined, 'Label'],
        description: [undefined, 'United States'],
        state: ['unset', 'error'],
      },
      excludeCombinations: [
        {
          label: undefined,
          description: 'United States',
        },
      ],
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider
          darkMode={ctx?.args.darkMode}
          baseFontSize={ctx?.args.baseFontSize}
        >
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
    description: 'United States',
    state: 'unset',
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

const Template: StoryFn<typeof DateInputWrapper> = ({
  label,
  description,
  state,
  errorMessage,
}) => {
  const inputId = 'input';
  const descriptionId = 'descr';
  const errorId = 'error';

  return (
    <DateInputWrapper
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
    </DateInputWrapper>
  );
};

export const Basic = Template.bind({});

export const Generated = () => {};
