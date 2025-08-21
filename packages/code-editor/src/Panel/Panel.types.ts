import { ReactElement, ReactNode } from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

/**
 * Configuration object for custom secondary buttons that appear in the Panel's secondary menu.
 */
export interface SecondaryButtonConfig {
  /**
   * Text label for the button that will be displayed in the menu item.
   */
  label: string;

  /**
   * Optional icon element to display in the button.
   */
  glyph?: ReactElement;

  /**
   * Optional callback fired when the button is clicked.
   */
  onClick?: () => void;

  /**
   * Optional URL to navigate to when the button is clicked.
   * If provided, the button will behave as a link.
   */
  href?: string;

  /**
   * Optional accessible label for the button.
   */
  'aria-label'?: string;

  /**
   * Optional boolean to disable the button.
   */
  disabled?: boolean;
}

export interface PanelProps extends DarkModeProps {
  /**
   * Font size of text in the panel.
   * Controls the typography scale used for the panel title and other text elements.
   *
   * @default 14
   */
  baseFontSize?: 14 | 16;

  /**
   * Optional array of custom secondary buttons to display in the secondary menu.
   * Each button can include a label, icon, click handler, href, and aria-label for accessibility.
   */
  customSecondaryButtons?: Array<SecondaryButtonConfig>;

  /**
   * Optional React node to render between the title and the buttons.
   * Can be used to add custom controls to the panel.
   */
  innerContent?: ReactNode;

  /**
   * Optional callback fired when the copy button is clicked.
   * Called after the copy operation is attempted.
   */
  onCopyClick?: () => void;

  /**
   * Optional callback fired when the download button in the secondary menu is clicked.
   * Called after the download operation is attempted.
   */
  onDownloadClick?: () => void;

  /**
   * Optional callback fired when the format button is clicked.
   * Called after the formatting operation is attempted.
   */
  onFormatClick?: () => void;

  /**
   * Optional callback fired when the redo button in the secondary menu is clicked.
   * Called after the redo operation is attempted.
   */
  onRedoClick?: () => void;

  /**
   * Optional callback fired when the undo button in the secondary menu is clicked.
   * Called after the undo operation is attempted.
   */
  onUndoClick?: () => void;

  /**
   * Optional callback fired when the view shortcuts button in the secondary menu is clicked.
   * Called after the view shortcuts operation is attempted.
   */
  onViewShortcutsClick?: () => void;

  /**
   * Determines whether to show the copy button in the panel.
   * When enabled, users can copy the editor content to their clipboard.
   */
  showCopyButton?: boolean;

  /**
   * Determines whether to show the format button in the panel.
   * When enabled and formatting is available for the current language,
   * users can format/prettify their code.
   */
  showFormatButton?: boolean;

  /**
   * Determines whether to show the secondary menu button (ellipsis icon) in the panel.
   * When enabled, displays a menu with additional actions like undo, redo, download, and view shortcuts.
   */
  showSecondaryMenuButton?: boolean;

  /**
   * Optional title text to display in the panel header.
   * Typically used to show the current language or content description.
   */
  title?: ReactNode;
}
