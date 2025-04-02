import React, { forwardRef, MouseEvent, useEffect, useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator, useMergeRefs } from '@leafygreen-ui/hooks';
import Icon from '@leafygreen-ui/icon';
import IconButton from '@leafygreen-ui/icon-button';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { Body } from '@leafygreen-ui/typography';

import {
  childrenContainerStyles,
  getContainerStyles,
  getHeaderStyles,
  leftInnerContainerStyles,
  openToggleIconStyles,
  toggleButtonStyles,
  toggleIconStyles,
} from './ChartCard.styles';
import { ChartCardProps, ChartCardStates } from './ChartCard.types';
import { ChartCardProvider } from './ChartCardContext';

/**
 * Card component that contains charts and can expand and collapse.
 */
export const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  (
    {
      children,
      className,
      title,
      headerContent,
      defaultOpen = true,
      isOpen: isControlledOpen,
      onToggleButtonClick,
      state = ChartCardStates.Unset,
      dragId = '',
      ...rest
    },
    forwardedRef,
  ) => {
    const { theme } = useDarkMode();
    const isControlled = isControlledOpen !== undefined;

    const [isOpen, setIsOpen] = useState(isControlledOpen ?? defaultOpen);

    const toggleId = useIdAllocator({ prefix: 'expandable-chart-card-toggle' });
    const childrenId = useIdAllocator({
      prefix: 'expandable-chart-card-content',
    });

    const { attributes, listeners, setNodeRef, transform, transition, items } =
      useSortable({
        id: dragId,
        attributes: {
          /**
           * By default the role of 'button' is assigned. This breaks accessibility
           * because interactive controls can't be nested
           * https://dequeuniversity.com/rules/axe/4.7/nested-interactive?application=axeAPI
           */
          role: '',
        },
      });
    const isDraggable = !!(items.length && dragId);

    // When the controlled prop changes, update the internal state
    useEffect(() => {
      if (isControlled) {
        setIsOpen(isControlledOpen ?? defaultOpen);
      }
    }, [defaultOpen, isControlled, isControlledOpen]);

    function handleToggleButtonClick(e: MouseEvent<HTMLButtonElement>) {
      if (!isControlled) {
        setIsOpen(currState => !currState);
      }
      onToggleButtonClick?.(e);
    }

    return (
      <ChartCardProvider state={state}>
        {/*
          data attributes used by DragProvider to determine open/closed states
          when a ChartCard is picked up, and it's overlay is rendered
        */}
        <div
          className={getContainerStyles({
            theme,
            transition,
            transform,
            isDraggable,
            isOpen,
            state,
            className,
          })}
          ref={useMergeRefs([setNodeRef, forwardedRef])}
          data-drag-id={dragId}
          data-is-open={isOpen}
          {...rest}
        >
          <div
            className={getHeaderStyles({
              theme,
              state,
              isDraggable,
              className,
            })}
            data-testid="lg-charts-core-chart_card-header"
            {...attributes}
            {...listeners}
          >
            <div className={leftInnerContainerStyles}>
              <IconButton
                className={toggleButtonStyles}
                id={toggleId}
                aria-label="Toggle button"
                aria-controls={childrenId}
                aria-expanded={isOpen}
                onClick={handleToggleButtonClick}
                data-testid="lg-charts-core-chart_card-toggle-button"
                data-no-dnd={true}
              >
                <Icon
                  glyph="ChevronDown"
                  className={cx(toggleIconStyles, {
                    [openToggleIconStyles]: isOpen,
                  })}
                />
              </IconButton>
              <Body weight="medium" baseFontSize={BaseFontSize.Body2}>
                {title}
              </Body>
            </div>
            {/** Prevents drag and drop trigger on header content */}
            <div data-no-dnd={true}>{headerContent}</div>
          </div>
          <div className={childrenContainerStyles}>
            <div
              role="region"
              id={childrenId}
              aria-labelledby={toggleId}
              aria-hidden={!isOpen}
              data-testid="lg-charts-core-chart_card-children"
            >
              {children}
            </div>
          </div>
        </div>
      </ChartCardProvider>
    );
  },
);

ChartCard.displayName = 'ChartCard';
