import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { css, cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { uiColors } from '@leafygreen-ui/palette';

const Mode = {
  Light: 'light',
  Dark: 'dark',
} as const;

type Mode = typeof Mode[keyof typeof Mode];

interface ColorSet {
  interactionRingHover: string;
  interactionRingFocus: string;
}

const colorSets: Record<Mode, ColorSet> = {
  [Mode.Light]: {
    interactionRingHover: uiColors.gray.light2,
    interactionRingFocus: uiColors.blue.light1,
  },
  [Mode.Dark]: {
    interactionRingHover: uiColors.gray.dark1,
    interactionRingFocus: uiColors.blue.base,
  },
};

const baseContainerStyle = css`
  display: inline-flex;
  align-items: stretch;
  position: relative;
  z-index: 0;
`;

const baseInteractionRingStyle = css`
  border-radius: 4px;
  transition: all 150ms ease-in-out;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

const baseContentStyle = css`
  width: 100%;
  height: 100%;

  // Form elements don't always inherit these by default
  // https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms#Fonts_and_text
  font-family: inherit;
  font-size: 100%;
`;

function computeStyles(mode: Mode) {
  const hoverStyle = css`
    box-shadow: 0 0 0 3px ${colorSets[mode].interactionRingHover};
  `;

  const focusStyle = css`
    box-shadow: 0 0 0 3px ${colorSets[mode].interactionRingFocus};
  `;

  return { hoverStyle, focusStyle };
}

interface InteractionRingProps {
  darkMode: boolean;
  className?: string;
  borderRadius?: string;
  selector?: string;
  children: React.ReactElement;
  disabled: boolean;
  forceState?: {
    focused?: boolean;
    hovered?: boolean;
  };
}

export function InteractionRing({
  darkMode,
  className,
  borderRadius,
  selector,
  children,
  disabled,
  forceState = {},
}: InteractionRingProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const { hoverStyle, focusStyle } = computeStyles(mode);

  useEffect(() => {
    if (selector === undefined) {
      return;
    }

    const element = document.querySelector(selector);

    if (element === null) {
      return;
    }

    if (focused) {
      const offFocus = () => setFocused(false);
      element.addEventListener('blur', offFocus);
      return () => element.removeEventListener('focus', offFocus);
    } else {
      const onFocus = () => setFocused(true);
      element.addEventListener('focus', onFocus);
      return () => element.removeEventListener('focus', onFocus);
    }
  }, [focused, selector]);

  const { className: contentClassName } = children.props;

  const onMouseEnter = useCallback(
    (event: React.MouseEvent) => {
      setHovered(true);
      children.props.onMouseEnter?.(event);
    },
    [children.props.onMouseEnter],
  );

  const onMouseLeave = useCallback(
    (event: React.MouseEvent) => {
      setHovered(false);
      children.props.onMouseLeave?.(event);
    },
    [children.props.onMouseLeave],
  );

  const hasSelector = selector !== undefined;

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      if (!hasSelector) {
        setFocused(true);
      }
      children.props.onFocus?.(event);
    },
    [children.props.onFocus, hasSelector],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (!hasSelector) {
        setFocused(false);
      }
      children.props.onBlur?.(event);
    },
    [children.props.onBlur, hasSelector],
  );

  const content = useMemo(() => {
    return React.cloneElement(children, {
      className: cx(baseContentStyle, contentClassName),
      onMouseEnter,
      onMouseLeave,
      onFocus,
      onBlur,
    });
  }, [children, contentClassName, onBlur, onFocus, onMouseEnter, onMouseLeave]);

  return (
    <div className={cx(baseContainerStyle, className)}>
      {content}
      {!disabled && (
        <div
          className={cx(
            baseInteractionRingStyle,
            {
              [hoverStyle]: forceState.hovered ?? hovered,
            },
            {
              [focusStyle]: showFocus && (forceState.focused ?? focused),
            },
            {
              [css`
                border-radius: ${borderRadius};
              `]: borderRadius !== undefined,
            },
          )}
        />
      )}
    </div>
  );
}

InteractionRing.displayName = 'InteractionRing';
