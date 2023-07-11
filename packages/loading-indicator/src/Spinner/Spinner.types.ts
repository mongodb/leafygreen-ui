import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export const DisplayOption = {
  DefaultHorizontal: 'default-horizontal',
  DefaultVertical: 'default-vertical',
  LargeVertical: 'large-vertical',
  XlargeVertical: 'xlarge-vertical',
};

export type DisplayOption = typeof DisplayOption[keyof typeof DisplayOption];

export interface SpinnerProps extends DarkModeProps, HTMLElementProps<'div'> {
  /**
   * Determines the size or orientation of the spinner and description text
   * @default 'default-vertical'
   */
  displayOption?: DisplayOption;

  /**
   * Description text
   */
  description?: string;

  /**
   * An override for the spinner animation’s size in pixels. Intended for internal use.
   */
  sizeOverride?: number;

  /**
   * An override for the spinner animation’s color. Intended for internal use.
   */
  colorOverride?: string;

  /**
   * The base font size of the description text.
   */
  baseFontSize?: BaseFontSize;
}
