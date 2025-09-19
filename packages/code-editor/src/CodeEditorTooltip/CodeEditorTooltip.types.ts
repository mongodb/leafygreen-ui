import { DarkModeProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface CodeEditorTooltipProps extends DarkModeProps {
  /**
   * Font size of text in the editor.
   *
   * @default 13
   */
  baseFontSize?: BaseFontSize;

  /**
   * Messages to display in the tooltip.
   */
  messages?: Array<string>;

  /**
   * Links to display in a section on the bottom of the tooltip.
   */
  links?: Array<{
    label: string;
    href: string;
  }>;
}
