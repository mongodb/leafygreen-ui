import React from 'react';
import {
  storybookArgTypes,
  storybookExcludedControlParams,
  StoryMetaType,
  StoryType,
} from '@lg-tools/storybook-utils';
import { StoryObj } from '@storybook/react';

import { css } from '@leafygreen-ui/emotion';
import { Icon } from '@leafygreen-ui/icon';
import { MenuItem } from '@leafygreen-ui/menu';

import { FormFooter, FormFooterProps } from '.';

const wrapperStyle = css`
  min-width: 40vw;
  width: 100%;
`;

const meta: StoryMetaType<typeof FormFooter> = {
  title: 'Components/Inputs/FormFooter',
  component: FormFooter,
  decorators: [
    StoryFn => (
      <div className={wrapperStyle}>
        <StoryFn />
      </div>
    ),
  ],
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: [...storybookExcludedControlParams, 'contentClassName'],
    },
    generate: {
      storyNames: ['LightMode', 'DarkMode'],
      combineArgs: {
        backButtonProps: [
          undefined,
          { children: 'Back', leftGlyph: undefined },
          { children: 'Back', leftGlyph: <Icon glyph="ArrowLeft" /> },
          { children: 'Delete Trigger', variant: 'dangerOutline' },
        ],
        cancelButtonProps: [undefined, { children: 'Cancel' }],
        primaryButtonProps: [
          { children: 'Confirm', variant: 'primary' },
          { children: 'Confirm', variant: 'danger' },
        ],
        errorMessage: [undefined, 'This is an error message'],
      },
      decorator: StoryFn => (
        <div className={wrapperStyle}>
          <StoryFn />
        </div>
      ),
    },
  },
  args: {
    darkMode: false,
    errorMessage: 'Error message',
  },
  argTypes: {
    darkMode: storybookArgTypes.darkMode,
    errorMessage: { control: 'text' },
    contentClassName: { control: 'text' },
  },
};
export default meta;

type FormFooterStoryProps = FormFooterProps & { primaryButtonText?: string };

const Template: StoryType<typeof FormFooter> = ({
  primaryButtonProps,
  ...args
}: FormFooterStoryProps) => (
  <FormFooter
    {...args}
    primaryButtonProps={{ children: 'Button', variant: 'primary' }}
  />
);

const StickyTemplate: StoryType<typeof FormFooter> = ({
  primaryButtonProps,
  ...args
}: FormFooterStoryProps) => (
  <div
    className={css`
      padding-top: calc(100vh - 92px);
      position: relative;
    `}
  >
    <FormFooter
      {...args}
      primaryButtonProps={{ children: 'Button', variant: 'primary' }}
      className={css`
        position: sticky;
        bottom: 0;
        z-index: 1;
      `}
    />
  </div>
);
export const LiveExample: StoryObj<FormFooterProps> = {
  render: Template,
  parameters: {
    chromatic: {
      disableSnapshot: true,
    },
  },
  args: {
    backButtonProps: { children: 'Back' },
    cancelButtonProps: { children: 'Cancel' },
  },
};

export const CustomSplitButton: StoryObj<typeof FormFooter> = {
  render: Template,
  args: {
    cancelButtonProps: {
      label: 'More options',
      menuItems: [
        <MenuItem key="0">Menu Item 1</MenuItem>,
        <MenuItem key="1">Menu Item 2</MenuItem>,
        <MenuItem key="2">Menu Item 3</MenuItem>,
      ],
    },
  },
};

export const LightMode: StoryObj<typeof FormFooter> = {
  render: Template,
  args: {
    darkMode: false,
  },
};

export const DarkMode: StoryObj<typeof FormFooter> = {
  render: Template,
  args: {
    darkMode: true,
  },
};

export const StickyFooter: StoryObj<typeof FormFooter> = {
  render: StickyTemplate,
  args: {},
};
