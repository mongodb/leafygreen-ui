import React from 'react';
import { StoryFn } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';

import { getTestUtils, Toolbar, ToolbarIconButton, ToolbarProps } from '.';

export default {
  title: 'Components/Toolbar/Interactions',
  component: Toolbar,
  parameters: {
    default: 'LiveExample',
    controls: {
      exclude: ['children'],
    },
  },
  decorators: [
    Story => (
      <div style={{ position: 'relative', height: '40vh' }}>
        <Button data-testid="test-button-1">Tab</Button>
        <Story />
        <Button data-testid="test-button-2">Tab</Button>
      </div>
    ),
  ],
  args: {
    children: (
      <>
        <ToolbarIconButton label="This is the label" glyph="Code" />
        <ToolbarIconButton label="Plus" glyph="Plus" disabled />
      </>
    ),
  },
};

const Template: StoryFn<typeof Toolbar> = props => <Toolbar {...props} />;

// Hovering over the icon button should show the tooltip
export const ShowTooltipOnHover = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Hover over the first icon button
    await userEvent.hover(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    await waitFor(() =>
      expect(canvas.getByText('This is the label')).toBeVisible(),
    );
  },
};

// Pressing Tab key should focus the first icon button
export const FocusFirstIconButtonOnTab = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    await waitFor(async () => {
      expect(document.activeElement).toBe(
        getToolbarIconButtonByLabel('This is the label')?.getElement(),
      );
    });
  },
};

// Pressing down arrow key should focus the next icon button
export const FocusNextIconButtonOnArrowDown = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    // Press Down arrow key
    await userEvent.keyboard('{ArrowDown}');
    // next icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('Plus')?.getElement(),
    );
  },
};

// Pressing the down arrow key on the last icon button should focus the first icon button
export const WrapFocusToFirstIconButtonOnArrowDown = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();
    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    // Press Down arrow key and focus the first icon button
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('Plus')?.getElement(),
    );

    // Press Down arrow key
    await userEvent.keyboard('{ArrowDown}');
    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );
  },
};

// Pressing the up arrow key on the first icon button should focus the last icon button
export const WrapFocusToLastIconButtonOnArrowUp = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the first button
    button1.focus();
    // First button should be focused
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    // Press Down arrow key
    await userEvent.keyboard('{ArrowUp}');
    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('Plus')?.getElement(),
    );
  },
};

// Pressing tab twice should focus the second testing button
export const FocusSecondButtonAfterTwoTabs = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const button2 = await canvas.findByTestId('test-button-2');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the first button
    button1.focus();
    // First button should be focused
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    // Press Tab key
    await userEvent.tab();
    // Second button should be focused
    expect(document.activeElement).toBe(button2);
  },
};

// Pressing Shift+Tab key should focus the first testing button
export const ReverseFocusToFirstButtonWithShiftTab = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const button2 = await canvas.findByTestId('test-button-2');
    const { getToolbarIconButtonByLabel } = getTestUtils();

    // Focus the second button
    button2.focus();
    // Second button should be focused
    expect(document.activeElement).toBe(button2);

    // Press Shift+Tab key
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    // First icon button should be focused
    expect(document.activeElement).toBe(
      getToolbarIconButtonByLabel('This is the label')?.getElement(),
    );

    // Press Shift+Tab key
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    // First button should be focused
    expect(document.activeElement).toBe(button1);
  },
};
