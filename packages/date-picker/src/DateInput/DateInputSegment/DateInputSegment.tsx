import React, { ChangeEventHandler } from 'react';

import { cx } from '@leafygreen-ui/emotion';
import { useForwardedRef } from '@leafygreen-ui/hooks';
import { useDarkMode } from '@leafygreen-ui/leafygreen-provider';
import { Size } from '@leafygreen-ui/tokens';
import { useUpdatedBaseFontSize } from '@leafygreen-ui/typography';

import { useDatePickerContext } from '../../DatePickerContext';
import { getValueFormatter } from '../utils/valueFormatter';

import { defaultMax, defaultMin, defaultPlaceholder } from './constants';
import {
  baseStyles,
  fontSizeStyles,
  segmentSizeStyles,
  segmentThemeStyles,
  segmentWidthStyles,
} from './DateInputSegment.styles';
import { DateInputSegmentProps } from './DateInputSegment.types';

export const DateInputSegment = React.forwardRef<
  HTMLInputElement,
  DateInputSegmentProps
>(
  (
    {
      segment,
      value,
      min: minProp,
      max: maxProp,
      onChange,
      darkMode,
      ...rest
    }: DateInputSegmentProps,
    fwdRef,
  ) => {
    const min = minProp ?? defaultMin[segment];
    const max = maxProp ?? defaultMax[segment];

    const inputRef = useForwardedRef(fwdRef, null);

    const { theme } = useDarkMode(darkMode);
    const baseFontSize = useUpdatedBaseFontSize();
    const { size } = useDatePickerContext();

    const formatValue = getValueFormatter(segment);

    const changeHandler: ChangeEventHandler<HTMLInputElement> = e => {
      onChange?.(formatValue(e.target.value));
    };

    // TODO:
    // Use a text input with pattern attribute due to Firefox stripping leading zeros on number inputs. (╯°□°)╯︵ ┻━┻
    // Thanks @matt-d-rat
    return (
      <input
        {...rest}
        aria-label={segment}
        id={segment}
        ref={inputRef}
        type="number"
        value={formatValue(value)}
        min={min}
        max={max}
        placeholder={defaultPlaceholder[segment]}
        onChange={changeHandler}
        className={cx(
          baseStyles,
          fontSizeStyles[baseFontSize],
          segmentThemeStyles[theme],
          segmentSizeStyles[size ?? Size.Default],
          segmentWidthStyles[segment],
        )}
      />
    );
  },
);

DateInputSegment.displayName = 'DateInputSegment';
