import React from 'react';
import { RichLinksArea } from '@lg-chat/rich-links';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Subtitle } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getDividerStyles,
  linksHeadingStyles,
} from './MessageLinks.styles';
import { type MessageLinksProps } from './MessageLinks.types';

export function MessageLinks({
  darkMode: darkModeProp,
  headingText = 'Related Resources',
  links,
  onLinkClick,
  ...divProps
}: MessageLinksProps) {
  const { theme } = useDarkMode(darkModeProp);
  return (
    <div className={containerStyles} {...divProps}>
      <hr className={getDividerStyles(theme)} />
      <Subtitle className={linksHeadingStyles}>{headingText}</Subtitle>
      <RichLinksArea links={links} onLinkClick={onLinkClick} />
    </div>
  );
}

MessageLinks.displayName = 'MessageLinks';
