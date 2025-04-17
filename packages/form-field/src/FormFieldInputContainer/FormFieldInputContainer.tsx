import React, { forwardRef } from 'react';

import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';

import { FormFieldState } from '../FormField/FormField.types';
import { useFormFieldContext } from '../FormFieldContext/FormFieldContext';

import {
  additionalChildrenWrapperStyles,
  childrenWrapperStyles,
  getChildrenStyles,
  getContentEndStyles,
  getInputWrapperStyles,
  getOptionalTextStyle,
} from './FormFieldInputContainer.styles';
import { FormFieldInputContainerProps } from './FormFieldInputContainer.types';

/**
 * Applies styling around the `input` of a FormField element
 * @internal
 */
export const FormFieldInputContainer = forwardRef<
  HTMLDivElement,
  FormFieldInputContainerProps
>(
  (
    { contentEnd, className, children, ...rest }: FormFieldInputContainerProps,
    fwdRef,
  ) => {
    const { theme } = useDarkMode();
    const { disabled, size, state, inputProps, optional, lgIds } =
      useFormFieldContext();

    const renderedChildren = React.cloneElement(children, {
      ...inputProps,
      className: getChildrenStyles(children.props.className),
    });

    const showOptionalText =
      state === FormFieldState.None && !disabled && optional;
    const showAdditionalChildren = showOptionalText || contentEnd;

    return (
      <div
        {...rest}
        ref={fwdRef}
        className={getInputWrapperStyles({
          disabled,
          size: size ?? Size.Default,
          state,
          theme,
          className,
        })}
      >
        <div className={childrenWrapperStyles}>{renderedChildren}</div>
        {showAdditionalChildren && (
          <div className={additionalChildrenWrapperStyles}>
            {showOptionalText && (
              <div
                data-lgid={lgIds.optional}
                data-testid={lgIds.optional}
                className={getOptionalTextStyle(theme)}
              >
                <p>Optional</p>
              </div>
            )}

            {contentEnd &&
              React.cloneElement(contentEnd, {
                className: getContentEndStyles(
                  theme,
                  disabled,
                  contentEnd.props.className,
                ),
                disabled,
                ['data-lgid']: lgIds.contentEnd,
                ['data-testid']: lgIds.contentEnd,
              })}
          </div>
        )}
      </div>
    );
  },
);

FormFieldInputContainer.displayName = 'FormFieldInputWrapper';
