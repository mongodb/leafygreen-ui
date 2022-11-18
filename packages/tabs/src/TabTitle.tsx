import React, { useRef, useEffect, RefObject } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { palette } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import {
  fontFamilies,
  typeScales,
  transitionDuration,
} from '@leafygreen-ui/tokens';
import { getNodeTextContent, Theme } from '@leafygreen-ui/lib';

interface ListTitleMode {
  base: string;
  hover: string;
  focus: string;
  selected: string;
  disabled: string;
}

const listTitleModeStyles: Record<Theme, ListTitleMode> = {
  light: {
    base: css`
      color: ${palette.gray.dark1};
    `,
    hover: css`
      &:hover {
        cursor: pointer;
        color: ${palette.gray.dark3};
        &:after {
          background-color: ${palette.gray.light2};
        }
      }
    `,
    focus: css`
      &:focus {
        color: ${palette.blue.base};

        &:after {
          background-color: ${palette.blue.light1};
        }
      }
    `,
    selected: css`
      color: ${palette.green.dark2};
      font-weight: 700;

      &:after {
        transform: scaleX(1);
        background-color: ${palette.green.dark1};
      }

      &:hover {
        color: ${palette.green.dark2};

        &:after {
          transform: scaleX(1);
          background-color: ${palette.green.dark1};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.light1};
    `,
  },

  dark: {
    base: css`
      color: ${palette.gray.light1};
    `,
    hover: css`
      &:hover {
        cursor: pointer;
        color: ${palette.white};

        &:after {
          background-color: ${palette.gray.dark2};
        }
      }
    `,
    focus: css`
      &:focus {
        color: ${palette.blue.light1};

        &:after {
          background-color: ${palette.blue.light1};
        }
      }
    `,
    selected: css`
      color: ${palette.green.base};
      font-weight: 700;

      &:after {
        transform: scaleX(1);
        background-color: ${palette.green.dark1};
      }

      &:hover {
        color: ${palette.green.base};

        &:after {
          transform: scaleX(1);
          background-color: ${palette.green.dark1};
        }
      }
    `,
    disabled: css`
      cursor: not-allowed;
      color: ${palette.gray.dark2};
    `,
  },
};

const listTitleStyles = css`
  font-family: ${fontFamilies.default};
  font-size: ${typeScales.body1.fontSize}px;
  font-weight: 500;
  position: relative;
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: 300px;
  padding: 12px 16px;
  background-color: transparent;
  border: 0px;
  margin: 0;
  text-decoration: none;
  transition: ${transitionDuration.default}ms color ease-in-out;

  &:focus:not(:disabled) {
    outline: none;
    font-weight: 700;
  }

  // We create a pseudo element that's the width of the bolded text
  // This way there's no layout shift on hover when the text is bolded.
  &:before {
    content: attr(data-text);
    height: 0;
    font-weight: 700;
    visibility: hidden;
    overflow: hidden;
    user-select: none;
    pointer-events: none;
  }

  &:after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 4px;
    border-radius: 4px 4px 0 0;
    transition: all ${transitionDuration.default}ms ease-in-out;
    background-color: transparent;
    transform: scaleX(0.8);
  }

  &:hover:after {
    transform: scaleX(0.95);
  }

  &:active:after {
    &:after {
      transform: scaleX(1);
    }
  }
`;

const listTitleChildrenStyles = css`
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  // Cannot use flexbox here to center children because it breaks text-overflow: ellipsis

  > svg {
    vertical-align: text-bottom;
    margin-right: 4px;
  }
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
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

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
      listTitleStyles,
      listTitleModeStyles[theme].base,
      {
        [listTitleModeStyles[theme].selected]: selected,
        [listTitleModeStyles[theme].focus]: showFocus,
        [listTitleModeStyles[theme].hover]: !disabled && !selected,
        [listTitleModeStyles[theme].disabled]: disabled,
      },
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
