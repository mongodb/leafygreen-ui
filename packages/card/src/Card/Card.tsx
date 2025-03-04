import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { colorSet, containerStyle } from './styles';
import { ContentStyle, InternalCardProps } from './types';

/**
 * Cards are used to organize information into consumable chunks.
 */
export const Card = InferredPolymorphic<InternalCardProps, 'div'>(
  (
    {
      as = 'div' as PolymorphicAs,
      className,
      contentStyle,
      darkMode: darkModeProp,
      ...rest
    },
    ref,
  ) => {
    const { Component } = useInferredPolymorphic(as, rest, 'div');

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
      />
    );
  },
);

Card.displayName = 'Card';
