import React from 'react';
import { type MessageLinksProps } from './MessageLinks.types';
import { Subtitle } from '@leafygreen-ui/typography';
import { RichLinksArea } from '@lg-chat/rich-links';
import { cx } from '@leafygreen-ui/emotion';
import {
  baseStyles,
  dividingLineStyles,
  linksHeadingStyles,
} from './MessageLinks.styles';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';

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
