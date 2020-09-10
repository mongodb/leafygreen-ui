import React from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import PropTypes from 'prop-types';
import { HTMLElementProps, Either, isComponentType } from '@leafygreen-ui/lib';
import { uiColors } from '@leafygreen-ui/palette';
import { LGGlyph } from '@leafygreen-ui/icon/src/types';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

export { Mode };

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
  color: ${uiColors.gray.base};
  position: relative;
  cursor: pointer;
  flex-shrink: 0;

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
    height: 35px;
    width: 35px;
  `,
  [Size.XLarge]: css`
    height: 42px;
    width: 42px;
  `,
} as const;

const iconButtonMode = {
  [Mode.Light]: css`
    &:hover {
      color: ${uiColors.gray.dark2};

      &:before {
        background-color: ${uiColors.gray.light2};
      }
    }

    &:focus {
      color: ${uiColors.blue.base};

      &:before {
        background-color: ${uiColors.blue.light2};
      }
    }
  `,

  [Mode.Dark]: css`
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
} as const;

const disabledStyle = {
  [Mode.Light]: css`
    color: ${uiColors.gray.light2};
    pointer-events: none;
  `,

  [Mode.Dark]: css`
    color: ${uiColors.gray.dark2};
    pointer-events: none;
  `,
} as const;

const activeStyle = {
  [Mode.Light]: css`
    color: ${uiColors.gray.dark2};
    background-color: ${uiColors.gray.light2};

    &:before {
      background-color: ${uiColors.gray.light2};
    }
  `,

  [Mode.Dark]: css`
    color: ${uiColors.white};
    background-color: ${uiColors.gray.dark2};

    &:before {
      background-color: ${uiColors.gray.dark2};
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

interface SharedIconButtonProps {
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
   *
   * default: `false`
   */
  disabled?: boolean;

  /**
   * Determines size of IconButton can be: default, large, xlarge
   *
   * @default: `'default'`
   */
  size?: Size;

  /**
   * Determines whether `IconButton` will appear `active`
   *
   * @default: `false`
   */
  active?: boolean;

  /**
   * Determines whether `IconButton` will appear in darkMode
   *
   * @default: `false`
   */
  darkMode?: boolean;
}

// We're omitting CSS here because of the issue with Omit and Pick's interaction
// with Emotion's module declaration for 'react' described in this issue:
// https://github.com/emotion-js/emotion/issues/1431
//
// The issue arises specifically when combined with the "Either" TS helper.
interface LinkIconButtonProps
  extends Omit<HTMLElementProps<'a'>, 'css'>,
    SharedIconButtonProps {
  /**
   * Destination URL, if supplied `IconButton` will render in `a` tags, rather than `button` tags.
   */
  href: string;
}

interface ButtonIconButtonProps
  extends Omit<HTMLElementProps<'button'>, 'css'>,
    SharedIconButtonProps {
  href?: null;
}

type AriaLabels = 'aria-label' | 'aria-labelledby';
type AccessibleLinkIconButtonProps = Either<LinkIconButtonProps, AriaLabels>;
type AccessibleButtonIconButtonProps = Either<
  ButtonIconButtonProps,
  AriaLabels
>;

type IconButtonProps =
  | AccessibleLinkIconButtonProps
  | AccessibleButtonIconButtonProps;

function usesLinkElement(
  props: IconButtonProps,
): props is AccessibleLinkIconButtonProps {
  return props.href != null;
}

function isComponentGlyph(
  child: React.ReactNode,
): child is React.ReactElement<LGGlyph.ComponentProps> {
  return (
    child != null &&
    typeof child === 'object' &&
    'type' in child &&
    (child.type as any).isGlyph === true
  );
}

/**
 * # IconButton
 *
 * IconButton Component
 *
 * ```
<IconButton darkMode={true}>
  <Icon glyph='Copy' />
</IconButton>
```
 * @param props.children Content to appear inside of `IconButton`.
 * @param props.className Classname applied to `IconButton`.
 * @param props.disabled Determines whether or not `IconButton` is disabled.
 * @param props.darkMode Determines if IconButton will appear in darkMode.
 * @param props.href Destination URL, if supplied `IconButton` will render in `a` tags, rather than `button` tags.
 * @param props.onClick Callback fired when `IconButton` is clicked.
 * @param props.active Determines whether `IconButton` will appear `active`
 *
 */

const IconButton = React.forwardRef((props: IconButtonProps, ref) => {
  const {
    size = Size.Default,
    darkMode = false,
    disabled = false,
    active = false,
    className,
    href,
    children,
    'aria-label': ariaLabel,
    'aria-labelledby': ariaLabelledBy,
    ...rest
  } = props;

  const mode = darkMode ? 'dark' : 'light';

  // We do our own proptype validation here to ensure either 'aria-label' or 'aria-labelledby' are passed to the component.
  if (!ariaLabel && !ariaLabelledBy) {
    console.error(
      'For screen-reader accessibility, aria-label or aria-labelledby must be provided to IconButton.',
    );
  }

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

  const renderIconButton = (Root: React.ElementType = 'button') => (
    <Root
      {...rest}
      ref={ref}
      href={href}
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cx(
        removeButtonStyle,
        baseIconButtonStyle,
        iconButtonSizes[size],
        iconButtonMode[mode],
        {
          [disabledStyle[mode]]: disabled,
          [activeStyle[mode]]: active,
        },
        className,
      )}
    >
      <div className={iconStyle}>{processedChildren}</div>
    </Root>
  );

  if (usesLinkElement(props)) {
    return renderIconButton('a');
  }

  return renderIconButton();
});

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
