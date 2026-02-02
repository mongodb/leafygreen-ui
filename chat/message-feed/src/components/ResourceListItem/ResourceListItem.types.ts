import { ComponentPropsWithRef } from 'react';

import { GlyphName } from '@leafygreen-ui/icon';

export interface ResourceListItemProps
  extends Omit<ComponentPropsWithRef<'li'>, 'children'> {
  /**
   * The LeafyGreen icon glyph name to render in the list item
   */
  glyph: GlyphName;

  /**
   * The content of the list item. This will render after the glyph
   */
  children: React.ReactNode;
}
