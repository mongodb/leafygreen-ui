import { GlyphName } from '@leafygreen-ui/icon';
import { IconButtonProps } from '@leafygreen-ui/icon-button';

type ButtonProps = Omit<IconButtonProps<'button'>, 'tabIndex' | 'href' | 'as'>;

export interface ToolbarIconButtonProps extends ButtonProps {
  /**
   * The LG icon that will render in the button
   */
  glyph: GlyphName;

  /**
   * The text that will render in the tooltip on hover
   */
  label: React.ReactNode;
}
