import React, { useRef, useEffect, RefObject } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { fontFamilies } from '@leafygreen-ui/tokens';
import { Mode } from './Tabs';

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
        color: #43b1e5;

        &:after {
          background-color: ${uiColors.blue.base};
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
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
`;

interface BaseTabProps {
  ariaControl: string;
  darkMode: boolean;
  index: number;
  selected?: boolean;
  href?: string;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
}

const TabTitle: ExtendableBox<BaseTabProps, 'button'> = ({
  selected = false,
  disabled = false,
  children,
  className,
  ariaControl,
  index,
  darkMode,
  ...rest
}: BaseTabProps) => {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);
  const mode = darkMode ? Mode.Dark : Mode.Light;

  useEffect(() => {
    if (!disabled && selected && titleRef.current) {
      titleRef.current.focus();
    }
  }, [disabled, selected]);

  const sharedTabProps = {
    className: cx(
      listTitle,
      modeColors[mode].listTitleColor,
      {
        [modeColors[mode].listTitleHover]: !disabled,
        [listTitleSelected]: selected,
        [modeColors[mode].listTitleFocus]: showFocus,
      },
      className,
    ),
    role: 'tab',
    ['aria-controls']: ariaControl,
    ['aria-selected']: selected,
    ['aria-disabled']: disabled,
    tabIndex: selected ? 0 : -1,
    ...rest,
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
