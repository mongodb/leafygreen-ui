/* eslint-disable react-hooks/rules-of-hooks, react/prop-types */
import React, { useRef } from 'react';
import { Decorator, StoryObj } from '@storybook/react';
import omit from 'lodash/omit';
import MockDate from 'mockdate';

import { Month } from '@leafygreen-ui/date-picker/shared/constants';
import {
  contextPropNames,
  DatePickerContextProps,
  DatePickerProvider,
  defaultDatePickerContext,
} from '@leafygreen-ui/date-picker/shared/DatePickerContext';
import { newUTC } from '@leafygreen-ui/date-picker/utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';

import { DateRangeProvider } from '../DateRangeContext';
import { DateRangeContextProps } from '../DateRangeContext/DateRangeContext.types';

import { DateRangeMenu } from './DateRangeMenu';
import { DateRangeMenuProps } from './DateRangeMenu.types';

const mockToday = newUTC(2023, Month.September, 14);

type DateRangeMenuStoryProps = DateRangeMenuProps &
  DateRangeContextProps &
  DatePickerContextProps;

type DateRangeMenuStoryType = StoryObj<DateRangeMenuStoryProps>;

const MenuDecorator: Decorator<DateRangeMenuStoryProps> = (Story, ctx) => {
  const {
    darkMode,
    value,
    label,
    description,
    dateFormat,
    timeZone,
    min,
    max,
    ...args
  } = ctx.args as DateRangeMenuStoryProps;

  // Force `new Date()` to return `mockToday`
  MockDate.set(mockToday);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <DatePickerProvider
        value={{
          ...defaultDatePickerContext,
          label,
          description,
          dateFormat,
          timeZone,
          min,
          max,
          initialOpen: true,
        }}
      >
        <DateRangeProvider
          rootRef={React.createRef()}
          value={value}
          setValue={() => {}}
          handleValidation={() => {}}
        >
          <Story {...args} />
        </DateRangeProvider>
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DateRangeMenu, DateRangeMenuStoryProps> = {
  title: 'Components/DatePicker/DateRangePicker/DateRangeMenu',
  component: DateRangeMenu,
  // @ts-expect-error
  decorators: [MenuDecorator],
  parameters: {
    default: null,
    chromatic: {
      delay: transitionDuration.slower,
    },
  },
  args: {
    isOpen: true,
    dateFormat: 'en-UK',
    timeZone: 'Europe/London',
    min: new Date('1996-10-14'),
    max: new Date('2026-10-14'),
    showQuickSelection: true,
  },
  argTypes: {},
};

export default meta;

export const Basic: DateRangeMenuStoryType = {
  render: (args: DateRangeMenuProps) => {
    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <>
        <code ref={refEl}>refEl</code>
        <DateRangeMenu {...props} refEl={refEl} />
      </>
    );
  },
};

export const WithValue: DateRangeMenuStoryType = {
  args: {
    value: [newUTC(2023, Month.September, 14), null],
  },
  render: (args: DateRangeMenuProps) => {
    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <div style={{ minHeight: '50vh' }}>
        <InlineCode ref={refEl}>refEl</InlineCode>
        <DateRangeMenu {...props} refEl={refEl} />
      </div>
    );
  },
};

export const DarkMode: DateRangeMenuStoryType = {
  ...WithValue,
  args: {
    darkMode: true,
  },
};

/**
 * Chromatic Interaction tests
 */
// TODO:

// type DateRangeMenuInteractionTestType = Omit<DateRangeMenuStoryType, 'play'> &
//   Required<Pick<DateRangeMenuStoryType, 'play'>>;

// export const InitialFocusToday: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     const { findByRole } = within(ctx.canvasElement.parentElement!);
//     await findByRole('listbox');
//     userEvent.tab();
//   },
// };
// export const InitialFocusValue: DateRangeMenuInteractionTestType = {
//   ...WithValue,
//   play: async ctx => {
//     const { findByRole } = within(ctx.canvasElement.parentElement!);
//     await findByRole('listbox');
//     userEvent.tab();
//   },
// };

// export const LeftArrowKey: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowleft}');
//   },
// };

// export const RightArrowKey: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowright}');
//   },
// };

// export const UpArrowKey: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowup}');
//   },
// };

// export const DownArrowKey: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowdown}');
//   },
// };

// export const UpToPrevMonth: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowup}{arrowup}');
//   },
// };

// export const DownToNextMonth: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await InitialFocusToday.play(ctx);
//     userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
//   },
// };

// export const OpenMonthMenu: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     const canvas = within(ctx.canvasElement.parentElement!);
//     await canvas.findByRole('listbox');
//     const monthMenu = await canvas.findByLabelText('Select month');
//     userEvent.click(monthMenu);
//   },
// };

// export const SelectJanuary: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await OpenMonthMenu.play(ctx);
//     const { findAllByRole } = within(ctx.canvasElement.parentElement!);
//     const options = await findAllByRole('option');
//     const Jan = options[0];
//     userEvent.click(Jan);
//   },
// };

// export const OpenYearMenu: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     const canvas = within(ctx.canvasElement.parentElement!);
//     await canvas.findByRole('listbox');
//     const monthMenu = await canvas.findByLabelText('Select year');
//     userEvent.click(monthMenu);
//   },
// };

// export const Select2026: DateRangeMenuInteractionTestType = {
//   ...Basic,
//   play: async ctx => {
//     await OpenYearMenu.play(ctx);
//     const { findAllByRole } = within(ctx.canvasElement.parentElement!);
//     const options = await findAllByRole('option');
//     const _2026 = last(options);
//     userEvent.click(_2026!);
//   },
// };
