/* eslint-disable react-hooks/rules-of-hooks, react/prop-types */
import React, { useRef, useState } from 'react';
import { Decorator, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import last from 'lodash/last';
import omit from 'lodash/omit';
import MockDate from 'mockdate';

import {
  DateType,
  Month,
  newUTC,
  testLocales,
  testTimeZoneLabels,
} from '@leafygreen-ui/date-utils';
import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { type StoryMetaType } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';

import {
  contextPropNames,
  type SharedDatePickerContextProps,
  SharedDatePickerProvider,
} from '../../shared/context';
import { getProviderPropsFromStoryContext } from '../../shared/testutils';
import {
  type DatePickerContextProps,
  DatePickerProvider,
} from '../DatePickerContext';

import { DatePickerMenu } from './DatePickerMenu';
import { DatePickerMenuProps } from './DatePickerMenu.types';

const mockToday = newUTC(2023, Month.September, 14);
type DecoratorArgs = DatePickerMenuProps &
  DatePickerContextProps &
  SharedDatePickerContextProps;

const MenuDecorator: Decorator = (Story: StoryFn, ctx: any) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext<DatePickerMenuProps>(ctx.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <SharedDatePickerProvider {...datePickerProviderProps} initialOpen={true}>
        <Story {...storyProps} />
      </SharedDatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DatePickerMenu, DecoratorArgs> = {
  title: 'Components/DatePicker/DatePicker/DatePickerMenu',
  component: DatePickerMenu,
  decorators: [MenuDecorator],
  parameters: {
    default: null,
    chromatic: {
      delay: transitionDuration.slower,
    },
  },
  args: {
    isOpen: true,
    min: new Date('1996-10-14'),
    max: new Date('2026-10-14'),
  },
  argTypes: {
    value: { control: 'date' },
    locale: { control: 'select', options: testLocales },
    timeZone: {
      control: 'select',
      options: [undefined, ...testTimeZoneLabels],
    },
  },
};

export default meta;

type DatePickerMenuStoryType = StoryObj<typeof DatePickerMenu>;

export const WithValue: DatePickerMenuStoryType = {
  render: args => {
    MockDate.reset();

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    const withValueDate = new Date(2023, Month.September, 10);
    return (
      <DatePickerProvider
        value={newUTC(2023, Month.September, 10)}
        setValue={() => {}}
      >
        <div style={{ minHeight: '50vh' }}>
          <InlineCode ref={refEl}>
            Value:{' '}
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'full',
            }).format(withValueDate)}
          </InlineCode>
          <DatePickerMenu {...props} refEl={refEl} />
        </div>
      </DatePickerProvider>
    );
  },
};

export const WithValueDarkMode: DatePickerMenuStoryType = {
  ...WithValue,
  args: {
    // @ts-expect-error - DatePickerMenuStoryType does not include Context props
    darkMode: true,
  },
};

export const MockedToday: DatePickerMenuStoryType = {
  render: args => {
    // Force `new Date()` to return `mockToday`
    MockDate.set(mockToday);
    const [value, setValue] = useState<DateType>(null);

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <DatePickerProvider value={value} setValue={setValue}>
        <div style={{ minHeight: '50vh' }}>
          <InlineCode ref={refEl}>
            Mocked Today:{' '}
            {new Intl.DateTimeFormat('en-GB', {
              dateStyle: 'full',
            }).format(mockToday)}
          </InlineCode>
          <DatePickerMenu {...props} refEl={refEl} />
        </div>
      </DatePickerProvider>
    );
  },
};

export const MockedTodayDarkMode: DatePickerMenuStoryType = {
  ...MockedToday,
  args: {
    // @ts-expect-error - DatePickerMenuStoryType does not include Context props
    darkMode: true,
  },
};

type DatePickerMenuInteractionTestType = Omit<DatePickerMenuStoryType, 'play'> &
  Required<Pick<DatePickerMenuStoryType, 'play'>>;

/**
 * Chromatic Interaction tests
 */

export const InitialFocusMockedToday: DatePickerMenuInteractionTestType = {
  ...MockedToday,
  play: async ctx => {
    const { findByRole } = within(ctx.canvasElement.parentElement!);
    await findByRole('listbox');
    userEvent.tab();
  },
};
export const InitialFocusValue: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    const { findByRole } = within(ctx.canvasElement.parentElement!);
    await findByRole('listbox');
    userEvent.tab();
  },
};

export const LeftArrowKey: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowleft}');
  },
};

export const RightArrowKey: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowright}');
  },
};

export const UpArrowKey: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowup}');
  },
};

export const DownArrowKey: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowdown}');
  },
};

export const UpToPrevMonth: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowup}{arrowup}');
  },
};

export const DownToNextMonth: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await InitialFocusMockedToday.play(ctx);
    userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
  },
};

export const OpenMonthMenu: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    const canvas = within(ctx.canvasElement.parentElement!);
    await canvas.findByRole('listbox');
    const monthMenu = await canvas.findByLabelText('Select month', {
      exact: false,
    });
    userEvent.click(monthMenu);
  },
};

export const SelectJanuary: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await OpenMonthMenu.play(ctx);
    const { findAllByRole } = within(ctx.canvasElement.parentElement!);
    const options = await findAllByRole('option');
    const Jan = options[0];
    userEvent.click(Jan);
  },
};

export const OpenYearMenu: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    const canvas = within(ctx.canvasElement.parentElement!);
    await canvas.findByRole('listbox');
    const monthMenu = await canvas.findByLabelText('Select year', {
      exact: false,
    });
    userEvent.click(monthMenu);
  },
};

export const Select2026: DatePickerMenuInteractionTestType = {
  ...WithValue,
  play: async ctx => {
    await OpenYearMenu.play(ctx);
    const { findAllByRole } = within(ctx.canvasElement.parentElement!);
    const options = await findAllByRole('option');
    const _2026 = last(options);
    userEvent.click(_2026!);
  },
};
