import { GlyphName } from '@leafygreen-ui/icon';
import { IconButtonProps } from '@leafygreen-ui/icon-button';

type ButtonProps = Omit<
  IconButtonProps<'button'>,
  | 'tabIndex'
  | 'href'
  | 'as'
  | 'ref'
  | 'children'
  | 'size'
  | 'darkMode'
  | 'onClick'
>;

export interface ToolbarIconButtonProps extends ButtonProps {
  /**
   * The LG Icon that will render in the button
   */
  glyph: GlyphName;

  /**
   * The text that will render in the tooltip on hover
   */
  label: React.ReactNode;

  /**
   *  Callback fired when the ToolbarIconButton is clicked
   */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
