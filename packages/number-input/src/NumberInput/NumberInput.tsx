import React from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useIdAllocator } from '@leafygreen-ui/hooks';
import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { Description, Label, Overline } from '@leafygreen-ui/typography';

import { Input } from '../Input';
import { Select } from '../Select';

import {
  unitBaseStyles,
  unitThemeStyles,
  wrapperBaseStyles,
  wrapperGapStyles,
  wrapperSizeStyles,
} from './NumberInput.styles';
import { NumberInputProps, Size, State, UnitOption } from './NumberInput.types';

export const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  (
    {
      className,
      disabled,
      label,
      value,
      description,
      onChange,
      onSelectChange,
      state = State.None,
      size = Size.Default,
      unitOptions = [],
      unit: unitProp,
      darkMode: darkModeProp,
      id: idProp,
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
      ...rest
    }: NumberInputProps,
    forwardedRef,
  ) => {
    const prefix = 'lg-numberinput';
    const inputId = useIdAllocator({ prefix, id: idProp });
    const { darkMode, theme } = useDarkMode(darkModeProp);

    /**
     * Checks if there is a unit
     */
    const hasUnit = !!unitProp;
    /**
     * Checks if the select option will render
     */
    const hasSelectOptions = unitOptions.length > 1;

    const renderUnitOnly = hasUnit && !hasSelectOptions;
    const renderSelectOnly = hasUnit && hasSelectOptions;

    /**
     * Gets the current unit option using the unit string
     */
    const currentUnitOption = unitOptions?.find(
      unit => unit.displayName === unitProp,
    );

    const popoverProps = {
      popoverZIndex,
      usePortal,
      portalClassName,
      portalContainer,
      scrollContainer,
    } as const;

    return (
      <LeafyGreenProvider darkMode={darkMode}>
        <div ref={forwardedRef} className={className}>
          {label && (
            <Label className={cx()} htmlFor={inputId} disabled={disabled}>
              {label}
            </Label>
          )}
          {description && (
            <Description disabled={disabled} className={cx()}>
              {description}
            </Description>
          )}
          <div
            className={cx(wrapperBaseStyles, wrapperSizeStyles[size], {
              [wrapperGapStyles]: renderUnitOnly,
            })}
          >
            <Input
              value={value}
              onChange={onChange}
              disabled={disabled}
              size={size}
              id={inputId}
              hasSelectOptions={renderSelectOnly}
              state={state}
              {...rest}
            />
            {renderUnitOnly && (
              <Overline
                className={cx(unitBaseStyles, unitThemeStyles[theme])}
              >{`${unitProp}(S)`}</Overline>
            )}
            {renderSelectOnly && (
              // TODO: needs id to associate with label
              <Select
                disabled={disabled}
                unit={currentUnitOption as UnitOption}
                unitOptions={unitOptions}
                onChange={onSelectChange} //TODO: make required if options are passed in
                size={size}
                {...popoverProps}
              />
            )}
          </div>
          {/* TODO: Error Message */}
        </div>
      </LeafyGreenProvider>
    );
  },
);

NumberInput.displayName = 'NumberInput';
