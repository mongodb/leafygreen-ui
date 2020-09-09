import React, {
  useRef,
  useEffect,
  useCallback,
  SetStateAction,
  RefObject,
} from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { Variant } from '.';

const colorVariant = {
  default: {
    listTitleColor: css`
      color: ${uiColors.gray.dark1};
    `,
    listTitleHover: css`
      &:hover {
        cursor: pointer;
      }

      &:hover:not(:focus) {
        color: ${uiColors.gray.dark3};
      }
    `,
    listTitleFocus: css`
      &:focus {
        color: ${uiColors.blue.base};
      }
    `,
  },

  light: {
    listTitleColor: css`
      color: ${uiColors.gray.light1};
    `,
    listTitleHover: css`
      &:hover {
        cursor: pointer;
      }

      &:hover:not(:focus) {
        color: ${uiColors.white};
      }
    `,
    listTitleFocus: css`
      &:focus {
        color: #43b1e5;
      }
    `,
  },
};

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
  font-family: Akzidenz Medium;
  font-size: 16px;

  &:focus {
    outline: none;
  }
`;

interface BaseTabProps {
  ariaControl: string;
  setFocusedState: React.Dispatch<SetStateAction<Array<number>>>;
  variant: Variant;
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
  setFocusedState,
  index,
  variant,
  ...rest
}: BaseTabProps) => {
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();
  const titleRef = useRef<HTMLAnchorElement | HTMLButtonElement>(null);

  useEffect(() => {
    if (!disabled && selected && titleRef.current) {
      titleRef.current.focus();
    }
  }, [disabled, selected]);

  const onBlur = useCallback(() => {
    setFocusedState((curr: Array<number>) => curr.filter(el => index !== el));
  }, [index, setFocusedState]);

  const onFocus = useCallback(() => {
    setFocusedState((curr: Array<number>) => [...curr, index]);
  }, [index, setFocusedState]);

  const sharedTabProps = {
    className: cx(
      listTitle,
      colorVariant[variant].listTitleColor,
      {
        [colorVariant[variant].listTitleHover]: !disabled,
        [colorVariant[variant].listTitleFocus]: showFocus,
      },
      className,
    ),
    role: 'tab',
    ['aria-controls']: ariaControl,
    ['aria-selected']: selected,
    ['aria-disabled']: disabled,
    tabIndex: selected ? 0 : -1,
    onBlur: onBlur,
    onFocus: onFocus,
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
