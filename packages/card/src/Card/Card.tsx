import React from 'react';
import PropTypes from 'prop-types';

import {
  InferredPolymorphic,
  InferredPolymorphicProps,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

import { colorSet, containerStyle } from './styles';
import { CardProps, ContentStyle } from './types';

/**
 * Cards are used to organize information into consumable chunks.
 */
export const Card = InferredPolymorphic<
  InferredPolymorphicProps<'div', CardProps>
>(
  (
    { as, className, contentStyle, darkMode: darkModeProp, title, ...rest },
    ref,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest);

    if (
      contentStyle === undefined &&
      (('onClick' in rest && rest.onClick !== undefined) ||
        ('href' in rest && !!rest.href))
    ) {
      contentStyle = ContentStyle.Clickable;
    }

    const { theme } = useDarkMode(darkModeProp);

    return (
      <Component
        ref={ref}
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
      >
        {title}
      </Component>
    );
  },
);

Card.displayName = 'Card';

Card.propTypes = {
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  contentStyle: PropTypes.oneOf(Object.values(ContentStyle)),
};
