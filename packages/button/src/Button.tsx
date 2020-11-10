import React from 'react';
import PropTypes from 'prop-types';
import Box, { ExtendableBox } from '@leafygreen-ui/box';
import { css, cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { uiColors } from '@leafygreen-ui/palette';
import { colorSets, Size, sizeSets, Variant } from './styleSets';

const baseStyle = css`
  position: relative;
  // Establishes the root element as a new stacking context
  // so that the z-index of the span within the button doesn't
  // appear above other elements on the page that it shouldn't.
  z-index: 0;
  border-radius: 3px;
  box-sizing: border-box;
  cursor: pointer;
  display: inline-flex;
  align-items: stretch;
  font-family: Akzidenz, 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: normal;
  text-decoration: none;
  text-transform: none;
  transition: all 120ms ease;
  outline: none;
  user-select: none;
  padding: 0;
  overflow: hidden;

  &:hover {
    text-decoration: none;
  }

  // We're using CSS pseudo elements here in order to
  // transition the gradients between button pseudo classes.
  &:before,
  &:after {
    content: '';
    transition: 0.15s opacity ease-in-out;
    opacity: 0;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &:not(:disabled) {
    &:focus,
    &:hover {
      &:before {
        opacity: 1;
      }
    }

    &:active:after {
      opacity: 1;
    }
  }
`;

const disabledStyle = css`
  color: ${uiColors.gray.base};
  border-color: ${uiColors.gray.light1};
  background-color: ${uiColors.gray.light2};
  background-image: none;
  box-shadow: none;
  pointer-events: none;
`;

interface BaseButtonProps {
  disabled?: boolean;
  variant?: Variant;
  darkMode?: boolean;
  size?: Size;
  glyph?: React.ReactElement;
  className?: string;
  children?: React.ReactNode;
  href?: string;
  focused?: boolean;
}

const Button: ExtendableBox<
  BaseButtonProps & { ref?: React.Ref<any> },
  'button'
> = React.forwardRef(
  (
    {
      className,
      children,
      darkMode = false,
      disabled = false,
      variant = Variant.Default,
      size = Size.Normal,
      glyph,
      focused,
      ...rest
    }: BaseButtonProps,
    ref: React.Ref<any>,
  ) => {
    const colorSet = colorSets[variant];
    const sizeSet = sizeSets[size];

    const { usingKeyboard: showFocus } = useUsingKeyboardContext();

    const focusStyle = css`
      box-shadow: 0 0 0 3px ${darkMode ? '#007DB2' : '#9DD0E7'},
        ${colorSet.background.shadow.base};
    `;

    const commonProps = {
      ref,
      className: cx(
        baseStyle,
        css`
          color: ${colorSet.text};
          border: 1px solid ${colorSet.border};
          height: ${sizeSet.height}px;
          font-size: ${sizeSet.text.size}px;
          background-image: ${colorSet.background.image.base};

          // Include an invisible placeholder for transitioning the focus ring
          box-shadow: 0 0 0 3px rgba(0, 0, 0, 0),
            ${colorSet.background.shadow.base};

          &:hover {
            box-shadow: 0 0 0 3px ${darkMode ? uiColors.gray.dark1 : '#E4EAE8'},
              ${colorSet.background.shadow.base};
          }

          &:before {
            background-color: ${colorSet.background.color['focus/hover']};
            background-image: ${colorSet.background.image['focus/hover']};
            box-shadow: ${colorSet.background.shadow['focus/hover'].higher},
              ${colorSet.background.shadow['focus/hover'].lower};

            // Prevent the background of pseudo-element from covering
            // the corners of the button's inset box-shadow
            border-radius: 2px;
          }

          &:after {
            background-color: ${colorSet.background.color.active};
            background-image: ${colorSet.background.image.active};
            box-shadow: ${colorSet.background.shadow.active};
          }
        `,
        {
          [css`
            &:active,
            &:focus,
            &:hover {
              color: ${colorSets[Variant.Primary].text};
              border-color: ${colorSets[Variant.Primary].border};
            }
          `]: variant === Variant.Info,
          [css`
            text-transform: ${sizeSet.text.transform};
          `]: sizeSet.text.transform !== undefined,
          [css`
            font-weight: ${sizeSet.text.weight};
          `]: sizeSet.text.weight !== undefined,
        },
        {
          [css`
            &:focus {
              ${focusStyle}
            }
          `]: showFocus && focused !== false,
          [css`
            ${focusStyle}

            :hover {
              ${focusStyle}
            }
          `]: showFocus && focused === true,
        },
        { [disabledStyle]: disabled },
        className,
      ),
      // only add a disabled prop if not an anchor
      ...(typeof rest.href !== 'string' && { disabled }),
      'aria-disabled': disabled,
    };

    const spanStyle = css`
      // Usually for this to take effect, you would need the element to be
      /* ￿positioned￿. Due to an obscure part of CSS spec, flex children */
      // respect z-index without the position property being set.
      //
      // https://www.w3.org/TR/css-flexbox-1/#painting
      z-index: 1;
      display: inline-flex;
      flex-grow: 1;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    `;

    const modifiedGlyph =
      glyph && children
        ? React.cloneElement(glyph, {
            className: cx({
              [css`
                margin-right: ${sizeSet.glyph.margin}px;
              `]: glyph != null,
            }),
          })
        : glyph;

    const content = (
      <span
        className={cx(
          spanStyle,
          css`
            padding: 0 ${sizeSet.content.padding.horizontal}px;
          `,
        )}
      >
        {modifiedGlyph}
        {children}
      </span>
    );

    if (typeof rest.href === 'string') {
      return (
        <Box as="a" {...commonProps} {...rest}>
          {content}
        </Box>
      );
    }

    return (
      // we give button a default "as" value based on the `href` prop, if a custom
      // "as" prop is supplied, it will overwrite this value through {...rest}
      <Box as="button" type="button" {...commonProps} {...rest}>
        {content}
      </Box>
    );
  },
);

Button.displayName = 'Button';

Button.propTypes = {
  variant: PropTypes.oneOf(Object.values(Variant)),
  darkMode: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  className: PropTypes.string,
  children: PropTypes.node,
  disabled: PropTypes.bool,
  focused: PropTypes.bool,
  // @ts-ignore
  as: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]),
  href: PropTypes.string,
  glyph: PropTypes.element,
};

export default Button;
