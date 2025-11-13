import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import LeafyGreenProvider from '@leafygreen-ui/leafygreen-provider';

import { CodeEditorProvider } from '../CodeEditor/CodeEditorContext';
import { getLgIds, type GetLgIdsReturnType } from '../utils/getLgIds';

import { Panel } from './Panel';
import { PanelProps } from './Panel.types';

// Default stub functions for CodeEditor context
const defaultStubGetContents = () => 'test content';
const defaultStubFormatCode = () => Promise.resolve('formatted content');
const defaultStubUndo = () => true;
const defaultStubRedo = () => true;

const defaultStubDownloadContent = () => {};

/**
 * Panel-specific selectors for easier testing
 */
export const PanelSelectors = {
  FormatButton: 'Format code',
  CopyButton: 'Copy',
  SecondaryMenuButton: 'Show more actions',
  UndoMenuItem: 'Undo changes',
  RedoMenuItem: 'Redo changes',
  DownloadMenuItem: 'Download code',
  ViewShortcutsMenuItem: 'View shortcuts',
} as const;

/**
 * Configuration for the CodeEditor context used in Panel tests
 */
export interface PanelTestContextConfig {
  getContents?: () => string;
  formatCode?: () => Promise<string>;
  isFormattingAvailable?: boolean;
  undo?: () => boolean;
  redo?: () => boolean;
  downloadContent?: () => void;
  lgIds?: GetLgIdsReturnType;
  undoDepth?: number;
  redoDepth?: number;
  baseFontSize?: 13 | 14 | 16 | undefined;
  darkMode?: boolean;
}

/**
 * Configuration for rendering the Panel component in tests
 */
export interface RenderPanelConfig {
  panelProps?: Partial<PanelProps>;
  contextConfig?: PanelTestContextConfig;
}

/**
 * Renders a Panel component with proper LeafyGreen and CodeEditor context for testing
 * @param config - Configuration options for panel props and context
 * @returns Object containing the rendered container and panel testing utilities
 */
export function renderPanel(config: RenderPanelConfig = {}) {
  const { panelProps = {}, contextConfig = {} } = config;

  const contextValue = {
    getContents: defaultStubGetContents,
    formatCode: defaultStubFormatCode,
    isFormattingAvailable: true,
    undo: defaultStubUndo,
    redo: defaultStubRedo,
    downloadContent: defaultStubDownloadContent,
    lgIds: getLgIds(),
    undoDepth: 1,
    redoDepth: 1,
    baseFontSize: 13 as const,
    darkMode: false,
    isLoading: false,
    ...contextConfig,
  };

  const { container } = render(
    <LeafyGreenProvider>
      <CodeEditorProvider value={contextValue}>
        <Panel {...panelProps} />
      </CodeEditorProvider>
    </LeafyGreenProvider>,
  );

  return { container, panel: createPanelUtilities() };
}

/**
 * Gets the format button element
 * @returns The format button element or null if not found
 */
function getFormatButton() {
  return screen.queryByLabelText(PanelSelectors.FormatButton);
}

/**
 * Gets the copy button element
 * @returns The copy button element or null if not found
 */
function getCopyButton() {
  return screen.queryByLabelText(PanelSelectors.CopyButton);
}

/**
 * Gets the secondary menu button element (ellipsis icon)
 * @returns The secondary menu button element or null if not found
 */
function getSecondaryMenuButton() {
  return screen.queryByLabelText(PanelSelectors.SecondaryMenuButton);
}

/**
 * Gets a custom secondary button by its aria-label or label text
 * @param labelOrAriaLabel - The aria-label or label text to search for
 * @returns The custom button element or null if not found
 */
function getCustomSecondaryButton(labelOrAriaLabel: string) {
  // Try aria-label first, then fallback to text content
  return (
    screen.queryByLabelText(labelOrAriaLabel) ||
    screen.queryByText(labelOrAriaLabel)
  );
}

/**
 * Opens the secondary menu by clicking the menu button
 * @throws Error if secondary menu button is not found
 */
async function openSecondaryMenu() {
  const menuButton = getSecondaryMenuButton();

  if (!menuButton) {
    throw new Error(
      'Secondary menu button not found. Make sure showSecondaryMenuButton is true.',
    );
  }

  await userEvent.click(menuButton);

  // Wait for menu to appear
  await waitFor(() => {
    expect(screen.getByText('Undo')).toBeInTheDocument();
  });
}

/**
 * Gets a menu item by its aria-label
 * @param ariaLabel - The aria-label of the menu item
 * @returns The menu item element or null if not found
 */
function getMenuItem(ariaLabel: string) {
  return screen.queryByLabelText(ariaLabel);
}

/**
 * Gets the undo menu item
 * @returns The undo menu item element or null if not found
 */
function getUndoMenuItem() {
  return getMenuItem(PanelSelectors.UndoMenuItem);
}

/**
 * Gets the redo menu item
 * @returns The redo menu item element or null if not found
 */
function getRedoMenuItem() {
  return getMenuItem(PanelSelectors.RedoMenuItem);
}

/**
 * Gets the download menu item
 * @returns The download menu item element or null if not found
 */
function getDownloadMenuItem() {
  return getMenuItem(PanelSelectors.DownloadMenuItem);
}

/**
 * Gets the view shortcuts menu item
 * @returns The view shortcuts menu item element or null if not found
 */
function getViewShortcutsMenuItem() {
  return getMenuItem(PanelSelectors.ViewShortcutsMenuItem);
}

/**
 * Clicks the format button if it exists
 * @throws Error if format button is not found
 */
