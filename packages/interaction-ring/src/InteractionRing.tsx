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
    interactionRingFocus: '#9dd0e7',
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
  transition: all 150ms ease-in-out;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

function getInteractionRingStyle({
  mode,
  hovered,
  focused,
  borderRadius = '4px',
  color,
}: {
  mode: Mode;
  hovered: boolean;
  focused: boolean;
  borderRadius?: string;
  color?: {
    focused?: string;
    hovered?: string;
  };
}) {
  const hoverStyle = css`
    box-shadow: 0 0 0 3px
      ${color?.hovered ?? colorSets[mode].interactionRingHover};
  `;

  const focusStyle = css`
    box-shadow: 0 0 0 3px
      ${color?.focused ?? colorSets[mode].interactionRingFocus};
  `;

  return cx(
    baseInteractionRingStyle,
    css`
      border-radius: ${borderRadius};
    `,
    {
      [hoverStyle]: hovered,
    },
    {
      [focusStyle]: focused,
    },
  );
}

const baseContentStyle = css`
  width: 100%;
  height: 100%;

  // Form elements don't always inherit these by default
  // https://developer.mozilla.org/en-US/docs/Learn/Forms/Styling_web_forms#Fonts_and_text
  font-family: inherit;
  font-size: 100%;
`;

interface InteractionRingProps {
  darkMode?: boolean;
  className?: string;
  borderRadius?: string;
  color?: {
    focused?: string;
    hovered?: string;
  };
  focusedElement?: HTMLElement | null;
  children: React.ReactElement;
  disabled?: boolean;
  forceState?: {
    focused?: boolean;
    hovered?: boolean;
  };
}

export default function InteractionRing({
  darkMode = false,
  className,
  borderRadius,
  color,
  focusedElement,
  children,
  disabled = false,
  forceState = {},
}: InteractionRingProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const { usingKeyboard: showFocus } = useUsingKeyboardContext();

  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const interactionRingStyle = getInteractionRingStyle({
    mode,
    hovered: forceState.hovered ?? hovered,
    focused: showFocus && (forceState.focused ?? focused),
    borderRadius,
    color,
  });

  useEffect(() => {
    if (focusedElement === undefined || focusedElement === null) {
      return;
    }

    if (focused) {
      const offFocus = () => setFocused(false);
      focusedElement.addEventListener('blur', offFocus);
      return () => focusedElement.removeEventListener('focus', offFocus);
    } else {
      const onFocus = () => setFocused(true);
      focusedElement.addEventListener('focus', onFocus);
      return () => focusedElement.removeEventListener('focus', onFocus);
    }
  }, [focusedElement, focused]);

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

  const childIsFocusedElement = focusedElement === undefined;

  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      if (childIsFocusedElement) {
        setFocused(true);
      }
      children.props.onFocus?.(event);
    },
    [children.props.onFocus, childIsFocusedElement],
  );

  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (childIsFocusedElement) {
        setFocused(false);
      }
      children.props.onBlur?.(event);
    },
    [children.props.onBlur, childIsFocusedElement],
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
      {!disabled && <div className={interactionRingStyle} />}
    </div>
  );
}

InteractionRing.displayName = 'InteractionRing';
