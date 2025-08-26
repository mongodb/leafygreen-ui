import React, { useRef, useState } from 'react';
import { RichLinksArea } from '@lg-chat/rich-links';

import { useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronDownIcon from '@leafygreen-ui/icon/dist/ChevronDown';
import IconButton from '@leafygreen-ui/icon-button';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Body } from '@leafygreen-ui/typography';

import {
  containerStyles,
  getIconStyles,
  getLinksWrapperStyles,
  headerStyles,
  linksInnerWrapperStyles,
} from './MessageLinks.styles';
import { type MessageLinksProps } from './MessageLinks.types';

export function MessageLinks({
  darkMode: darkModeProp,
  headingText = 'Related Resources',
  links,
  onLinkClick,
  ...divProps
}: MessageLinksProps) {
  const { darkMode } = useDarkMode(darkModeProp);

  const [isExpanded, setIsExpanded] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);
  const linksAreaRef = useRef<HTMLDivElement>(null);

  const headingId = useIdAllocator({ prefix: 'message-links-heading' });
  const contentId = useIdAllocator({ prefix: 'message-links-content' });

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  if (links.length === 0) {
    return null;
  }

  return (
    <LeafyGreenProvider darkMode={darkMode}>
      <div className={containerStyles} {...divProps}>
        <div className={headerStyles}>
          <Body id={headingId}>{headingText}</Body>
          <IconButton
            aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${headingText}`}
            aria-expanded={isExpanded}
            aria-controls={contentId}
            onClick={handleToggle}
            className={getIconStyles(isExpanded)}
          >
            <ChevronDownIcon />
          </IconButton>
        </div>
        <div
          ref={contentRef}
          id={contentId}
          role="region"
          aria-labelledby={headingId}
          className={getLinksWrapperStyles(isExpanded)}
        >
          <RichLinksArea
            className={linksInnerWrapperStyles}
            links={links}
            onLinkClick={onLinkClick}
            ref={linksAreaRef}
          />
        </div>
      </div>
    </LeafyGreenProvider>
  );
}

MessageLinks.displayName = 'MessageLinks';
