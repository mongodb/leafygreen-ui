import React, { forwardRef, useEffect, useMemo, useRef } from 'react';

import Button, { Size } from '@leafygreen-ui/button';
import { useControlledValue, useIdAllocator } from '@leafygreen-ui/hooks';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { queryFirstFocusableElement } from '@leafygreen-ui/lib';

import { DEFAULT_LGID_ROOT, getLgIds } from '../testing';

import {
  getButtonStyles,
  getCardStyles,
  getContentWrapperStyles,
  TRANSITION_DURATION,
} from './PreviewCard.styles';
import { PreviewCardProps } from './PreviewCard.types';

export const PreviewCard = forwardRef<HTMLDivElement, PreviewCardProps>(
  (
    {
      children,
      className,
      collapsedHeight: collapsedHeightProp = 140,
      darkMode: darkModeProp,
      defaultOpen = false,
      id: idProp,
      isOpen: controlledIsOpen,
      onOpenChange,
      viewLessText = 'View less',
      viewMoreText = 'View more',
      'data-lgid': dataLgId = DEFAULT_LGID_ROOT,
      ...rest
    },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);
    const { value: isOpen, updateValue } = useControlledValue(
      controlledIsOpen,
      onOpenChange,
      defaultOpen,
    );
    const lgIds = getLgIds(dataLgId);

    const contentRef = useRef<HTMLDivElement>(null);

    const id = useIdAllocator({ prefix: 'preview-card', id: idProp });
    const contentId = `${id}-content`;
    const buttonId = `${id}-button`;

    const collapsedHeight = useMemo(() => {
      return typeof collapsedHeightProp === 'number'
        ? `${collapsedHeightProp}px`
        : collapsedHeightProp;
    }, [collapsedHeightProp]);

    const handleToggle = () => {
      updateValue(!isOpen, contentRef);
    };

    /**
     * Following a11y guidance, first focusable element is focused when card expands.
     */
    useEffect(() => {
      if (!isOpen || !contentRef.current) {
        return;
      }

      const firstFocusableElement = queryFirstFocusableElement(
        contentRef.current,
      );

      if (!firstFocusableElement) {
        return;
      }

      setTimeout(() => {
        firstFocusableElement.focus();
      }, TRANSITION_DURATION);
    }, [isOpen]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div
          className={getCardStyles({ className, theme })}
          data-lgid={lgIds.root}
          id={id}
          ref={fwdRef}
          {...rest}
        >
          <div
            aria-labelledby={buttonId}
            className={getContentWrapperStyles({
              collapsedHeight,
              isOpen: !!isOpen,
              theme,
            })}
            data-lgid={lgIds.content}
            id={contentId}
            // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
            inert={isOpen ? undefined : ''}
            ref={contentRef}
            role="region"
          >
            {children}
          </div>
          <Button
            aria-controls={contentId}
            aria-expanded={isOpen}
            className={getButtonStyles({ theme, isOpen: !!isOpen })}
            data-lgid={lgIds.toggle}
            id={buttonId}
            onClick={handleToggle}
            rightGlyph={<ChevronDown />}
            size={Size.XSmall}
          >
            {isOpen ? viewLessText : viewMoreText}
          </Button>
        </div>
      </LeafyGreenProvider>
    );
  },
);

PreviewCard.displayName = 'PreviewCard';
