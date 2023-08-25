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
        <DatePickerProvider value={{ size: ctx?.args.size }}>
          <Instance />
        </DatePickerProvider>
      ),
      args: {
        children: (
          <input
            className={css`
              border: none;
              padding: 0;
              margin: 0;
              font-family: inherit;
              &::placeholder {
              }
            `}
            placeholder="placeholder"
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
    <LeafyGreenProvider>
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
    </LeafyGreenProvider>
  );
};

export const Basic = Template.bind({});

export const Generated = () => {};
