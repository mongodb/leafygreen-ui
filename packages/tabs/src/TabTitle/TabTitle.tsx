import React, { RefObject, useEffect, useRef } from 'react';

import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { cx } from '@leafygreen-ui/emotion';
import { getNodeTextContent, Theme } from '@leafygreen-ui/lib';
import { BaseFontSize } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  listTitleChildrenStyles,
  listTitleFontSize,
  listTitleModeStyles,
  listTitleStyles,
} from './TabTitle.styles';
import { BaseTabTitleProps } from './TabTitle.types';

const TabTitle: ExtendableBox<BaseTabTitleProps, 'button'> = ({
  selected = false,
  disabled = false,
  children,
  className,
  darkMode,
  parentRef,
  ...rest
}: BaseTabTitleProps) => {
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const baseFontSize: BaseFontSize = useUpdatedBaseFontSize();

  const theme = darkMode ? Theme.Dark : Theme.Light;

  // Checks to see if the current activeElement is a part of the same tab set
  // as the current TabTitle. If so, and the current TabTitle is not disabled
  // and is selected, we manually move focus to that TabTitle.
  useEffect(() => {
    const tabsList = Array.from(parentRef?.children ?? []);
    const activeEl = document.activeElement;

    if (
      activeEl &&
      tabsList.indexOf(activeEl) !== -1 &&
      !disabled &&
      selected &&
      titleRef.current
    ) {
      titleRef.current.focus();
    }
  }, [parentRef, disabled, selected, titleRef]);

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
    role: 'tab',
    tabIndex: selected ? 0 : -1,
    ['aria-selected']: selected,
    name: nodeText,
    ['data-text']: nodeText,
    disabled,
  } as const;

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={titleRef as RefObject<HTMLAnchorElement>}
        {...sharedTabProps}
      >
        <div className={listTitleChildrenStyles}>{children}</div>
      </Box>
    );
  }

  return (
    <Box
      as="button"
      ref={titleRef as RefObject<HTMLButtonElement>}
      {...sharedTabProps}
    >
      <div className={listTitleChildrenStyles}>{children}</div>
    </Box>
  );
};

TabTitle.displayName = 'TabTitle';

export default TabTitle;
