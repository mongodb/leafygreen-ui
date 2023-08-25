import { DarkModeProps, HTMLElementProps } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';

export interface PageLoaderProps
  extends DarkModeProps,
    HTMLElementProps<'div'> {
  /**
   * Description text
   */
  description?: string;

  /**
   * The base font size of the description text.
   */
  baseFontSize?: BaseFontSize;
}
