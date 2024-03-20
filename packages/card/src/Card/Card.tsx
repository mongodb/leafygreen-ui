import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { colorSet, containerStyle } from './styles';
import { CardProps, ContentStyle } from './types';

export const Card = InferredPolymorphic<CardProps, 'div'>(
  (
    { as, className, contentStyle, darkMode: darkModeProp, ...rest },
    forwardRef,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'div');
    const { theme } = useDarkMode(darkModeProp);

    if (
      contentStyle === undefined &&
      (('onClick' in rest && rest.onClick !== undefined) ||
        ('href' in rest && !!rest.href))
    ) {
      contentStyle = ContentStyle.Clickable;
    }

    return (
      <Component
        ref={forwardRef}
        className={cx(
          containerStyle,
          colorSet[theme].containerStyle,
          {
            [colorSet[theme].clickableStyle]:
              contentStyle === ContentStyle.Clickable,
          },
          className,
        )}
        {...rest}
      />
    );
  },
);

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  contentStyle: PropTypes.oneOf(Object.values(ContentStyle)),
};

export default Card;
