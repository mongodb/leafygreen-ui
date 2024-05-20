import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import { badgeVariants, baseStyles } from './RichLinkBadge.styles';
import { type RichLinkBadgeProps } from './RichLinkBadge.types';

export const RichLinkBadge = ({
  darkMode: darkModeProp,
  glyph: glyphName,
  color = 'gray',
  label,
}: RichLinkBadgeProps) => {
  const { theme } = useDarkMode(darkModeProp);

  return (
    <div className={cx(baseStyles, badgeVariants[theme][color])}>
      {glyphName ? <Icon glyph={glyphName} /> : null}
      <Body>{label}</Body>
    </div>
  );
};
