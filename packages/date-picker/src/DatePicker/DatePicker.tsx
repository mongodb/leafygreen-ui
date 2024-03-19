import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';

import LeafyGreenProvider, {
  useDarkMode,
} from '@leafygreen-ui/leafygreen-provider';
import { pickAndOmit } from '@leafygreen-ui/lib';
import { BaseFontSize, Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { AutoComplete, DatePickerState } from '../shared';
import {
  ContextPropKeys,
  contextPropNames,
  SharedDatePickerProvider,
} from '../shared/context';
import { useControlledValue } from '../shared/hooks';

import { DatePickerProps } from './DatePicker.types';
import { DatePickerContent } from './DatePickerContent';
import { DatePickerProvider } from './DatePickerContext';

/**
 * LeafyGreen Date Picker component
 */
export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      value: valueProp,
      initialValue: initialProp,
      onDateChange: onChangeProp,
      handleValidation,
      darkMode: darkModeProp,
      baseFontSize: basefontSizeProp,
      ...props
    }: DatePickerProps,
    fwdRef,
  ) => {
    const { darkMode } = useDarkMode(darkModeProp);
    const baseFontSize = useUpdatedBaseFontSize(basefontSizeProp);
    const [contextProps, componentProps] = pickAndOmit<
      DatePickerProps,
      ContextPropKeys
    >({ ...props }, contextPropNames);

    const { value, setValue } = useControlledValue(
      valueProp,
      onChangeProp,
      initialProp,
    );

    return (
      <SharedDatePickerProvider
        darkMode={darkMode}
        baseFontSize={baseFontSize}
        {...contextProps}
      >
        <DatePickerProvider
          value={value}
          setValue={setValue}
          handleValidation={handleValidation}
        >
          <LeafyGreenProvider
            darkMode={darkMode}
            baseFontSize={
              baseFontSize === BaseFontSize.Body1 ? 14 : baseFontSize
            }
          >
            <DatePickerContent ref={fwdRef} {...componentProps} />
          </LeafyGreenProvider>
        </DatePickerProvider>
      </SharedDatePickerProvider>
    );
  },
);

DatePicker.displayName = 'DatePicker';

DatePicker.propTypes = {
  value: PropTypes.instanceOf(Date),
  onDateChange: PropTypes.func,
  initialValue: PropTypes.instanceOf(Date),
  handleValidation: PropTypes.func,
  onChange: PropTypes.func,
  label: PropTypes.node,
  description: PropTypes.node,
  locale: PropTypes.string,
  timeZone: PropTypes.string,
  min: PropTypes.instanceOf(Date),
  max: PropTypes.instanceOf(Date),
  baseFontSize: PropTypes.oneOf(Object.values(BaseFontSize)),
  disabled: PropTypes.bool,
  size: PropTypes.oneOf(Object.values(Size)),
  state: PropTypes.oneOf(Object.values(DatePickerState)),
  errorMessage: PropTypes.string,
  initialOpen: PropTypes.bool,
  autoComplete: PropTypes.oneOf(Object.values(AutoComplete)),
  darkMode: PropTypes.bool,
  // Popover Props
  popoverZIndex: PropTypes.number,
  portalContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  /// @ts-expect-error Types of property '[nominalTypeHack]' are incompatible.
  portalRef: PropTypes.shape({
    current:
      typeof window !== 'undefined'
        ? PropTypes.instanceOf(Element)
        : PropTypes.any,
  }),
  scrollContainer:
    typeof window !== 'undefined'
      ? PropTypes.instanceOf(Element)
      : PropTypes.any,
  portalClassName: PropTypes.string,
};
