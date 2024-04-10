import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Error, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_SELECT } from '../constants';
import { State } from '../Select/Select.types';

import {
  containerStyles,
  errorIconThemeStyle,
  errorTextMobileStyles,
  hideContainerStyle,
  validIconThemeStyle,
  validMessageThemeStyle,
  validMessageTypeScaleStyles,
} from './StateFeedback.styles';
import { StateFeedbackProps } from './StateFeedback.types';

export const StateFeedback = ({
  state,
  errorMessage,
  successMessage,
  hideFeedback,
  disabled,
}: StateFeedbackProps) => {
  const { theme } = useDarkMode();
  const baseFontSize = useUpdatedBaseFontSize();

  const isErrorState = state === State.Error;
  const isValidState = state === State.Valid;
  const showStateFeedback = (isErrorState || isValidState) && !disabled;

  const iconProps = {
    glyph: isErrorState ? 'Warning' : 'Checkmark',
    fill: isErrorState
      ? errorIconThemeStyle[theme]
      : validIconThemeStyle[theme],
    title: isErrorState ? 'Error' : 'Valid',
  };

  return (
    <div
      className={cx(containerStyles, {
        [hideContainerStyle]: hideFeedback,
      })}
      aria-live="polite"
      aria-relevant="all"
    >
      {showStateFeedback && (
        <>
          <Icon
            glyph={iconProps.glyph}
            fill={iconProps.fill}
            title={iconProps.title}
            aria-hidden
          />
          {isErrorState ? (
            <Error
              className={errorTextMobileStyles}
              data-lgid={LGIDS_SELECT.errorMessage}
            >
              {errorMessage}
            </Error>
          ) : (
            <div
              className={cx(
                validMessageThemeStyle[theme],
                validMessageTypeScaleStyles[baseFontSize],
              )}
            >
              {successMessage}
            </div>
          )}
        </>
      )}
    </div>
  );
};

StateFeedback.displayName = 'StateFeedback';
