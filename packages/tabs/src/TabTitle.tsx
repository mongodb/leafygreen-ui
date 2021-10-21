import React, { useState, useRef, useEffect, RefObject } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { useIsomorphicLayoutEffect } from '@leafygreen-ui/hooks';
import { Mode } from './Tabs';
import { getNodeTextContent } from './getNodeTextContent';

const modeColors = {
  light: {
    listTitleColor: css`
      color: ${uiColors.gray.dark1};
    `,
    listTitleHover: css`
      &:hover {
        cursor: pointer;

        &:not(:focus) {
          color: ${uiColors.gray.dark3};

          &:after {
            background-color: ${uiColors.gray.light2};
          }
        }
      }
    `,
    listTitleFocus: css`
      &:focus {
        color: ${uiColors.blue.base};

        &:after {
          background-color: ${uiColors.blue.base};
        }
      }
    `,
  },

  dark: {
    listTitleColor: css`
      color: ${uiColors.gray.light1};
    `,
    listTitleHover: css`
      &:hover {
        cursor: pointer;

        &:not(:focus) {
          color: ${uiColors.white};

          &:after {
            background-color: ${uiColors.gray.dark1};
          }
        }
      }
    `,
    listTitleFocus: css`
      &:focus {
        color: ${uiColors.blue.light1};

        &:after {
          background-color: ${uiColors.focus};
        }
      }
    `,
  },
};

const listTitleSelected = css`
  &:after {
    transform: scaleX(1);
    background-color: ${uiColors.green.base};
  }

  &:hover:after {
    transform: scaleX(1);
    background-color: ${uiColors.green.base};
  }
`;

const listTitle = css`
  background-color: transparent;
  border: 0px;
  padding: 12px 16px;
  text-decoration: none;
  max-width: 300px;
  white-space: nowrap;
  transition: 150ms color ease-in-out;
  font-family: ${fontFamilies.default};
  font-weight: 600;
  font-size: 16px;
  position: relative;

  &:focus {
    outline: none;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    border-radius: 4px 4px 0 0;
    transition: all 150ms ease-in-out;
    background-color: transparent;
    transform: scaleX(0.8);
  }

  &:hover:after {
    transform: scaleX(0.95);
  }

  &:active:after {
    &:after {
      transform: scaleX(1);
      background-color: ${uiColors.green.base};
    }
  }
`;

const textOverflowStyles = css`
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface BaseTabTitleProps {
  darkMode?: boolean;
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isAnyTabFocused?: boolean;
  parentRef?: HTMLDivElement;
  [key: string]: any;
}

const TabTitle: ExtendableBox<BaseTabTitleProps, 'button'> = ({
  selected = false,
  disabled = false,
  children,
  className,
  darkMode,
  parentRef,
  ...rest
}: BaseTabTitleProps) => {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const [showEllipsis, setShowEllipsis] = useState(false);
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  const mode = darkMode ? Mode.Dark : Mode.Light;

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

  useIsomorphicLayoutEffect(() => {
    const titleNode = titleRef.current;

    if (titleNode == null) {
      return;
    }

    // Max-width of TabTitle is 300 pixels, and we only want to show ellipsis when the title exceeds this length
    // When this style isn't conditionally applied, TabTitle will automatically truncate based on available space in the viewport.
    if (titleNode.scrollWidth > 300) {
      setShowEllipsis(true);
    }
  }, [titleRef, setShowEllipsis]);

  const sharedTabProps = {
    ...rest,
    className: cx(
      listTitle,
      modeColors[mode].listTitleColor,
      {
        [listTitleSelected]: selected,
        [modeColors[mode].listTitleFocus]: showFocus,
        [textOverflowStyles]: showEllipsis,
        [modeColors[mode].listTitleHover]: !disabled && !selected,
      },
      className,
    ),
    role: 'tab',
    tabIndex: selected ? 0 : -1,
    ['aria-selected']: selected,
    name: getNodeTextContent(rest.name),
  } as const;

  if (typeof rest.href === 'string') {
    return (
      <Box
        as="a"
        ref={titleRef as RefObject<HTMLAnchorElement>}
        {...sharedTabProps}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box
      as="button"
      ref={titleRef as RefObject<HTMLButtonElement>}
      {...sharedTabProps}
    >
      {children}
    </Box>
  );
};

TabTitle.displayName = 'TabTitle';

export default TabTitle;
