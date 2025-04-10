import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import Icon from '@leafygreen-ui/icon';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { color } from '@leafygreen-ui/tokens';
import { Body, Error, useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import {
  convertFormFieldStateToIconVariant,
  getFontSizeStyles,
} from '../FormField/FormField.styles';
import { FormFieldState } from '../FormField/FormField.types';
import { useFormFieldContext } from '../FormFieldContext';

import {
  containerStyles,
  getIconWrapperHeight,
  hideContainerStyle,
  iconWrapperStyles,
  spacingTop,
} from './FormFieldFeedback.styles';
import { FormFieldFeedbackProps } from './FormFieldFeedback.types';

export const FormFieldFeedback = ({
  baseFontSize: baseFontSizeProp,
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
  const baseFontSize = useUpdatedBaseFontSize(baseFontSizeProp);
  const fontStyles = getFontSizeStyles({ baseFontSize, size });
  const { lgIds } = useFormFieldContext();

  const isErrorState = state === FormFieldState.Error;
  const isValidState = state === FormFieldState.Valid;
  const showFormFieldFeedback = (isErrorState || isValidState) && !disabled;

  const iconProps = showFormFieldFeedback
    ? ({
        glyph: isErrorState ? 'Warning' : 'Checkmark',
        fill: color[theme].icon[convertFormFieldStateToIconVariant(state)]
          .default,
        title: isErrorState ? 'Error' : 'Valid',
      } as const)
    : undefined;

  return (
    <div
      id={id}
      data-lgid={lgIds.feedback}
      data-testid={lgIds.feedback}
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
          {iconProps && (
            <div className={cx(iconWrapperStyles, getIconWrapperHeight(size))}>
              <Icon {...iconProps} aria-hidden />
            </div>
          )}
          {isErrorState ? (
            <Error
              data-lgid={lgIds.errorMessage}
              data-testid={lgIds.errorMessage}
              className={fontStyles}
            >
              {errorMessage}
            </Error>
          ) : (
            <Body
              data-lgid={lgIds.successMessage}
              data-testid={lgIds.successMessage}
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
