import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { Either, isComponentType } from '@leafygreen-ui/lib';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { palette } from '@leafygreen-ui/palette';
import { isComponentGlyph } from '@leafygreen-ui/icon';
import { validateAriaLabelProps } from '@leafygreen-ui/a11y';
import { focusRing } from '@leafygreen-ui/tokens';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

const Size = {
  Default: 'default',
  Large: 'large',
  XLarge: 'xlarge',
} as const;

type Size = typeof Size[keyof typeof Size];

export { Size };

const removeButtonStyle = css`
  border: none;
  -webkit-appearance: unset;
  padding: unset;
`;

const baseIconButtonStyle = css`
  display: inline-block;
  border-radius: 100px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
  transition: 150ms ease-in-out;
  transition-property: color, box-shadow;

  // Set background to fully-transparent white for cross-browser compatability with Safari
  //
  // Safari treats "transparent" values in CSS as transparent black instead of white
  // which can make things render differently across browsers if not defined explicitly.
  background-color: rgba(255, 255, 255, 0);

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

  &:active:before,
  &:hover:before,
  &:focus:before {
    opacity: 1;
    transform: scale(1);
  }

  &:focus {
    outline: none;
  }
`;

const iconButtonSizes = {
  [Size.Default]: css`
    height: 28px;
    width: 28px;
  `,
  [Size.Large]: css`
    height: 36px;
    width: 36px;
  `,
  [Size.XLarge]: css`
    height: 42px;
    width: 42px;
  `,
} as const;

const iconButtonMode: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.gray.base};

    &:active,
    &:hover {
      color: ${palette.black};

      &:before {
        background-color: ${palette.gray.light2};
      }
    }
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light1};

    &:active,
    &:hover {
      color: ${palette.gray.light3};

      &:before {
        background-color: ${palette.gray.dark1};
      }
    }
  `,
};

const focusStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    &:focus {
      color: ${palette.black};
      box-shadow: ${focusRing[Mode.Light].default};

      &:before {
        background-color: ${palette.gray.light2};
      }
    }
  `,
  [Mode.Dark]: css`
    &:focus {
      color: ${palette.gray.light3};
      box-shadow: ${focusRing[Mode.Dark].default};

      &:before {
        background-color: ${palette.gray.dark1};
      }
    }
  `,
} as const;

const disabledStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    cursor: not-allowed;
    color: ${palette.gray.light1};
    background-color: transparent;

    &:active,
    &:hover {
      color: ${palette.gray.light1};

      &:before {
        background-color: transparent;
      }
    }

    &:focus {
      color: ${palette.gray.light1};

      &:before {
        background-color: transparent;
      }
    }
  `,

  [Mode.Dark]: css`
    cursor: not-allowed;
    color: ${palette.gray.dark1};
    background-color: transparent;

    &:active,
    &:hover {
      color: ${palette.gray.dark1};

      &:before {
        background-color: transparent;
      }
    }

    &:focus {
      color: ${palette.gray.dark1};

      &:before {
        background-color: transparent;
      }
    }
  `,
} as const;

const activeStyle: Record<Mode, string> = {
  [Mode.Light]: css`
    color: ${palette.black};

    &:before {
      background-color: ${palette.gray.light2};
      opacity: 1;
      transform: scale(1);
    }
  `,
  [Mode.Dark]: css`
    color: ${palette.gray.light3};

    &:before {
      background-color: ${palette.gray.dark1};
      opacity: 1;
      transform: scale(1);
    }
  `,
} as const;

const iconStyle = css`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

// Since applications can't yet tree-shake, we're duplicating this interface from the types in the namespaces within the Icon package rather than importing the Icon package.
interface IconProps extends React.SVGProps<SVGSVGElement> {
  glyph: string;
  size?: Size | number;
  title?: string | null | boolean;
}
interface BaseIconButtonProps
  extends React.HTMLAttributes<HTMLButtonElement | HTMLAnchorElement> {
  className?: string;
  children?: React.ReactNode;
  disabled?: boolean;
  size?: Size;
  darkMode?: boolean;
  active?: boolean;
  href?: string;
  'aria-label'?: string;
  'aria-labelledby'?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';

type AccessibleIconButtonProps = Either<BaseIconButtonProps, AriaLabels>;

export const IconButton: ExtendableBox<
  AccessibleIconButtonProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      size = Size.Default,
      darkMode = false,
      disabled = false,
      active = false,
      className,
      children,
      ...rest
    }: AccessibleIconButtonProps,
    ref: React.Ref<any>,
  ) => {
    const mode = darkMode ? 'dark' : 'light';
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

    // We do our own proptype validation here to ensure either 'aria-label' or 'aria-labelledby' are passed to the component.
    validateAriaLabelProps(rest, 'IconButton');

    const processedChildren = React.Children.map(children, child => {
      if (!child) {
        return null;
      }

      // Check to see if child is a LeafyGreen Icon or a LeafyGreen Glyph
      // If so, we unset the title and rely on the aria-label prop to give
      // information about the rendered content.
      if (isComponentType(child, 'Icon') || isComponentGlyph(child)) {
        const { size: childSize, title }: IconProps = child.props;

        const newChildProps: Partial<IconProps> = {
          size: childSize || size,
        };

        if (typeof title !== 'string' || title.length === 0) {
          // Unsets the title within an icon since the button itself will have
          // aria-label or aria-labelledby set.
          newChildProps.title = false;
        }

        return React.cloneElement(child, newChildProps);
      }

      return child;
    });

    const iconButtonProps = {
      ...rest,
      ref,
      tabIndex: 0,
      // We don't set the `disabled` prop since we want the button to be focusable
      ['aria-disabled']: disabled,
      // Override any actions if it's disabled
      href: disabled ? undefined : rest.href,
      onClick: disabled ? undefined : rest.onClick,
      className: cx(
        removeButtonStyle,
        baseIconButtonStyle,
        iconButtonSizes[size],
        iconButtonMode[mode],
        {
          [focusStyle[mode]]: showFocus,
          [activeStyle[mode]]: active,
          [disabledStyle[mode]]: disabled,
        },
        className,
      ),
    };

    if (typeof rest.href === 'string') {
      return (
        <Box as="a" {...iconButtonProps}>
          <div className={iconStyle}>{processedChildren}</div>
        </Box>
      );
    }

    return (
      <Box as="button" {...iconButtonProps}>
        <div className={iconStyle}>{processedChildren}</div>
      </Box>
    );
  },
);

IconButton.displayName = 'IconButton';

// @ts-ignore: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/37660
IconButton.propTypes = {
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  // @ts-ignore
  href: PropTypes.string,
  active: PropTypes.bool,
};

export default IconButton;
