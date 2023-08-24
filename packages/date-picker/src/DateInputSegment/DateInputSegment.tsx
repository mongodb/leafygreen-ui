import React from 'react';
import { padStart } from 'lodash';

import { cx } from '@leafygreen-ui/emotion';
import { useControlledValue } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../DatePickerContext';

import {
  charsPerSegment,
  defaultMax,
  defaultMin,
  defaultPlaceholder,
} from './DateInputSegment.constants';
import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
  segmentWidthStyles,
} from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';

export function DateInputSegment({
  segment,
  value: controlledValue,
  min: minProp,
  max: maxProp,
  onChange,
  darkMode,
}: DateInputSegmentProps) {
  const min = minProp ?? defaultMin[segment];
  const max = maxProp ?? defaultMax[segment];

  const { value, handleChange } = useControlledValue(controlledValue, onChange);

  const { theme } = useDarkMode(darkMode);
  const baseFontSize = useUpdatedBaseFontSize();
  const { size } = useDatePickerContext();

  return (
    <input
      type="number"
      value={
        value ? padStart(value?.toString(), charsPerSegment[segment], '0') : ''
      }
      min={min}
      max={max}
      placeholder={defaultPlaceholder[segment]}
      onChange={handleChange}
      className={cx(
        baseStyles,
        fontSizeStyles[baseFontSize],
        segmentThemeStyles[theme],
        segmentSizeStyles[size ?? Size.Default],
        segmentWidthStyles[segment],
      )}
    />
  );
}

DateInputSegment.displayName = 'DateInputSegment';
