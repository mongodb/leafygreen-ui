/* eslint-disable react-hooks/rules-of-hooks, react/prop-types */
import React, { useRef, useState } from 'react';
import { StoryFn, StoryObj } from '@storybook/react';
import { findByRole, userEvent, within } from '@storybook/testing-library';
import { omit } from 'lodash';
import MockDate from 'mockdate';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';
import { StoryMetaType } from '@leafygreen-ui/lib';
import { transitionDuration } from '@leafygreen-ui/tokens';
import { InlineCode } from '@leafygreen-ui/typography';

import { Month } from '../../constants';
import {
  DatePickerContextProps,
  DatePickerProvider,
} from '../../DatePickerContext';
import {
  contextPropNames,
  defaultDatePickerContext,
} from '../../DatePickerContext/DatePickerContext.utils';
import { newUTC } from '../../utils/newUTC';
import { pickAndOmit } from '../../utils/pickAndOmit';

import { DatePickerMenu } from './DatePickerMenu';
import { DatePickerMenuProps } from './DatePickerMenu.types';

const mockToday = newUTC(2023, Month.September, 14);
type DecoratorArgs = DatePickerMenuProps & DatePickerContextProps;

const MenuDecorator = (Story: StoryFn, ctx: any) => {
  const [{ darkMode, ...contextProps }, { isOpen, ...props }] = pickAndOmit(
    ctx?.args as DecoratorArgs,
    [...contextPropNames],
  );

  MockDate.set(mockToday);

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <DatePickerProvider
        value={{ ...defaultDatePickerContext, ...contextProps, isOpen }}
      >
        <Story {...props} />
      </DatePickerProvider>
    </LeafyGreenProvider>
  );
};

const meta: StoryMetaType<typeof DatePickerMenu, DecoratorArgs> = {
  title: 'Components/DatePicker/DatePickerMenu',
  component: DatePickerMenu,
  decorators: [MenuDecorator],
  parameters: {
    default: null,
    // generate: {
    //   combineArgs: {
    //     darkMode: [false, true],
    //     value: [null, new Date('1993-12-26')],
    //     dateFormat: ['iso8601', 'en-US', 'en-UK', 'de-DE'],
    //     timeZone: ['UTC', 'Europe/London', 'America/New_York', 'Asia/Seoul'],
    //   },
    //   excludeCombinations: [
    //     {
    //       timeZone: ['Europe/London', 'America/New_York', 'Asia/Seoul'],
    //       value: null,
    //     },
    //   ],
    //   decorator: MenuDecorator,
    // },
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
  },
  argTypes: {
    value: { control: 'date' },
  },
};

export default meta;

type DatePickerMenuStory = StoryObj<typeof DatePickerMenu>;

export const Basic: DatePickerMenuStory = {
  render: args => {
    const [value, setValue] = useState<Date | null>(null);

    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <>
        <code ref={refEl}>refEl</code>
        <DatePickerMenu
          {...props}
          refEl={refEl}
          value={value}
          onCellClick={setValue}
        />
      </>
    );
  },
};

export const WithValue: DatePickerMenuStory = {
  render: args => {
    const props = omit(args, [...contextPropNames, 'isOpen']);
    const refEl = useRef<HTMLDivElement>(null);
    return (
      <div style={{ minHeight: '50vh' }}>
        <InlineCode ref={refEl}>refEl</InlineCode>
        <DatePickerMenu
          {...props}
          refEl={refEl}
          value={newUTC(2023, Month.September, 10)}
          onCellClick={() => {}}
        />
      </div>
    );
  },
};

export const DarkMode: DatePickerMenuStory = {
  ...WithValue,
  args: {
    // @ts-expect-error - DatePickerMenuStory does not include Context props
    darkMode: true,
  },
};

/**
 * Chromatic Interaction tests
 */

export const InitialTodayHighlight: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    within(ctx.canvasElement);
    await findByRole(ctx.canvasElement.parentElement!, 'listbox');
    userEvent.tab();
  },
};
export const InitialValueHighlight: DatePickerMenuStory = {
  ...WithValue,
  play: async ctx => {
    within(ctx.canvasElement);
    await findByRole(ctx.canvasElement.parentElement!, 'listbox');
    userEvent.tab();
  },
};

export const LeftArrowKey: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowleft}');
  },
};

export const RightArrowKey: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowright}');
  },
};

export const UpArrowKey: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowup}');
  },
};

export const DownArrowKey: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowdown}');
  },
};

export const UpToPrevMonth: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowup}{arrowup}');
  },
};

export const DownToNextMonth: DatePickerMenuStory = {
  ...Basic,
  play: async ctx => {
    // @ts-expect-error
    await InitialTodayHighlight.play(ctx);
    userEvent.keyboard('{arrowdown}{arrowdown}{arrowdown}');
  },
};

// export const Generated = () => {};
