import { DarkModeProps } from '@leafygreen-ui/lib';

export interface CodeEditorTooltipProps extends DarkModeProps {
  /**
   * Font size of text in the editor.
   *
   * @default 14
   */
  baseFontSize?: 14 | 16;

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
