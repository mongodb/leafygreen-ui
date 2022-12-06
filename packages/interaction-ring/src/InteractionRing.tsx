import React, { useCallback, useEffect, useMemo, useState } from 'react';

import { css, cx } from '@leafygreen-ui/emotion';
import { useUsingKeyboardContext } from '@leafygreen-ui/leafygreen-provider';
import { createUniqueClassName } from '@leafygreen-ui/lib';
import { palette,uiColors } from '@leafygreen-ui/palette';
import { transitionDuration } from '@leafygreen-ui/tokens';

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
    interactionRingHover: palette.gray.light2,
    interactionRingFocus: palette.blue.light1,
  },
  [Mode.Dark]: {
    interactionRingHover: uiColors.gray.dark1,
    interactionRingFocus: uiColors.focus,
  },
};

const baseContainerStyle = css`
  display: inline-flex;
  align-items: stretch;
  position: relative;
  z-index: 0;
`;

const baseInteractionRingStyle = css`
  transition: all ${transitionDuration.default}ms ease-in-out;
  position: absolute;
  z-index: -1;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
`;

const interactionRingClassName = createUniqueClassName('interaction-ring');

function computeStyles({
  mode,
  hovered,
  focused,
  borderRadius = '4px',
  color,
}: {
  mode: Mode;
  hovered: boolean | undefined;
  focused: boolean | undefined;
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

  return {
    container: cx(baseContainerStyle, {
      [css`
        &:hover > .${interactionRingClassName} {
          ${hoverStyle}
        }
      `]: hovered !== false && !focused,
    }),
    interactionRing: cx(
      baseInteractionRingStyle,
      css`
        border-radius: ${borderRadius};
      `,
      {
        [hoverStyle]: hovered ?? false,
      },
      {
        [focusStyle]: focused,
      },
    ),
  };
}

interface State {
  hovered?: boolean;
  focused?: boolean;
}

interface InteractionRingProps {
  darkMode?: boolean;
  className?: string;
  borderRadius?: string;
  color?: {
    focused?: string;
    hovered?: string;
  };
  focusTargetElement?: HTMLElement | null;
  children: React.ReactElement;
  disabled?: boolean;
  forceState?: State;
  ignoreKeyboardContext?: boolean;
}

/**
 * @deprecated Prefer `tokens/hoverRing` & `tokens/focusRing`
 */
export default function InteractionRing({
  darkMode = false,
  className,
  borderRadius,
  color,
  focusTargetElement,
  children,
  disabled = false,
  forceState = {},
  ignoreKeyboardContext = false,
  ...rest
}: InteractionRingProps) {
  const mode = darkMode ? Mode.Dark : Mode.Light;
  const { usingKeyboard } = useUsingKeyboardContext();
  const showFocus = ignoreKeyboardContext || usingKeyboard;

  const [focused, setFocused] = useState<boolean>();

  const styles = computeStyles({
    mode,
    hovered: forceState.hovered,
    focused: showFocus && (forceState.focused ?? focused),
    borderRadius,
    color,
  });

  useEffect(() => {
    if (focusTargetElement === undefined || focusTargetElement === null) {
      return;
    }

    const focused = focusTargetElement === document.activeElement;
    setFocused(focused);

    if (focused) {
      const offFocus = () => setFocused(false);
      focusTargetElement.addEventListener('blur', offFocus);
      return () => focusTargetElement.removeEventListener('blur', offFocus);
    } else {
      const onFocus = () => setFocused(true);
      focusTargetElement.addEventListener('focus', onFocus);
      return () => focusTargetElement.removeEventListener('focus', onFocus);
    }
  }, [focusTargetElement, focused]);

  const { className: contentClassName } = children.props;

  const childIsFocusTarget = focusTargetElement === undefined;

  const onFocusProp = children.props.onFocus;
  const onFocus = useCallback(
    (event: React.FocusEvent) => {
      if (childIsFocusTarget) {
        setFocused(true);
      }
      onFocusProp?.(event);
    },
    [childIsFocusTarget, onFocusProp],
  );

  const onBlurProp = children.props.onBlur;
  const onBlur = useCallback(
    (event: React.FocusEvent) => {
      if (childIsFocusTarget) {
        setFocused(false);
      }
      onBlurProp?.(event);
    },
    [childIsFocusTarget, onBlurProp],
  );

  const content = useMemo(
    () =>
      React.cloneElement(children, {
        className: contentClassName,
        onFocus,
        onBlur,
      }),
    [children, contentClassName, onBlur, onFocus],
  );

  return (
    <div className={cx(styles.container, className)} {...rest}>
      {content}
      {!disabled && (
        <div className={cx(interactionRingClassName, styles.interactionRing)} />
      )}
    </div>
  );
}

InteractionRing.displayName = 'InteractionRing';
