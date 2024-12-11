import React from 'react';
import propTypes from 'prop-types';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body, Description } from '@leafygreen-ui/typography';

import { OrderedListContext } from '../OrderedListContext/OrderedListContext';

import {
  baseStyles,
  contentStyles,
  getThemedStateStyles,
  markerStyles,
  stepIconClassName,
  titleStyles,
} from './OrderedListItem.styles';
import { OrderedListItemProps } from './OrderedListItem.types';

const OrderedListItem = React.forwardRef(
  (
    { children, className, title, description, ...rest }: OrderedListItemProps,
    forwardRef: React.ForwardedRef<HTMLLIElement>,
  ) => {
    const { index, ref } = useDescendant(OrderedListContext, forwardRef);
    const { theme } = useDarkMode();

    return (
      <li ref={ref} className={cx(baseStyles, className)} {...rest}>
        <div className={stepIconClassName}>
          <div className={cx(markerStyles, getThemedStateStyles(theme))}>
            {index + 1}
          </div>
        </div>

        <div className={contentStyles}>
          <Body baseFontSize={16} className={titleStyles}>
            {title}
          </Body>
          <Description>{description}</Description>
        </div>
      </li>
    );
  },
);

OrderedListItem.displayName = 'OrderedListItem';

OrderedListItem.propTypes = {
  title: propTypes.node,
  description: propTypes.node,
};

export { OrderedListItem };