async function clickFormatButton() {
  const formatButton = getFormatButton();

  if (!formatButton) {
    throw new Error(
      'Format button not found. Make sure showFormatButton is true.',
    );
  }

  await userEvent.click(formatButton);
}

/**
 * Clicks the copy button if it exists
 * @throws Error if copy button is not found
 */
async function clickCopyButton() {
  const copyButton = getCopyButton();

  if (!copyButton) {
    throw new Error('Copy button not found. Make sure showCopyButton is true.');
  }

  await userEvent.click(copyButton);
}

/**
 * Clicks a menu item by its aria-label after opening the secondary menu
 * @param ariaLabel - The aria-label of the menu item to click
 * @throws Error if secondary menu or menu item is not found
 */
async function clickMenuItem(ariaLabel: string) {
  await openSecondaryMenu();

  const menuItem = getMenuItem(ariaLabel);

  if (!menuItem) {
    throw new Error(`Menu item with aria-label "${ariaLabel}" not found.`);
  }

  await userEvent.click(menuItem);
}

/**
 * Clicks the undo menu item
 * @throws Error if undo menu item is not found
 */
async function clickUndoMenuItem() {
  await clickMenuItem(PanelSelectors.UndoMenuItem);
}

/**
 * Clicks the redo menu item
 * @throws Error if redo menu item is not found
 */
async function clickRedoMenuItem() {
  await clickMenuItem(PanelSelectors.RedoMenuItem);
}

/**
 * Clicks the download menu item
 * @throws Error if download menu item is not found
 */
async function clickDownloadMenuItem() {
  await clickMenuItem(PanelSelectors.DownloadMenuItem);
}

/**
 * Clicks the view shortcuts menu item
 * @throws Error if view shortcuts menu item is not found
 */
async function clickViewShortcutsMenuItem() {
  await clickMenuItem(PanelSelectors.ViewShortcutsMenuItem);
}

/**
 * Clicks a custom secondary button by its label or aria-label
 * @param labelOrAriaLabel - The label or aria-label of the custom button
 * @throws Error if custom button is not found
 */
async function clickCustomSecondaryButton(labelOrAriaLabel: string) {
  await openSecondaryMenu();

  const customButton = getCustomSecondaryButton(labelOrAriaLabel);

  if (!customButton) {
    throw new Error(
      `Custom secondary button with label/aria-label "${labelOrAriaLabel}" not found.`,
    );
  }

  await userEvent.click(customButton);
}

/**
 * Waits for a tooltip to appear with specific text
 * @param tooltipText - The text content of the tooltip to wait for
 * @param timeout - Maximum time to wait in milliseconds (default: 1000)
 */
async function waitForTooltip(tooltipText: string, timeout = 1000) {
  await waitFor(
    () => {
      // Look for tooltip role specifically to avoid ambiguity
      const tooltip = screen.queryByRole('tooltip');
      expect(tooltip).toBeInTheDocument();
      expect(tooltip).toHaveTextContent(tooltipText);
    },
    { timeout },
  );
}

/**
 * Hovers over the format button and waits for its tooltip
 * @throws Error if format button is not found
 */
async function hoverFormatButton() {
  const formatButton = getFormatButton();

  if (!formatButton) {
    throw new Error(
      'Format button not found. Make sure showFormatButton is true.',
    );
  }

  await userEvent.hover(formatButton);
  await waitForTooltip('Prettify code');
}

/**
 * Hovers over the copy button and waits for its tooltip
 * @throws Error if copy button is not found
 */
async function hoverCopyButton() {
  const copyButton = getCopyButton();

  if (!copyButton) {
    throw new Error('Copy button not found. Make sure showCopyButton is true.');
  }

  await userEvent.hover(copyButton);
  await waitForTooltip('Copy');
}

/**
 * Gets the current title text from the panel
 * @returns The title text content or empty string if not found
 */
function getTitleText(): string {
  // Query by the LGID used in Panel.tsx for the panel title
  const titleElement = document.querySelector(
    '[data-lgid="lg-code_editor-panel_title"]',
  );
  return titleElement?.textContent || '';
}

/**
 * Checks if custom inner content is visible
 * @param testId - The test ID of the inner content element
 * @returns Boolean indicating if the inner content is visible
 */
function hasInnerContent(testId: string): boolean {
  return screen.queryByTestId(testId) !== null;
}

/**
 * Creates panel testing utilities object
 * @returns Panel testing utilities with element getters, interactions, and utilities
 */
function createPanelUtilities() {
  return {
    // Element getters
    getFormatButton,
    getCopyButton,
    getSecondaryMenuButton,
    getCustomSecondaryButton,
    getMenuItem,
    getUndoMenuItem,
    getRedoMenuItem,
    getDownloadMenuItem,
    getViewShortcutsMenuItem,

    // Interactions
    interactions: {
      openSecondaryMenu,
      clickFormatButton,
      clickCopyButton,
      clickMenuItem,
      clickUndoMenuItem,
      clickRedoMenuItem,
      clickDownloadMenuItem,
      clickViewShortcutsMenuItem,
      clickCustomSecondaryButton,
      hoverFormatButton,
      hoverCopyButton,
    },

    // Utilities
    waitForTooltip,
    getTitleText,
    hasInnerContent,
  };
}

/**
 * Default stub functions for CodeEditor context
 * These can be overridden in tests by providing contextConfig to renderPanel
 */
export const defaultPanelContextFunctions = {
  getContents: defaultStubGetContents,
  formatCode: defaultStubFormatCode,
  undo: defaultStubUndo,
  redo: defaultStubRedo,
  downloadContent: defaultStubDownloadContent,
};
