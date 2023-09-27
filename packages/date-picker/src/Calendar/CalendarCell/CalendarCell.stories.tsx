import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';

import { CalendarCell } from './CalendarCell';
import { CalendarCellState } from './CalendarCell.types';

const meta: StoryMetaType<typeof CalendarCell, DatePickerContextProps> = {
  title: 'Components/DatePicker/CalendarCell',
  component: CalendarCell,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        isHighlighted: [false, true],
        'data-hover': [false, true],
        isCurrent: [false, true],
        state: Object.values(CalendarCellState),
      },
      decorator: (Instance, ctx) => {
        const {
          args: { darkMode, size, ...props },
        } = ctx ?? { args: {} };

        return (
          <LeafyGreenProvider darkMode={darkMode}>
            {/* @ts-expect-error - incomplete context value */}
            <DatePickerProvider value={{ size }}>
              <Instance {...props} />
            </DatePickerProvider>
          </LeafyGreenProvider>
        );
      },
      args: {
        'data-highlight': true,
      },
    },
  },
  args: { children: '26' },
  argTypes: {},
};

export default meta;

const Template: StoryFn<typeof CalendarCell> = props => (
  <LeafyGreenProvider>
    <CalendarCell {...props} />
  </LeafyGreenProvider>
);

export const Basic = Template.bind({});

export const Generated = () => {};
