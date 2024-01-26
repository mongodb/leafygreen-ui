import React from 'react';
import { StoryFn } from '@storybook/react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';

import {
  SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../../context';

import { CalendarCell } from './CalendarCell';
import {
  CalendarCellRangeState,
  CalendarCellState,
} from './CalendarCell.types';

const meta: StoryMetaType<typeof CalendarCell, SharedDatePickerContextProps> = {
  title: 'Components/DatePicker/Shared/CalendarCell',
  component: CalendarCell,
  parameters: {
    default: null,
    generate: {
      storyNames: ['DefaultCells', 'ActiveCells', 'DisabledCells'],
      combineArgs: {
        darkMode: [false, true],
        'data-hover': [false, true],
        isHighlighted: [false, true],
        isCurrent: [false, true],
        rangeState: Object.values(CalendarCellRangeState),
      },
      decorator: (Instance, ctx) => {
        const {
          args: { darkMode, size, ...props },
        } = ctx ?? { args: {} };

        return (
          <LeafyGreenProvider darkMode={darkMode}>
            {/* @ts-expect-error - incomplete context value */}
            <SharedDatePickerProvider value={{ size }}>
              <Instance {...props} />
            </SharedDatePickerProvider>
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

Basic.parameters = {
  chromatic: { disableSnapshot: true },
};

export const DefaultCells: StoryFn<typeof CalendarCell> = () => <></>;
DefaultCells.parameters = {
  generate: {
    args: {
      state: CalendarCellState.Default,
    },

    excludeCombinations: [
      {
        'data-hover': false,
        rangeState: CalendarCellRangeState.Start,
      },
      {
        'data-hover': false,
        rangeState: CalendarCellRangeState.End,
      },
      {
        'data-hover': true,
        rangeState: CalendarCellRangeState.Range,
      },
    ],
  },
};

export const ActiveCells: StoryFn<typeof CalendarCell> = () => <></>;
ActiveCells.parameters = {
  generate: {
    args: {
      state: CalendarCellState.Active,
    },
    excludeCombinations: [
      {
        rangeState: CalendarCellRangeState.Range,
      },
    ],
  },
};

export const DisabledCells: StoryFn<typeof CalendarCell> = () => <></>;
DisabledCells.parameters = {
  generate: {
    args: {
      state: CalendarCellState.Disabled,
    },
    excludeCombinations: [
      {
        'data-hover': true,
      },
      {
        isHighlighted: true,
      },
    ],
  },
};
