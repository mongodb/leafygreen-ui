/* eslint-disable react-hooks/rules-of-hooks, react/prop-types */
import React, { useRef, useState } from 'react';
import { Decorator, StoryFn, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';
import { last, omit } from 'lodash';
import MockDate from 'mockdate';

import {
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
  type DatePickerContextProps,
  DatePickerProvider,
} from '../../shared/components/DatePickerContext';
import { getProviderPropsFromStoryContext } from '../../shared/testutils';
import {
  type SingleDateContextProps,
  SingleDateProvider,
} from '../SingleDateContext';

import { DatePickerMenu } from './DatePickerMenu';
import { DatePickerMenuProps } from './DatePickerMenu.types';

const mockToday = newUTC(2023, Month.September, 14);
type DecoratorArgs = DatePickerMenuProps &
  SingleDateContextProps &
  DatePickerContextProps;

const MenuDecorator: Decorator = (Story: StoryFn, ctx: any) => {
  const { leafyGreenProviderProps, datePickerProviderProps, storyProps } =
    getProviderPropsFromStoryContext<DatePickerMenuProps>(ctx.args);

  return (
    <LeafyGreenProvider {...leafyGreenProviderProps}>
      <DatePickerProvider {...datePickerProviderProps} initialOpen={true}>
        <Story {...storyProps} />
      </DatePickerProvider>
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

export const Basic: DatePickerMenuStoryType = {
  render: args => {
    MockDate.reset();
    const [value, setValue] = useState<Date | null>(null);

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <SingleDateProvider value={value} setValue={setValue}>
        <InlineCode ref={refEl}>
          Today: {new Date(Date.now()).toUTCString()}
        </InlineCode>
        <DatePickerMenu {...props} refEl={refEl} />
      </SingleDateProvider>
    );
  },
};

export const WithValue: DatePickerMenuStoryType = {
  render: args => {
    MockDate.reset();

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <SingleDateProvider
        value={newUTC(2023, Month.September, 10)}
        setValue={() => {}}
      >
        <div style={{ minHeight: '50vh' }}>
          <InlineCode ref={refEl}>
            Today: {new Date(Date.now()).toUTCString()}
          </InlineCode>
          <DatePickerMenu {...props} refEl={refEl} />
        </div>
      </SingleDateProvider>
    );
  },
};

export const MockedToday: DatePickerMenuStoryType = {
  render: args => {
    // Force `new Date()` to return `mockToday`
    MockDate.set(mockToday);
    const [value, setValue] = useState<Date | null>(null);

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <SingleDateProvider value={value} setValue={setValue}>
        <InlineCode ref={refEl}>
          Today: {new Date(Date.now()).toUTCString()}
        </InlineCode>
        <DatePickerMenu {...props} refEl={refEl} />
      </SingleDateProvider>
    );
  },
};

export const DarkMode: DatePickerMenuStoryType = {
  ...WithValue,
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

export const InitialFocusToday: DatePickerMenuInteractionTestType = {
  ...Basic,
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
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowleft}');
  },
};

export const RightArrowKey: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowright}');
  },
};

export const UpArrowKey: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowup}');
  },
};

export const DownArrowKey: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowdown}');
  },
};

export const UpToPrevMonth: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowup}{arrowup}');
  },
};

export const DownToNextMonth: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await InitialFocusToday.play(ctx);
    userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
  },
};

export const OpenMonthMenu: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    const canvas = within(ctx.canvasElement.parentElement!);
    await canvas.findByRole('listbox');
    const monthMenu = await canvas.findByLabelText('Select month');
    userEvent.click(monthMenu);
  },
};

export const SelectJanuary: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await OpenMonthMenu.play(ctx);
    const { findAllByRole } = within(ctx.canvasElement.parentElement!);
    const options = await findAllByRole('option');
    const Jan = options[0];
    userEvent.click(Jan);
  },
};

export const OpenYearMenu: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    const canvas = within(ctx.canvasElement.parentElement!);
    await canvas.findByRole('listbox');
    const monthMenu = await canvas.findByLabelText('Select year');
    userEvent.click(monthMenu);
  },
};

export const Select2026: DatePickerMenuInteractionTestType = {
  ...Basic,
  play: async ctx => {
    await OpenYearMenu.play(ctx);
    const { findAllByRole } = within(ctx.canvasElement.parentElement!);
    const options = await findAllByRole('option');
    const _2026 = last(options);
    userEvent.click(_2026!);
  },
};
