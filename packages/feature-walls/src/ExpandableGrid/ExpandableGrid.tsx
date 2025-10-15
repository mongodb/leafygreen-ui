import React, { Children, forwardRef, useMemo, useState } from 'react';

import Button, { Size, Variant } from '@leafygreen-ui/button';
import ChevronDown from '@leafygreen-ui/icon/dist/ChevronDown';
import ChevronUp from '@leafygreen-ui/icon/dist/ChevronUp';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';

import {
  childContainerStyles,
  getContainerStyles,
  getExpandableChildrenContainerStyles,
  getExpandableWrapperStyles,
  getExpandButtonStyles,
  getVisibleChildrenContainerStyles,
} from './ExpandableGrid.styles';
import { ExpandableGridProps } from './ExpandableGrid.types';

export const ExpandableGrid = forwardRef<HTMLDivElement, ExpandableGridProps>(
  (
    { children, className, darkMode: darkModeProp, maxColumns = 3, ...rest },
    fwdRef,
  ) => {
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const [isExpanded, setIsExpanded] = useState(false);

    const childrenArray = Children.toArray(children);

    // Split children into visible (first row) and expandable (remaining rows)
    const visibleChildren = childrenArray.slice(0, maxColumns);
    const expandableChildren = childrenArray.slice(maxColumns);

    const numberOfExpandableChildren = expandableChildren.length;
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

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={getContainerStyles(className)} ref={fwdRef} {...rest}>
          {/* First row - always visible */}
          <div
            className={getVisibleChildrenContainerStyles({
              repeatCount: maxColumns,
            })}
          >
            {visibleChildren.map((child, index) => (
              <div key={index} className={childContainerStyles}>
                {child}
              </div>
            ))}
          </div>

          {/* Expandable rows */}
          {isExpandable && (
            <div
              className={getExpandableWrapperStyles({
                isExpanded,
              })}
              aria-hidden={!isExpanded}
            >
              <div
                className={getExpandableChildrenContainerStyles({
                  repeatCount: maxColumns,
                })}
              >
                {expandableChildren.map((child, index) => (
                  <div
                    key={index + maxColumns}
                    className={childContainerStyles}
                    aria-hidden={!isExpanded}
                    // @ts-expect-error - react type issue: https://github.com/facebook/react/pull/24730
                    inert={!isExpanded ? '' : undefined}
                  >
                    {child}
                  </div>
                ))}
              </div>
            </div>
          )}

          {isExpandable && <Button {...expandButtonProps} />}
        </div>
      </LeafyGreenProvider>
    );
  },
);

ExpandableGrid.displayName = 'ExpandableGrid';
