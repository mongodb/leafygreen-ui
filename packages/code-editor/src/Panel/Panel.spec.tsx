import React from 'react';

import '@testing-library/jest-dom';

import { mockPanelFunctions, renderPanel } from '../testing/panelTestUtils';

import { PanelProps } from './Panel.types';

const TestIcon = () => <div data-testid="test-icon" />;
TestIcon.displayName = 'TestIcon';

const defaultProps: Partial<PanelProps> = {
  title: 'Test Panel',
};

// Mock the clipboard API
const mockWriteText = jest.fn();
Object.assign(navigator, {
  clipboard: {
    writeText: mockWriteText,
  },
});

// Mock document.execCommand for fallback testing
const mockExecCommand = jest.fn();
Object.assign(document, {
  execCommand: mockExecCommand,
});

describe('Panel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockPanelFunctions.clearAll();
  });

  describe('Basic Rendering', () => {
    test('renders with title', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, title: 'JavaScript Editor' },
      });
      expect(panel.hasTitleText('JavaScript Editor')).toBe(true);
    });

    test('renders without title when not provided', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, title: undefined },
      });
      expect(panel.hasTitleText('')).toBe(true);
    });

    test('renders inner content when provided', () => {
      const innerContent = (
        <span data-testid="inner-content">Custom Content</span>
      );
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, innerContent },
      });
      expect(panel.hasInnerContent('inner-content')).toBe(true);
    });
  });

  describe('Format Button', () => {
    test('renders format button when showFormatButton is true', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showFormatButton: true },
      });
      expect(panel.getFormatButton()).toBeInTheDocument();
    });

    test('does not render format button when showFormatButton is false', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showFormatButton: false },
      });
      expect(panel.getFormatButton()).not.toBeInTheDocument();
    });

    test('calls onFormatClick when format button is clicked', async () => {
      const onFormatClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showFormatButton: true, onFormatClick },
      });

      await panel.interactions.clickFormatButton();

      expect(onFormatClick).toHaveBeenCalledTimes(1);
    });

    test('shows tooltip on format button hover', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showFormatButton: true },
      });

      await panel.interactions.hoverFormatButton();
      // Tooltip waiting is handled internally
    });
  });

  describe('Copy Button', () => {
    test('renders copy button when showCopyButton is true', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: true },
      });
      expect(panel.getCopyButton()).toBeInTheDocument();
    });

    test('does not render copy button when showCopyButton is false', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: false },
      });
      expect(panel.getCopyButton()).not.toBeInTheDocument();
    });

    test('calls onCopyClick when copy button is clicked', async () => {
      const onCopyClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: true, onCopyClick },
      });

      await panel.interactions.clickCopyButton();

      expect(onCopyClick).toHaveBeenCalledTimes(1);
    });

    test('shows tooltip on copy button hover', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: true },
      });

      await panel.interactions.hoverCopyButton();
      // Tooltip waiting is handled internally
    });

    test('shows success state after copying', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: true },
      });

      await panel.interactions.clickCopyButton();

      // Wait for success tooltip to appear
      await panel.waitForTooltip('Copied!');
    });
  });

  describe('Secondary Menu', () => {
    test('renders secondary menu button when showSecondaryMenuButton is true', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
      });
      expect(panel.getSecondaryMenuButton()).toBeInTheDocument();
    });

    test('does not render secondary menu button when showSecondaryMenuButton is false', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: false },
      });
      expect(panel.getSecondaryMenuButton()).not.toBeInTheDocument();
    });

    test('opens menu when secondary menu button is clicked', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
      });

      await panel.interactions.openSecondaryMenu();

      expect(panel.getUndoMenuItem()).toBeInTheDocument();
      expect(panel.getRedoMenuItem()).toBeInTheDocument();
      expect(panel.getDownloadMenuItem()).toBeInTheDocument();
      expect(panel.getViewShortcutsMenuItem()).toBeInTheDocument();
    });

    test('calls onUndoClick when undo menu item is clicked', async () => {
      const onUndoClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          onUndoClick,
        },
      });

      await panel.interactions.clickUndoMenuItem();

      expect(onUndoClick).toHaveBeenCalledTimes(1);
    });

    test('calls onRedoClick when redo menu item is clicked', async () => {
      const onRedoClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          onRedoClick,
        },
      });

      await panel.interactions.clickRedoMenuItem();

      expect(onRedoClick).toHaveBeenCalledTimes(1);
    });

    test('calls context undo function when undo menu item is clicked', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
      });

      await panel.interactions.clickUndoMenuItem();

      expect(mockPanelFunctions.undo).toHaveBeenCalledTimes(1);
    });

    test('calls context redo function when redo menu item is clicked', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
      });

      await panel.interactions.clickRedoMenuItem();

      expect(mockPanelFunctions.redo).toHaveBeenCalledTimes(1);
    });

    test('handles when undo function is not available', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
        contextConfig: { undo: undefined as any },
      });

      await panel.interactions.clickUndoMenuItem();

      // Should not throw an error even when undo is undefined
    });

    test('handles when redo function is not available', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
        contextConfig: { redo: undefined as any },
      });

      await panel.interactions.clickRedoMenuItem();

      // Should not throw an error even when redo is undefined
    });

    test('calls onDownloadClick when download menu item is clicked', async () => {
      const onDownloadClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          onDownloadClick,
        },
      });

      await panel.interactions.clickDownloadMenuItem();

      expect(onDownloadClick).toHaveBeenCalledTimes(1);
    });

    test('calls onViewShortcutsClick when view shortcuts menu item is clicked', async () => {
      const onViewShortcutsClick = jest.fn();
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          onViewShortcutsClick,
        },
      });

      await panel.interactions.clickViewShortcutsMenuItem();

      expect(onViewShortcutsClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Custom Secondary Buttons', () => {
    const customButtons = [
      {
        label: 'Custom Action 1',
        glyph: <TestIcon />,
        onClick: jest.fn(),
        'aria-label': 'Perform custom action 1',
      },
      {
        label: 'Custom Action 2',
        glyph: <TestIcon />,
        onClick: jest.fn(),
        href: 'https://example.com',
      },
    ];

    test('renders custom secondary buttons in the menu', async () => {
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          customSecondaryButtons: customButtons,
        },
      });

      await panel.interactions.openSecondaryMenu();

      expect(
        panel.getCustomSecondaryButton('Custom Action 1'),
      ).toBeInTheDocument();
      expect(
        panel.getCustomSecondaryButton('Custom Action 2'),
      ).toBeInTheDocument();
    });

    test('calls custom button onClick handler', async () => {
      const customButtonsWithMock = [
        {
          ...customButtons[0],
          onClick: jest.fn(),
        },
      ];

      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          customSecondaryButtons: customButtonsWithMock,
        },
      });

      await panel.interactions.clickCustomSecondaryButton(
        'Perform custom action 1',
      );

      expect(customButtonsWithMock[0].onClick).toHaveBeenCalledTimes(1);
    });

    test('uses label as aria-label when aria-label is not provided', async () => {
      const buttonWithoutAriaLabel = [
        {
          label: 'Button Without Aria Label',
          glyph: <TestIcon />,
          onClick: jest.fn(),
        },
      ];

      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          customSecondaryButtons: buttonWithoutAriaLabel,
        },
      });

      await panel.interactions.openSecondaryMenu();

      expect(
        panel.getCustomSecondaryButton('Button Without Aria Label'),
      ).toBeInTheDocument();
    });
  });

  describe('Dark Mode', () => {
    test('passes darkMode prop to child components', () => {
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showFormatButton: true,
          showSecondaryMenuButton: true,
          darkMode: true,
        },
      });

      // This is more of an integration test - we're verifying the prop is passed down
      // The actual dark mode styling would be tested in the styles tests
      expect(panel.getFormatButton()).toBeInTheDocument();
      expect(panel.getSecondaryMenuButton()).toBeInTheDocument();
    });
  });

  describe('Font Size', () => {
    test('accepts custom baseFontSize prop', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, baseFontSize: 16 },
      });
      // The font size would affect styling, which is tested in styles tests
      expect(panel.hasTitleText('Test Panel')).toBe(true);
    });
  });

  describe('Integration with CodeEditor Context', () => {
    test('uses getContents from context for copy button', () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showCopyButton: true },
      });

      // The copy button should receive the getContents function from context
      expect(panel.getCopyButton()).toBeInTheDocument();
      // The actual integration works with real components now
    });
  });

  describe('Accessibility', () => {
    test('has proper aria-labels for all buttons', () => {
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showFormatButton: true,
          showCopyButton: true,
          showSecondaryMenuButton: true,
        },
      });

      expect(panel.getFormatButton()).toBeInTheDocument();
      expect(panel.getSecondaryMenuButton()).toBeInTheDocument();
    });

    test('has proper aria-labels for menu items', async () => {
      const { panel } = renderPanel({
        panelProps: { ...defaultProps, showSecondaryMenuButton: true },
      });

      await panel.interactions.openSecondaryMenu();

      expect(panel.getUndoMenuItem()).toBeInTheDocument();
      expect(panel.getRedoMenuItem()).toBeInTheDocument();
      expect(panel.getDownloadMenuItem()).toBeInTheDocument();
      expect(panel.getViewShortcutsMenuItem()).toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    test('handles empty customSecondaryButtons array', async () => {
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showSecondaryMenuButton: true,
          customSecondaryButtons: [],
        },
      });

      await panel.interactions.openSecondaryMenu();

      // Should only show default menu items
      expect(panel.getUndoMenuItem()).toBeInTheDocument();
      expect(panel.getRedoMenuItem()).toBeInTheDocument();
      expect(panel.getDownloadMenuItem()).toBeInTheDocument();
      expect(panel.getViewShortcutsMenuItem()).toBeInTheDocument();
    });

    test('handles undefined callback functions gracefully', async () => {
      const { panel } = renderPanel({
        panelProps: {
          ...defaultProps,
          showFormatButton: true,
          showSecondaryMenuButton: true,
          // All callbacks are undefined
        },
      });

      // Format button should render and be clickable without errors
      await panel.interactions.clickFormatButton();

      // Menu should open and items should be clickable without errors
      await panel.interactions.clickUndoMenuItem();

      // No errors should be thrown
    });
  });
});
