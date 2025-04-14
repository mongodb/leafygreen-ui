import React from 'react';
import { StoryFn } from '@storybook/react';
import { expect, userEvent, waitFor, within } from '@storybook/test';

import Button from '@leafygreen-ui/button';

import { Toolbar, ToolbarIconButton, ToolbarProps } from '.';

export default {
  title: 'Components/Toolbar/Ineractions',
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
        <ToolbarIconButton label="Code" glyph="Code" />
        <ToolbarIconButton label="Plus" glyph="Plus" disabled />
      </>
    ),
  },
};

const Template: StoryFn<typeof Toolbar> = props => <Toolbar {...props} />;

// Pressing Tab key should focus the first icon button
export const FocusFirstIconButtonOnTab = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    await waitFor(async () => {
      expect(document.activeElement).toBe(toolbarIconButtons[0]);
    });
  },
};

// Pressing down arrow key should focus the next icon button
export const FocusNextIconButtonOnArrowDown = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);

    // Press Down arrow key
    await userEvent.keyboard('{ArrowDown}');
    // next icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[1]);
  },
};

// Pressing the down arrow key on the last icon button should focus the first icon button
export const WrapFocusToFirstIconButtonOnArrowDown = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the first button
    button1.focus();
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();
    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);

    // Press Down arrow key and focus the first icon button
    await userEvent.keyboard('{ArrowDown}');
    expect(document.activeElement).toBe(toolbarIconButtons[1]);

    // Press Down arrow key
    await userEvent.keyboard('{ArrowDown}');
    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);
  },
};

// Pressing the up arrow key on the first icon button should focus the last icon button
export const WrapFocusToLastIconButtonOnArrowUp = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the first button
    button1.focus();
    // First button should be focused
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);

    // Press Down arrow key
    await userEvent.keyboard('{ArrowUp}');
    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[1]);
  },
};

// Pressing tab twice should focus the second testing button
export const FocusSecondButtonAfterTwoTabs = {
  render: (args: ToolbarProps) => <Template {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button1 = await canvas.findByTestId('test-button-1');
    const button2 = await canvas.findByTestId('test-button-2');
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the first button
    button1.focus();
    // First button should be focused
    expect(document.activeElement).toBe(button1);

    // Press Tab key
    await userEvent.tab();

    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);

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
    const toolbarIconButtons = await canvas.findAllByTestId(
      'lg-toolbar-icon_button',
    );

    // Focus the second button
    button2.focus();
    // Second button should be focused
    expect(document.activeElement).toBe(button2);

    // Press Shift+Tab key
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');

    // First icon button should be focused
    expect(document.activeElement).toBe(toolbarIconButtons[0]);

    // Press Shift+Tab key
    await userEvent.keyboard('{Shift>}{Tab}{/Shift}');
    // First button should be focused
    expect(document.activeElement).toBe(button1);
  },
};
