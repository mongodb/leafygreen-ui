import React from 'react';
import PropTypes from 'prop-types';
import { css, cx } from '@leafygreen-ui/emotion';
import { HTMLElementProps } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';

const Variant = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Variant = typeof Variant[keyof typeof Variant];

export { Variant };

interface SharedIconButtonProps {
  /**
   * Determines color of `IconButton`. Can be `light` or `dark`.
   */
  variant?: Variant;

  /**
   * Classname applied to `IconButton`.
   */
  className?: string;

  /**
   * Content to appear inside of `IconButton`.
   */
  children?: React.ReactNode;

  /**
   * Determines whether or not `IconButton` is disabled.
   */
  disabled?: boolean;
}

interface LinkIconButtonProps
  extends HTMLElementProps<'a'>,
    SharedIconButtonProps {
  /**
   * Destination URL, if supplied `IconButton` will render in `a` tags, rather than `button` tags.
   */
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
  cursor: pointer;

  &:before {
    content: '';
    transition: 150ms all ease-in-out;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: 100%;
    opacity: 0;
    transform: scale(0.8);
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

const disabledStyle: { readonly [K in Variant]: string } = {
  [Variant.Light]: css`
    color: ${uiColors.gray.light2};
  `,

  [Variant.Dark]: css`
    color: ${uiColors.gray.dark2};
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

/**
 * # IconButton
 *
 * IconButton Component
 *
 * ```
<IconButton variant='dark'>
  <Icon glyph={copy} />
</IconButton>
```
 * @param props.children Content to appear inside of `IconButton`.
 * @param props.className Classname applied to `IconButton`.
 * @param props.disabled Determines whether or not `IconButton` is disabled.
 * @param props.variant Determines color of `IconButton`. Can be `light` or `dark`.
 * @param props.href Destination URL, if supplied `IconButton` will render in `a` tags, rather than `button` tags.
 * @param props.onClick Callback fired when `IconButton` is clicked.
 */

function IconButton({
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
      aria-disabled={disabled}
      className={cx(
        removeButtonStyle,
        baseIconButtonStyle,
        iconButtonVariants[variant],
        {
          [disabledStyle[variant]]: disabled,
        },
        className,
      )}
    >
      <span className={iconStyle}>{children}</span>
    </Root>
  );
}

IconButton.displayName = 'IconButton';

IconButton.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  href: PropTypes.string,
};

export default IconButton;
