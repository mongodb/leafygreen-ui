import React from 'react';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType, StoryType } from '@leafygreen-ui/lib';

import { QuickRangeButton } from './QuickRangeButton';

const meta: StoryMetaType<typeof QuickRangeButton> = {
  title: 'Components/DatePicker/DateRangePicker/QuickRangeButton',
  component: QuickRangeButton,
  parameters: {
    default: null,
    generate: {
      combineArgs: {
        darkMode: [false, true],
        'data-hover': [false, true],
        'data-focus': [false, true],
      },
      decorator: (Instance, ctx) => (
        <LeafyGreenProvider darkMode={ctx?.args.darkMode}>
          <Instance />
        </LeafyGreenProvider>
      ),
      args: {
        children: 'Last 12 months',
      },
    },
  },
};

export default meta;

export const Basic: StoryType<typeof QuickRangeButton> = () => {
  return <QuickRangeButton label="Last 12 months"></QuickRangeButton>;
};

export const Generated = () => <></>;
