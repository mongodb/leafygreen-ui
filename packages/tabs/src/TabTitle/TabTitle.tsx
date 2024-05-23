import React, {
  RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { getNodeTextContent, Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  useTabDescendant,
  useTabDescendantsContext,
  useTabPanelDescendantsContext,
} from '../context';

import {
  listTitleChildrenStyles,
  listTitleFontSize,
  listTitleModeStyles,
  listTitleStyles,
} from './TabTitle.styles';
import { BaseTabTitleProps } from './TabTitle.types';

const TabTitle: ExtendableBox<BaseTabTitleProps, 'button'> = ({
  children,
  className,
  darkMode,
  disabled = false,
  onClick,
  selectedIndex,
  ...rest
}: BaseTabTitleProps) => {
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize();
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const { index, ref, id } = useTabDescendant();
  const { tabDescendants } = useTabDescendantsContext();
  const { tabPanelDescendants } = useTabPanelDescendantsContext();

  const theme = darkMode ? Theme.Dark : Theme.Light;
  const selected = index === selectedIndex;

  useEffect(() => {
    // if tab is disabled or not selected, return early
    // otherwise, focus may need to be manually moved
    if (disabled || !selected || !titleRef.current) return;

    // if focus is not on tab descendants, return early
    // otherwise, focus needs to be manually moved
    const activeEl = document.activeElement;
    const tabList = tabDescendants.map(
      descendant => descendant.element.parentElement,
    );
    const isFocusOnTabDescendants =
      activeEl instanceof HTMLElement && tabList.indexOf(activeEl) !== -1;
    if (!isFocusOnTabDescendants) return;

    titleRef.current.focus();
  }, [disabled, selected, tabDescendants, titleRef]);

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

  const sharedTabProps = {
    ...rest,
    className: cx(
      listTitleFontSize[baseFontSize],
      listTitleStyles,
      listTitleModeStyles[theme].base,
      {
        [listTitleModeStyles[theme].selected]: selected,
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
    role: 'tab',
    tabIndex: selected ? 0 : -1,
    ['aria-controls']: relatedTabPanel?.id,
    ['aria-selected']: selected,
    ['data-text']: nodeText,
  } as const;

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={titleRef as RefObject<HTMLAnchorElement>}
        {...sharedTabProps}
      >
        <div className={listTitleChildrenStyles} ref={ref}>
          {children}
        </div>
      </Box>
    );
  }

  return (
    <Box
      as="button"
      ref={titleRef as RefObject<HTMLButtonElement>}
      {...sharedTabProps}
    >
      <div className={listTitleChildrenStyles} ref={ref}>
        {children}
      </div>
    </Box>
  );
};

TabTitle.displayName = 'TabTitle';

export default TabTitle;
