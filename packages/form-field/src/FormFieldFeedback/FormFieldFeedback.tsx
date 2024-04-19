import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color } from '@leafygreen-ui/tokens';
import { Body, Error, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { LGIDS_FORM_FIELD } from '../constants';
import { getFontSize } from '../FormField/FormField.styles';
import { FormFieldState } from '../FormField/FormField.types';

import {
  containerStyles,
  getIconWrapperHeight,
  hideContainerStyle,
  iconWrapperStyles,
  spacingTop,
} from './FormFieldFeedback.styles';
import { FormFieldFeedbackProps } from './FormFieldFeedback.types';

export const FormFieldFeedback = ({
  disabled,
  errorMessage,
  hideFeedback = false,
  id,
  size,
  state,
  successMessage,
  ...rest
}: FormFieldFeedbackProps) => {
  const { theme } = useDarkMode();
  const baseFontSize = useUpdatedBaseFontSize();
  const fontStyles = getFontSize({ baseFontSize, size });

  const isErrorState = state === FormFieldState.Error;
  const isValidState = state === FormFieldState.Valid;
  const showFormFieldFeedback = (isErrorState || isValidState) && !disabled;

  const iconProps = {
    glyph: isErrorState ? 'Warning' : 'Checkmark',
    fill: color[theme].icon[isErrorState ? 'error' : 'success'].default,
    title: isErrorState ? 'Error' : 'Valid',
  } as const;

  return (
    <div
      className={cx(containerStyles, {
        [spacingTop]: showFormFieldFeedback,
        [hideContainerStyle]: hideFeedback,
      })}
      aria-live="polite"
      aria-relevant="all"
      {...rest}
    >
      {showFormFieldFeedback && (
        <>
          <div className={cx(iconWrapperStyles, getIconWrapperHeight(size))}>
            <Icon {...iconProps} aria-hidden />
          </div>
          {isErrorState ? (
            <Error
              data-lgid={LGIDS_FORM_FIELD.errorMessage}
              data-testid="lg-form_field_feedback-error_message"
              className={fontStyles}
            >
              {errorMessage}
            </Error>
          ) : (
            <Body
              data-lgid={LGIDS_FORM_FIELD.successMessage}
              data-testid="lg-form_field_feedback-success_message"
              className={fontStyles}
            >
              {successMessage}
            </Body>
          )}
        </>
      )}
    </div>
  );
};

FormFieldFeedback.displayName = 'FormFieldFeedback';
