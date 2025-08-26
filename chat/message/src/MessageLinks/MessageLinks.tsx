import React, { useEffect, useRef, useState } from 'react';
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
  const [contentHeight, setContentHeight] = useState(0);

  const contentRef = useRef<HTMLDivElement>(null);
  const linksAreaRef = useRef<HTMLDivElement>(null);

  const headingId = useIdAllocator({ prefix: 'message-links-heading' });
  const contentId = useIdAllocator({ prefix: 'message-links-content' });

  /**
   * Measure content height for animation
   */
  const updateHeight = () => {
    if (linksAreaRef.current) {
      setContentHeight(linksAreaRef.current.offsetHeight);
    }
  };

  /**
   * Measure height on mount and when links change
   */
  useEffect(() => {
    updateHeight();
  }, [links]);

  /**
   * Re-measure height when content changes
   */
  useEffect(() => {
    if (isExpanded && linksAreaRef.current) {
      updateHeight();
    }
  }, [isExpanded]);

  const handleToggle = () => {
    if (!isExpanded) {
      // Measure height before expanding for smooth animation
      updateHeight();
    }
    setIsExpanded(!isExpanded);
  };

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
          className={getLinksWrapperStyles({
            isExpanded,
            height: contentHeight,
          })}
        >
          <RichLinksArea
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
