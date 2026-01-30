import { ComponentPropsWithRef } from 'react';

import { GlyphName } from '@leafygreen-ui/icon';

export interface ResourceListItemProps
  extends Omit<ComponentPropsWithRef<'li'>, 'children'> {
  /**
   * The title of the list item.
   */
  glyph: GlyphName;

  /**
   * The content of the list item.
   */
  children: React.ReactNode;
}
