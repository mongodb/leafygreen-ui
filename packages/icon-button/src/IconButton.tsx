import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';

const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

interface SharedIconButtonProps {
  variant?: Variant;
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
}

interface LinkIconButtonProps
  extends HTMLElementProps<'a'>,
    SharedIconButtonProps {
  href: string;
}

interface ButtonIconButtonProps
  extends HTMLElementProps<'button'>,
    SharedIconButtonProps {
  href?: null;
}

type IconButtonProps = LinkIconButtonProps | ButtonIconButtonProps;

const removeButtonStyle = css`
  border: none;
  -webkit-appearance: unset;
  padding: unset;
`;

const baseIconButtonStyle = css`
  height: 28px;
  width: 28px;
  display: inline-block;
  border-radius: 100px;
  color: ${uiColors.gray.base};
  position: relative;

  &:before {
    content: '';
    transition: 0.1s all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0.9);
  }

  &:hover:before,
  &:focus:before {
    opacity: 1;
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

const iconButtonVariants: { readonly [K in Variant]: string } = {
  [Variant.Light]: css`
    &:hover {
      &:before {
        background-color: ${uiColors.gray.light2};
      }

      color: ${uiColors.gray.dark2};
    }

    &:focus:before {
      background-color: ${uiColors.blue.light2};
    }
  `,

  [Variant.Dark]: css`
    &:hover {
      &:before {
        background-color: ${uiColors.gray.dark2};
      }

      color: ${uiColors.white};
    }

    &:focus:before {
      background-color: ${uiColors.blue.dark2};
    }
  `,
};

const iconStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 16px;
  width: 16px;
`;

export default function IconButton({
  variant = 'light',
  disabled = false,
  className,
  onClick,
  href,
  children,
  ...rest
}: IconButtonProps) {
  const Root = href ? 'a' : 'button';

  return (
    <Root
      {...rest}
      onClick={disabled ? undefined : onClick}
      href={href ? href : undefined}
      className={cx(
        { [removeButtonStyle]: !href },
        baseIconButtonStyle,
        iconButtonVariants[variant],
        className,
      )}
    >
      <span className={iconStyle}>{children}</span>
    </Root>
  );
}
