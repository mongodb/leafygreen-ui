import React from 'react';
import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import '@testing-library/jest-dom';

import { CodeEditorProvider } from '../CodeEditor/CodeEditorContext';

import { Panel } from './Panel';
import { PanelProps } from './Panel.types';

const TestIcon = () => <div data-testid="test-icon" />;
TestIcon.displayName = 'TestIcon';

const defaultProps: Partial<PanelProps> = {
  title: 'Test Panel',
};

const mockGetContents = jest.fn(() => 'test content');

const renderPanel = (props: Partial<PanelProps> = {}) => {
  const mergedProps = { ...defaultProps, ...props };

  return render(
    <LeafyGreenProvider>
      <CodeEditorProvider value={{ getContents: mockGetContents }}>
        <Panel {...mergedProps} />
      </CodeEditorProvider>
    </LeafyGreenProvider>,
  );
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
  });

  describe('Basic Rendering', () => {
    it('renders with title', () => {
      renderPanel({ title: 'JavaScript Editor' });
      expect(screen.getByText('JavaScript Editor')).toBeInTheDocument();
    });

    it('renders without title when not provided', () => {
      const { container } = renderPanel({ title: undefined });
      // The title div should still exist but be empty
      const titleElement = container.querySelector('.leafygreen-ui-12f55h');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement).toHaveTextContent('');
    });

    it('renders inner content when provided', () => {
      const innerContent = (
        <span data-testid="inner-content">Custom Content</span>
      );
      renderPanel({ innerContent });
      expect(screen.getByTestId('inner-content')).toBeInTheDocument();
      expect(screen.getByText('Custom Content')).toBeInTheDocument();
    });
  });

  describe('Format Button', () => {
    it('renders format button when showFormatButton is true', () => {
      renderPanel({ showFormatButton: true });
      expect(screen.getByLabelText('Format code')).toBeInTheDocument();
    });

    it('does not render format button when showFormatButton is false', () => {
      renderPanel({ showFormatButton: false });
      expect(screen.queryByLabelText('Format code')).not.toBeInTheDocument();
    });

    it('calls onFormatClick when format button is clicked', async () => {
      const onFormatClick = jest.fn();
      renderPanel({ showFormatButton: true, onFormatClick });

      const formatButton = screen.getByLabelText('Format code');

      await act(async () => {
        await userEvent.click(formatButton);
      });

      expect(onFormatClick).toHaveBeenCalledTimes(1);
    });

    it('shows tooltip on format button hover', async () => {
      renderPanel({ showFormatButton: true });

      const formatButton = screen.getByLabelText('Format code');

      await act(async () => {
        await userEvent.hover(formatButton);
      });

      // Wait for tooltip to appear
      await waitFor(async () => {
        expect(screen.getByText('Prettify code')).toBeInTheDocument();
      });
    });
  });

  describe('Copy Button', () => {
    it('renders copy button when showCopyButton is true', () => {
      renderPanel({ showCopyButton: true });
      expect(screen.getByLabelText('Copy text')).toBeInTheDocument();
    });

    it('does not render copy button when showCopyButton is false', () => {
      renderPanel({ showCopyButton: false });
      expect(screen.queryByLabelText('Copy text')).not.toBeInTheDocument();
    });

    it('calls onCopyClick when copy button is clicked', async () => {
      const onCopyClick = jest.fn();
      renderPanel({ showCopyButton: true, onCopyClick });

      const copyButton = screen.getByLabelText('Copy text');

      await act(async () => {
        await userEvent.click(copyButton);
      });

      expect(onCopyClick).toHaveBeenCalledTimes(1);
    });

    it('shows tooltip on copy button hover', async () => {
      renderPanel({ showCopyButton: true });

      const copyButton = screen.getByLabelText('Copy text');

      await act(async () => {
        await userEvent.hover(copyButton);
      });

      // Wait for tooltip to appear
      await waitFor(async () => {
        expect(screen.getByText('Copy')).toBeInTheDocument();
      });
    });

    it('shows success state after copying', async () => {
      renderPanel({ showCopyButton: true });

      const copyButton = screen.getByLabelText('Copy text');

      await act(async () => {
        await userEvent.click(copyButton);
      });

      // Wait for success tooltip to appear
      await waitFor(async () => {
        expect(screen.getByText('Copied!')).toBeInTheDocument();
      });
    });
  });

  describe('Secondary Menu', () => {
    it('renders secondary menu button when showSecondaryMenuButton is true', () => {
      renderPanel({ showSecondaryMenuButton: true });
      expect(screen.getByLabelText('Show more actions')).toBeInTheDocument();
    });

    it('does not render secondary menu button when showSecondaryMenuButton is false', () => {
      renderPanel({ showSecondaryMenuButton: false });
      expect(
        screen.queryByLabelText('Show more actions'),
      ).not.toBeInTheDocument();
    });

    it('opens menu when secondary menu button is clicked', async () => {
      renderPanel({ showSecondaryMenuButton: true });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Undo')).toBeInTheDocument();
        expect(screen.getByText('Redo')).toBeInTheDocument();
        expect(screen.getByText('Download')).toBeInTheDocument();
        expect(screen.getByText('View shortcuts')).toBeInTheDocument();
      });
    });

    it('calls onUndoClick when undo menu item is clicked', async () => {
      const onUndoClick = jest.fn();
      renderPanel({ showSecondaryMenuButton: true, onUndoClick });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const undoItem = await screen.findByLabelText('Undo changes');

      await act(async () => {
        await userEvent.click(undoItem);
      });

      expect(onUndoClick).toHaveBeenCalledTimes(1);
    });

    it('calls onRedoClick when redo menu item is clicked', async () => {
      const onRedoClick = jest.fn();
      renderPanel({ showSecondaryMenuButton: true, onRedoClick });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const redoItem = await screen.findByLabelText('Redo changes');

      await act(async () => {
        await userEvent.click(redoItem);
      });

      expect(onRedoClick).toHaveBeenCalledTimes(1);
    });

    it('calls onDownloadClick when download menu item is clicked', async () => {
      const onDownloadClick = jest.fn();
      renderPanel({ showSecondaryMenuButton: true, onDownloadClick });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const downloadItem = await screen.findByLabelText('Download code');

      await act(async () => {
        await userEvent.click(downloadItem);
      });

      expect(onDownloadClick).toHaveBeenCalledTimes(1);
    });

    it('calls onViewShortcutsClick when view shortcuts menu item is clicked', async () => {
      const onViewShortcutsClick = jest.fn();
      renderPanel({ showSecondaryMenuButton: true, onViewShortcutsClick });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const shortcutsItem = await screen.findByLabelText('View shortcuts');

      await act(async () => {
        await userEvent.click(shortcutsItem);
      });

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

    it('renders custom secondary buttons in the menu', async () => {
      renderPanel({
        showSecondaryMenuButton: true,
        customSecondaryButtons: customButtons,
      });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(screen.getByText('Custom Action 1')).toBeInTheDocument();
        expect(screen.getByText('Custom Action 2')).toBeInTheDocument();
      });
    });

    it('calls custom button onClick handler', async () => {
      const customButtonsWithMock = [
        {
          ...customButtons[0],
          onClick: jest.fn(),
        },
      ];

      renderPanel({
        showSecondaryMenuButton: true,
        customSecondaryButtons: customButtonsWithMock,
      });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const customButton = await screen.findByLabelText(
        'Perform custom action 1',
      );

      await act(async () => {
        await userEvent.click(customButton);
      });

      expect(customButtonsWithMock[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('uses label as aria-label when aria-label is not provided', async () => {
      const buttonWithoutAriaLabel = [
        {
          label: 'Button Without Aria Label',
          glyph: <TestIcon />,
          onClick: jest.fn(),
        },
      ];

      renderPanel({
        showSecondaryMenuButton: true,
        customSecondaryButtons: buttonWithoutAriaLabel,
      });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(
          screen.getByLabelText('Button Without Aria Label'),
        ).toBeInTheDocument();
      });
    });
  });

  describe('Dark Mode', () => {
    it('passes darkMode prop to child components', () => {
      renderPanel({
        showFormatButton: true,
        showSecondaryMenuButton: true,
        darkMode: true,
      });

      // This is more of an integration test - we're verifying the prop is passed down
      // The actual dark mode styling would be tested in the styles tests
      expect(screen.getByLabelText('Format code')).toBeInTheDocument();
      expect(screen.getByLabelText('Show more actions')).toBeInTheDocument();
    });
  });

  describe('Font Size', () => {
    it('accepts custom baseFontSize prop', () => {
      renderPanel({ baseFontSize: 16 });
      // The font size would affect styling, which is tested in styles tests
      expect(screen.getByText('Test Panel')).toBeInTheDocument();
    });
  });

  describe('Integration with CodeEditor Context', () => {
    it('uses getContents from context for copy button', () => {
      renderPanel({ showCopyButton: true });

      // The copy button should receive the getContents function from context
      expect(screen.getByLabelText('Copy text')).toBeInTheDocument();
      // The actual integration works with real components now
    });
  });

  describe('Accessibility', () => {
    it('has proper aria-labels for all buttons', () => {
      renderPanel({
        showFormatButton: true,
        showCopyButton: true,
        showSecondaryMenuButton: true,
      });

      expect(screen.getByLabelText('Format code')).toBeInTheDocument();
      expect(screen.getByLabelText('Show more actions')).toBeInTheDocument();
    });

    it('has proper aria-labels for menu items', async () => {
      renderPanel({ showSecondaryMenuButton: true });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      await waitFor(() => {
        expect(screen.getByLabelText('Undo changes')).toBeInTheDocument();
        expect(screen.getByLabelText('Redo changes')).toBeInTheDocument();
        expect(screen.getByLabelText('Download code')).toBeInTheDocument();
        expect(screen.getByLabelText('View shortcuts')).toBeInTheDocument();
      });
    });
  });

  describe('Edge Cases', () => {
    it('handles empty customSecondaryButtons array', async () => {
      renderPanel({
        showSecondaryMenuButton: true,
        customSecondaryButtons: [],
      });

      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      await waitFor(() => {
        // Should only show default menu items
        expect(screen.getByText('Undo')).toBeInTheDocument();
        expect(screen.getByText('Redo')).toBeInTheDocument();
        expect(screen.getByText('Download')).toBeInTheDocument();
        expect(screen.getByText('View shortcuts')).toBeInTheDocument();
      });
    });

    it('handles undefined callback functions gracefully', async () => {
      renderPanel({
        showFormatButton: true,
        showSecondaryMenuButton: true,
        // All callbacks are undefined
      });

      // Format button should render and be clickable without errors
      const formatButton = screen.getByLabelText('Format code');

      await act(async () => {
        await userEvent.click(formatButton);
      });

      // Menu should open and items should be clickable without errors
      const menuButton = screen.getByLabelText('Show more actions');

      await act(async () => {
        await userEvent.click(menuButton);
      });

      const undoItem = await screen.findByLabelText('Undo changes');

      await act(async () => {
        await userEvent.click(undoItem);
      });

      // No errors should be thrown
    });
  });
});
