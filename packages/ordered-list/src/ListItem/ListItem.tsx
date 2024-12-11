import React from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, Description } from '@leafygreen-ui/typography';

import { OrderedListContext } from '../OrderedListContext/OrderedListContext';

import {
  baseStyles,
  contentClassName,
  contentStyles,
  getThemedStateStyles,
  stepIconClassName,
  stepStyles,
  titleStyles,
} from './ListItem.styles';
import { ListItemProps } from './ListItem.types';

const ListItem = React.forwardRef(
  (
    { children, className, title, description, ...rest }: ListItemProps,
    forwardRef: React.ForwardedRef<HTMLLIElement>,
  ) => {
    const { index, ref } = useDescendant(OrderedListContext, forwardRef);
    const { theme } = useDarkMode();

    return (
      <li ref={ref} className={cx(baseStyles, className)} {...rest}>
        <div className={stepIconClassName}>
          <div className={cx(stepStyles, getThemedStateStyles(theme))}>
            {index + 1}
          </div>
        </div>

        <div className={cx(contentClassName, contentStyles)}>
          <Body baseFontSize={16} className={titleStyles}>
            {title}
          </Body>
          <Description>{description}</Description>
        </div>
      </li>
    );
  },
);

ListItem.displayName = 'ListItem';

export { ListItem };
