import React from 'react';

import { DarkModeProps } from '@leafygreen-ui/lib';

export type OrderedListItemProps = Omit<React.ComponentProps<'li'>, 'title'> &
  DarkModeProps & {
    /**
     *
     * The title of the list item.
     */
    title?: React.ReactNode;

    /**
     * The description of the list item. This will render below the title.
     */
    description?: React.ReactNode;
  };
