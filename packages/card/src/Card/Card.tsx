import React from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import {
  InferredPolymorphic,
  PolymorphicAs,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';

import { getCardStyles } from './styles';
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
        className={getCardStyles({ theme, contentStyle, className })}
        {...rest}
      />
    );
  },
);

Card.displayName = 'Card';
