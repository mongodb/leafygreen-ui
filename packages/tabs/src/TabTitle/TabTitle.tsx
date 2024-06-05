import React, { useCallback, useMemo } from 'react';

import { useDescendant } from '@leafygreen-ui/descendants';
import { cx } from '@leafygreen-ui/emotion';
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

import {
  listTitleChildrenStyles,
  listTitleFontSize,
  listTitleModeStyles,
  listTitleStyles,
} from './TabTitle.styles';
import { BaseTabTitleProps } from './TabTitle.types';

const TabTitle = InferredPolymorphic<BaseTabTitleProps, 'button'>(
  (
    { children, className, disabled = false, name, onClick, ...rest },
    fwdRef,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize();
    const { index, ref, id } = useDescendant(TabDescendantsContext, fwdRef);
    const { tabPanelDescendants } = useTabPanelDescendantsContext();
    const { as, darkMode, selectedIndex } = useTabsContext();
    const { Component } = useInferredPolymorphic(as, rest, 'button');

    const theme = darkMode ? Theme.Dark : Theme.Light;
    const selected = index === selectedIndex;

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
        aria-selected={!disabled && selected}
        className={cx(
          listTitleFontSize[baseFontSize],
          listTitleStyles,
          listTitleModeStyles[theme].base,
          {
            [listTitleModeStyles[theme].selected]: !disabled && selected,
            [listTitleModeStyles[theme].hover]: !disabled && !selected,
            [listTitleModeStyles[theme].disabled]: disabled,
          },
          listTitleModeStyles[theme].focus,
          className,
        )}
        data-text={nodeText}
        disabled={disabled}
        id={id}
        name={nodeText}
        onClick={handleClick}
        ref={ref}
        role="tab"
        tabIndex={selected ? 0 : -1}
        {...rest}
      >
        <div className={listTitleChildrenStyles}>{children}</div>
      </Component>
    );
  },
);

TabTitle.displayName = 'TabTitle';

export default TabTitle;
