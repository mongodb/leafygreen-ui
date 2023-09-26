import { LGGlyph } from '@leafygreen-ui/icon';
import { HTMLElementProps } from '@leafygreen-ui/lib';

export type ReactEmpty = null | undefined | false | '';

export interface InternalProps extends HTMLElementProps<'li', HTMLLIElement> {
  /**
   * Icon to display next to the option text.
   */
  glyph?: LGGlyph.Element;
  /**
   * Prevents the option from being selectable.
   * @default false
   */
  disabled?: boolean;
  selected: boolean;
  focused: boolean;
  onClick: React.MouseEventHandler;
  onFocus: React.FocusEventHandler;
  hasGlyphs: boolean;
  triggerScrollIntoView: boolean;

  /**
   * Optional descriptive text under the value.
   */
  description?: string;
}

export interface OptionProps
  extends Pick<
    InternalProps,
    | 'children'
    | 'className'
    | 'glyph'
    | 'disabled'
    | 'description'
    | 'aria-label'
  > {
  /**
   * Corresponds to the value passed into the onChange prop of <Select /> when the option is selected.
   * @default children
   */
  value?: string;
}
