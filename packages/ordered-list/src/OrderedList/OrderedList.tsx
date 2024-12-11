import React from 'react';

import {
  DescendantsProvider,
  useInitDescendants,
} from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import { OrderedListContext } from '../OrderedListContext';
import { baseStyles } from './OrderedList.styles';
import { OrderedListProps } from './OrderedList.types';

const OrderedList = React.forwardRef(
  (
    { children, className, darkMode: darkModeProp, ...rest }: OrderedListProps,
    ref: React.ForwardedRef<HTMLOListElement>,
  ) => {
    const { descendants, dispatch } =
      useInitDescendants<HTMLLIElement>(OrderedListContext);

    const { darkMode } = useDarkMode(darkModeProp);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <DescendantsProvider
          context={OrderedListContext}
          descendants={descendants}
          dispatch={dispatch}
        >
          <ol {...rest} ref={ref} className={cx(baseStyles, className)}>
            {children}
          </ol>
        </DescendantsProvider>
      </LeafyGreenProvider>
    );
  },
);

OrderedList.displayName = 'OrderedList';

export { OrderedList };
