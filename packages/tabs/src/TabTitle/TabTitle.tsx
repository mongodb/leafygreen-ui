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
    {
      as,
      children,
      className,
      darkMode,
      disabled = false,
      onClick,
      selectedIndex,
      ...rest
    },
    fwdRef,
  ) => {
    const baseFontSize: BaseFontSize = useUpdatedBaseFontSize();
    const { Component } = useInferredPolymorphic(as, rest, 'button');
    const { index, ref, id } = useDescendant(TabDescendantsContext);
    const { tabPanelDescendants } = useTabPanelDescendantsContext();

    const theme = darkMode ? Theme.Dark : Theme.Light;
    const selected = index === selectedIndex;

    const relatedTabPanel = useMemo(() => {
      return tabPanelDescendants.find(
        tabPanelDescendant => tabPanelDescendant.index === index,
      );
    }, [tabPanelDescendants, index]);

    const handleClick = useCallback(
      (event: React.MouseEvent) => {
        onClick(event, index);
      },
      [index, onClick],
    );

    const nodeText = getNodeTextContent(rest.name);

    const componentProps = {
      ...rest,
      className: cx(
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
      ),
      disabled,
      id,
      name: nodeText,
      onClick: handleClick,
      ref: fwdRef,
      role: 'tab',
      tabIndex: selected ? 0 : -1,
      ['aria-controls']: relatedTabPanel?.id,
      ['aria-selected']: !disabled && selected,
      ['data-text']: nodeText,
    } as const;

    return (
      <Component {...componentProps}>
        <div className={listTitleChildrenStyles} ref={ref}>
          {children}
        </div>
      </Component>
    );
  },
);

TabTitle.displayName = 'TabTitle';

export default TabTitle;
