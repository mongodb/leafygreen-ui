import React from 'react';
import PropTypes from 'prop-types';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Description, Error, Label, Overline } from '@leafygreen-ui/typography';

import { Input } from '../Input';
import { UnitSelect } from '../UnitSelect';

import {
  errorMessageStyles,
  errorMessageWrapperStyles,
  labelDescriptionStyles,
  unitBaseStyles,
  unitDisabledStyles,
  unitThemeStyles,
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
      errorMessage,
      onChange,
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
      ...rest
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-number-input';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const errorMessageId = useIdAllocator({ prefix, id: ariaDescribedbyProp });
    const descriptionId = useIdAllocator({ prefix });
    const selectId = useIdAllocator({ prefix });
    const { darkMode, theme } = useDarkMode(darkModeProp);

    const hasUnit = !!unit;
    const hasSelectOptions =
      Array.isArray(unitOptions) && unitOptions.length > 1;
    const isUnitInOptions = unitOptions.find(u => u.displayName === unit);
    const renderUnitOnly = hasUnit && !hasSelectOptions;
    const renderSelectOnly = hasUnit && hasSelectOptions && !!isUnitInOptions;
    const renderErrorMessage = state === State.Error && errorMessage;

    const popoverProps = {
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
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
              aria-describedby={`${errorMessageId} ${
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
                className={cx(unitBaseStyles, unitThemeStyles[theme], {
                  [unitDisabledStyles[theme]]: disabled,
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
                {...popoverProps}
              />
            )}
          </div>
          <div
            className={errorMessageWrapperStyles}
            aria-live="polite"
            aria-relevant="all"
            id={errorMessageId}
          >
            {renderErrorMessage && (
              <Error className={errorMessageStyles}>{errorMessage}</Error>
            )}
          </div>
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';

NumberInput.propTypes = {
  id: PropTypes.string,
  'aria-label': PropTypes.string,
  'aria-labelledby': PropTypes.string,
  label: PropTypes.string,
  description: PropTypes.string,
  errorMessage: PropTypes.string,
  'aria-describedby': PropTypes.string,
  className: PropTypes.string,
  darkMode: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onSelectChange: PropTypes.func,
  placeholder: PropTypes.string,
  size: PropTypes.oneOf(Object.values(Size)),
  state: PropTypes.oneOf(Object.values(State)),
  value: PropTypes.string,
  unit: PropTypes.string,
  unitOptions: PropTypes.arrayOf(
    PropTypes.shape({
      displayName: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ),
  // Popover Props
  popoverZIndex: PropTypes.number,
  scrollContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalClassName: PropTypes.string,
} as any;
