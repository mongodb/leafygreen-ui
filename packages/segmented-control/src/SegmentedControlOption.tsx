import React, {
  forwardRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import { cx } from '@leafygreen-ui/emotion';
import {
  useBaseFontSize,
  useUsingKeyboardContext,
} from '@leafygreen-ui/leafygreen-provider';
import Box from '@leafygreen-ui/box';
import { SegmentedControlContext } from './SegmentedControlContext';
import {
  optionStyle,
  boxStyle,
  buttonStyle,
  buttonFocusStyle,
  labelStyle,
  textEllipsisStyle,
  iconOnlyThemeStyles,
} from './SegmentedControlOption.styles';
import { SegmentedControlOptionProps } from './types';
import { isComponentType } from '@leafygreen-ui/lib';
import { isComponentGlyph } from '@leafygreen-ui/icon';

/**
 * SegmentedControlOption
 */
export const SegmentedControlOption = forwardRef<
  HTMLDivElement,
  SegmentedControlOptionProps
>(
  (
    {
      value,
      children,
      disabled = false,
      as,
      className,
      'aria-controls': ariaControls,
      _id: id,
      _checked: checked,
      _focused: focused,
      _index: index,
      _onClick,
      _onHover,
      isfocusInComponent,
      ...rest
    }: SegmentedControlOptionProps,
    forwardedRef,
  ) => {
    const { size, theme, followFocus } = useContext(SegmentedControlContext);
    const { usingKeyboard } = useUsingKeyboardContext();
    const baseFontSize = useBaseFontSize();
    const [hasIcon, setHasIcon] = useState<boolean>(false);

    const onClick = () => {
      _onClick?.(value);
    };

    const onMouseEnter = () => {
      _onHover?.(true);
    };

    const onMouseLeave = () => {
      _onHover?.(false);
    };

    const didComponentMount = useRef(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    useEffect(() => {
      // Check if the component did mount
      if (didComponentMount.current) {
        // usingKeyboard: Returns if the keyboard is being used.
        // focused: Returns if this option should be the item in focus.
        // isfocusInComponent: Returns if the focus should organically be this component. Without this check this component will hijack the focus if `usingKeyboard` is updated to true.
        if (usingKeyboard && focused && isfocusInComponent) {
          // Respond in the DOM when this option is given focus via keyboard
          buttonRef?.current?.focus();

          if (followFocus) {
            // Used to ensure native click default events fire when using keyboard navigation
            buttonRef?.current?.click();
          }
        }
      }
      didComponentMount.current = true;
    }, [focused, followFocus, usingKeyboard, isfocusInComponent]);

    // Gets the number of children.
    const childCount = React.Children.count(children);

    // Wraps text in a `<span>`. This span will be used to clip text and add an ellipsis. We do this so that consumers don't have to add the `<span>` themselves. We can't add the ellipsis styles to the parent container because that container has `display: flex` which doesn't work with `text-overflow: ellipsis`.
    // Also checks if child is an Icon.
    const renderedChildren = useMemo(
      () =>
        React.Children.map(children, child => {
          // if its a string wrap it in a span
          if (typeof child === 'string')
            return <span className={textEllipsisStyle}>{child}</span>;
          // if its a LG icon or glyph set hasIcon to true
          if (isComponentType(child, 'Icon') || isComponentGlyph(child))
            setHasIcon(true);
          return child;
        }),
      [children],
    );

    return (
      <div
        className={cx(optionStyle({ theme, size, baseFontSize }), className)}
        ref={forwardedRef}
        data-lg-checked={checked}
      >
        <Box as={as} tabIndex={-1} className={boxStyle} {...rest}>
          <button
            role="tab"
            id={id}
            tabIndex={focused ? 0 : -1}
            aria-selected={checked}
            aria-controls={ariaControls}
            disabled={disabled}
            className={cx(buttonStyle, {
              [buttonFocusStyle[theme]]: usingKeyboard,
              [iconOnlyThemeStyles]: hasIcon && childCount === 1, // If there is only one child and that child is an icon. Icons are different colors when there is text.
            })}
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            type="button"
          >
            <span className={labelStyle}>{renderedChildren}</span>
          </button>
        </Box>
      </div>
    );
  },
);

SegmentedControlOption.displayName = 'SegmentedControlOption';

SegmentedControlOption.propTypes = {
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};
