import React, { useCallback, useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { getNodeTextContent, Theme } from '@leafygreen-ui/lib';
import {
  InferredPolymorphic,
  useInferredPolymorphic,
} from '@leafygreen-ui/polymorphic';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  TabDescendantsContext,
  useTabPanelDescendantsContext,
  useTabsContext,
} from '../context';

import { childrenContainerStyles, getStyles } from './TabTitle.styles';
import { BaseTabTitleProps } from './TabTitle.types';

const TabTitle = InferredPolymorphic<BaseTabTitleProps, 'button'>(
  (
    { children, className, disabled = false, name, onClick, ...rest },
    fwdRef,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize();
    const { index, ref, id } = useDescendant(TabDescendantsContext, fwdRef);
    const { tabPanelDescendants } = useTabPanelDescendantsContext();
    const { as, darkMode, selected, size } = useTabsContext();
    const { Component } = useInferredPolymorphic(as, rest, 'button');

    const theme = darkMode ? Theme.Dark : Theme.Light;
    const isSelected = index === selected;

    const relatedTabPanel = useMemo(() => {
      return tabPanelDescendants.find(
        tabPanelDescendant => tabPanelDescendant.index === index,
      );
    }, [tabPanelDescendants, index]);

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        onClick?.(event, index);
      },
      [index, onClick],
    );

    const nodeText = getNodeTextContent(name);

    return (
      <Component
        aria-controls={relatedTabPanel?.id}
        aria-selected={!disabled && isSelected}
        className={getStyles({
          baseFontSize,
          className,
          disabled,
          isSelected,
          size,
          theme,
        })}
        data-text={nodeText}
        disabled={disabled}
        id={id}
        name={nodeText}
        onClick={handleClick}
        ref={ref}
        role="tab"
        tabIndex={isSelected ? 0 : -1}
        {...rest}
      >
        <div className={childrenContainerStyles}>{children}</div>
      </Component>
    );
  },
);

TabTitle.displayName = 'TabTitle';

export default TabTitle;
