import React from 'react';

import { LGGlyph } from '@leafygreen-ui/icon';

export type ReactEmpty = null | undefined | false | '';

export interface InternalProps extends React.ComponentProps<'li'> {
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
