import React from 'react';
import { RichLinksArea } from '@lg-chat/rich-links';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Subtitle } from '@leafygreen-ui/typography';

import {
  baseStyles,
  dividingLineStyles,
  linksHeadingStyles,
} from './MessageLinks.styles';
import { type MessageLinksProps } from './MessageLinks.types';

export function MessageLinks({
  darkMode: darkModeProp,
  headingText = 'Related Resources',
  links,
  ...divProps
}: MessageLinksProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div className={cx(baseStyles)} {...divProps}>
      <hr className={cx(dividingLineStyles[theme])} />
      <Subtitle className={cx(linksHeadingStyles)}>{headingText}</Subtitle>
      <RichLinksArea links={links} />
    </div>
  );
}

MessageLinks.displayName = 'MessageLinks';
