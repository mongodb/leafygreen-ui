import React, {
  Children,
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import Button, { Size, Variant } from '@leafygreen-ui/button';
import { cx } from '@leafygreen-ui/emotion';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUp from '@leafygreen-ui/icon/dist/ChevronUp';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  childContainerStyles,
  containerStyles,
  getChildrenContainerStyles,
  getExpandButtonStyles,
} from './ExpandableGrid.styles';
import { ExpandableGridProps } from './ExpandableGrid.types';

export const ExpandableGrid = forwardRef<HTMLDivElement, ExpandableGridProps>(
  (
    { children, className, darkMode: darkModeProp, maxColumns = 3, ...rest },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const containerRef = useRef<HTMLDivElement>(null);

    const [isExpanded, setIsExpanded] = useState(false);
    const [containerHeight, setContainerHeight] = useState('auto');

    const childrenArray = Children.toArray(children);

    const numberOfExpandableChildren = Children.count(children) - maxColumns;
    const isExpandable = numberOfExpandableChildren > 0;

    const expandButtonProps = useMemo(
      () =>
        isExpandable
          ? {
              children: isExpanded
                ? 'View less'
                : `View ${numberOfExpandableChildren} more`,
              className: getExpandButtonStyles(theme),
              onClick: () => setIsExpanded(!isExpanded),
              rightGlyph: isExpanded ? <ChevronUp /> : <ChevronDown />,
              size: Size.Small,
              variant: Variant.Default,
            }
          : {},
      [isExpandable, isExpanded, numberOfExpandableChildren, theme],
    );

    const updateHeight = useCallback(() => {
      const containerElement = containerRef.current;

      if (!containerElement) {
        return;
      }

      const collapsedContainerHeightVal = Array.from(containerElement.children)
        .slice(0, maxColumns)
        .reduce(
          (maxHeight, child) => Math.max(maxHeight, child.scrollHeight),
          0,
        );

      setContainerHeight(
        isExpanded
          ? `${containerElement.scrollHeight}px`
          : `${collapsedContainerHeightVal}px`,
      );
      // TODO: Remove eslint disable
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [containerRef, isExpanded]);

    useEffect(() => {
      updateHeight();
      // TODO: Remove eslint disable
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isExpanded]);

    useEffect(() => {
      window.addEventListener('resize', updateHeight);
      return () => window.removeEventListener('resize', updateHeight);
    }, [isExpanded, updateHeight]);

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={cx(containerStyles, className)} ref={fwdRef} {...rest}>
          <div
            className={cx(
              getChildrenContainerStyles({
                height: containerHeight,
                isExpandable,
                repeatCount: maxColumns,
              }),
            )}
            ref={containerRef}
          >
            {childrenArray.map((child, index) => {
              const hidden = index >= maxColumns && !isExpanded;
              return (
                <div
                  key={index}
                  className={childContainerStyles}
                  aria-hidden={hidden}
                  // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
                  inert={hidden ? '' : undefined}
                >
                  {child}
                </div>
              );
            })}
          </div>
          {isExpandable && <Button {...expandButtonProps} />}
        </div>
      </LeafyGreenProvider>
    );
  },
);

ExpandableGrid.displayName = 'ExpandableGrid';
