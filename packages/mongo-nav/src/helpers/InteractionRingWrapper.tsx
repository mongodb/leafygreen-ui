import React, { useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { uiColors } from '@leafygreen-ui/palette';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';

const interactionRing = css`
  transition: all 150ms ease-in-out;
  transform: scale(0.9, 0.8);
  border-radius: 7px;
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -3px;
  right: -3px;
  pointer-events: none;
  background-color: ${uiColors.gray.light2};
`;

interface InteractionRingWrapperProps {
  className?: string;
  ringClassName?: string;
  children: React.ReactNode;
  selector: string;
}

const InteractionRingWrapper = React.forwardRef<
  HTMLDivElement,
  InteractionRingWrapperProps
>(
  (
    {
      className,
      ringClassName,
      children,
      selector,
    }: InteractionRingWrapperProps,
    ref,
  ) => {
    const { usingKeyboard: showFocus } = useUsingKeyboardContext();
    const [hasFocus, setHasFocus] = useState(false);

    const interactionRingFocusStyle = css`
      ${selector}:focus + & {
        background-color: ${uiColors.blue.light1};
        transform: scale(1);
        z-index: 1;
      }
    `;

    const interactionRingHoverStyle = css`
      ${selector}:hover + & {
        transform: scale(1);
      }
    `;

    const defaultPosition = css`
      position: relative;
      z-index: 0;
    `;

    const modifiedChildren = React.Children.map(children, child => {
      if (!React.isValidElement(child)) {
        return child;
      } else {
        return React.cloneElement(child, {
          onFocus: () => setHasFocus(true),
          onBlur: () => setHasFocus(false),
          className: cx(
            child.props.className,
            css`
              position: relative;
              z-index: ${hasFocus ? 2 : 1};
            `,
          ),
        });
      }
    });

    return (
      <div className={cx(defaultPosition, className)} ref={ref}>
        {modifiedChildren}
        <div
          className={cx(
            interactionRing,
            interactionRingHoverStyle,
            {
              [interactionRingFocusStyle]: showFocus,
            },
            ringClassName,
          )}
        />
      </div>
    );
  },
);

InteractionRingWrapper.displayName = 'InteractionRingWrapper';

export default InteractionRingWrapper;
