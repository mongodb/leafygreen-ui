import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { DEFAULT_MESSAGES, FormFieldFeedback } from '@leafygreen-ui/form-field';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Description, Label, Overline } from '@leafygreen-ui/typography';

import { Input } from '../Input';
import { UnitSelect } from '../UnitSelect';

import {
  getUnitDisabledStyles,
  getUnitThemeStyles,
  labelDescriptionStyles,
  unitBaseStyles,
  wrapperBaseStyles,
  wrapperGapStyles,
  wrapperSizeStyles,
} from './NumberInput.styles';
import { NumberInputProps, Size, State } from './NumberInput.types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      state = State.None,
      size = Size.Default,
      unitOptions = [],
      onSelectChange = () => {},
      disabled = false,
      darkMode: darkModeProp,
      id: idProp,
      'aria-describedby': ariaDescribedbyProp,
      'aria-labelledby': ariaLabelledbyProp,
      'aria-label': ariaLabelProp,
      unit,
      className,
      inputClassName,
      selectClassName,
      label,
      value,
      description,
      errorMessage = DEFAULT_MESSAGES.error,
      successMessage = DEFAULT_MESSAGES.success,
      onChange,
      ...rest
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-number-input';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const feedbackId = useIdAllocator({ prefix, id: ariaDescribedbyProp });
    const descriptionId = useIdAllocator({ prefix });
    const selectId = useIdAllocator({ prefix });
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const hasUnit = !!unit;
    const hasSelectOptions =
      Array.isArray(unitOptions) && unitOptions.length > 1;
    const isUnitInOptions = unitOptions.find(u => u.displayName === unit);
    const renderUnitOnly = hasUnit && !hasSelectOptions;
    const renderSelectOnly = hasUnit && hasSelectOptions && !!isUnitInOptions;

    const formFieldFeedbackProps = {
      disabled,
      errorMessage,
      id: feedbackId,
      size,
      state,
      successMessage,
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div className={className}>
          {(label || description) && (
            <div className={labelDescriptionStyles}>
              {label && (
                <Label htmlFor={inputId} disabled={disabled}>
                  {label}
                </Label>
              )}
              {description && (
                <Description id={descriptionId} disabled={disabled}>
                  {description}
                </Description>
              )}
            </div>
          )}
          <div
            className={cx(wrapperBaseStyles, wrapperSizeStyles[size], {
              [wrapperGapStyles]: renderUnitOnly,
            })}
          >
            <Input
              ref={forwardedRef}
              className={inputClassName}
              value={value}
              onChange={onChange}
              disabled={disabled}
              size={size}
              id={inputId}
              hasSelectOptions={renderSelectOnly}
              state={state}
              errorMessage={errorMessage}
              aria-describedby={`${feedbackId} ${
                description ? descriptionId : ''
              } ${renderSelectOnly ? selectId : ''}`}
              aria-labelledby={
                !label && ariaLabelledbyProp ? ariaLabelledbyProp : ''
              }
              aria-label={!label && ariaLabelProp ? ariaLabelProp : ''}
              {...rest}
            />
            {renderUnitOnly && (
              <Overline
                className={cx(unitBaseStyles, getUnitThemeStyles(theme), {
                  [getUnitDisabledStyles(theme)]: disabled,
                })}
              >
                {unit}
              </Overline>
            )}
            {renderSelectOnly && (
              <UnitSelect
                id={selectId}
                disabled={disabled}
                unit={unit}
                unitOptions={unitOptions}
                onChange={onSelectChange}
                size={size}
                className={selectClassName}
              />
            )}
          </div>
          <FormFieldFeedback {...formFieldFeedbackProps} />
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';
