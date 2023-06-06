import React, { useEffect, useRef } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Spinner } from '@leafygreen-ui/loading-indicator';
import { registerRipple } from '@leafygreen-ui/ripple';

import {
  buttonContentSizeStyle,
  buttonContentStyle,
  buttonSpinnerSize,
  centeredSpinnerContainerStyles,
  centeredSpinnerStyles,
  hiddenContentStyles,
  rippleColors,
  rippleStyle,
  spinnerColor,
} from './ButtonContent.styles';
import { ButtonContentProps } from './ButtonContent.types';
import DefaultContent from './DefaultContent';

/**
 * Internal contents of a Button
 * @internal
 */
export const ButtonContent = (props: ButtonContentProps) => {
  const {
    darkMode: darkModeProp,
    disabled,
    variant,
    size,
    isLoading,
    loadingText,
    className,
  } = props;

  const { darkMode, theme } = useDarkMode(darkModeProp);
  const rippleRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let unregisterRipple: (() => void) | undefined;
    const backgroundColor = rippleColors[theme][variant];

    if (rippleRef.current != null && !disabled) {
      unregisterRipple = registerRipple(rippleRef.current, {
        backgroundColor,
      });
    }

    return unregisterRipple;
  }, [rippleRef, variant, darkMode, disabled, theme]);

  if (isLoading) {
    return (
      <>
        <div
          className={cx(buttonContentStyle, buttonContentSizeStyle[size], {
            [centeredSpinnerContainerStyles]: !loadingText,
          })}
        >
          <Spinner
            className={cx({
              [centeredSpinnerStyles]: !loadingText,
            })}
            sizeOverride={buttonSpinnerSize[size]}
            colorOverride={spinnerColor[theme]}
            data-testid="lg-button-spinner"
          />
          {loadingText}
        </div>
        {!loadingText && (
          <DefaultContent
            {...props}
            className={cx(hiddenContentStyles, className)}
          />
        )}
      </>
    );
  }

  return (
    <>
      {/* Ripple cannot wrap children, otherwise components that rely on children to render dropdowns will not be rendered due to the overflow:hidden rule. */}
      <div className={rippleStyle} ref={rippleRef} />
      <DefaultContent {...props} />
    </>
  );
};
