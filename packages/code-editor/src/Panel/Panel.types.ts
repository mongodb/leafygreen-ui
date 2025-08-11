import { DarkModeProps } from '@leafygreen-ui/lib';

import { type LanguageName } from '../CodeEditor/hooks/extensions/useLanguageExtension';

interface SecondaryButtonConfig {
  // Subset of MenuItem props
  label: string;
  glyph?: React.ReactElement;
  href?: string;
  onClick?: () => void;
}

export interface PanelProps extends DarkModeProps {
  title?: string;

  showCopyButton?: boolean;
  showFormatButton?: boolean;
  showSecondaryMenuButton?: boolean;

  onCopyClick?: () => void;
  onFormatClick?: () => void;
  onUndoClick?: () => void;
  onRedoClick?: () => void;
  onDownloadClick?: () => void;
  onViewShortcutsClick?: () => void;

  /**
   * Function to retrieve the current editor contents for copy action.
   */
  getContents?: () => string;

  /**
   * Function to format the current editor content.
   * Passed from CodeEditor when the Panel is used with it.
   */
  formatCode?: () => Promise<string>;

  /**
   * Function to check if formatting is available for the current language.
   * Passed from CodeEditor when the Panel is used with it.
   */
  isFormattingAvailable?: () => boolean;

  /**
   * Current language for formatting context.
   * Passed from CodeEditor when the Panel is used with it.
   */
  language?: LanguageName;

  customSecondaryButtons?: Array<SecondaryButtonConfig>;

  // Slot prop to left of button panel
  children?: React.ReactElement;

  /**
   * Font size of text in the editor.
   *
   * @default 14
   */
  baseFontSize?: 14 | 16;
}
