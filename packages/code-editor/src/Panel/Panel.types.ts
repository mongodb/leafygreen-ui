import { DarkModeProps } from '@leafygreen-ui/lib';
import { type MenuItemProps } from '@leafygreen-ui/menu';

type SecondaryButtonConfig = MenuItemProps & {
  // Subset of MenuItem props
  label: string;
  glyph?: React.ReactElement;
  href?: string;
  onClick?: () => void;
  'aria-label'?: string;
};

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
